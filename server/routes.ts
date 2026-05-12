import type { Express, Request, Response, NextFunction } from "express";
import { storage } from "./storage";
import { insertSiteLeadSchema, insertContactMessageSchema, insertAccessRequestSchema, insertAccessCodeSchema, validateCodeSchema } from "../shared/schema";
import { ObjectStorageService } from "./objectStorage";
import { sendAuthorizationCode, sendAccessRequestNotification } from "./email";
import { randomBytes } from "crypto";

const downloadTokens = new Map<string, { email: string; expiresAt: number }>();
const ADMIN_NOTIFY_EMAIL = process.env.ADMIN_NOTIFY_EMAIL || "Sites@monacheconsultinggroup.com";

function adminAuth(req: Request, res: Response, next: NextFunction) {
  const password = req.headers["x-admin-password"];
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return res.status(500).json({ success: false, message: "Admin password not configured" });
  if (password !== expected) return res.status(401).json({ success: false, message: "Unauthorized" });
  next();
}

export function registerRoutes(app: Express): void {
  app.post("/api/lead", async (req, res) => {
    try {
      const data = insertSiteLeadSchema.parse(req.body);
      const lead = await storage.createSiteLead(data);
      res.status(201).json({ success: true, message: "Site application submitted successfully", leadId: lead.id });
    } catch (error: any) {
      if (error?.name === "ZodError") return res.status(400).json({ success: false, message: "Validation error", errors: error.message });
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactMessageSchema.parse(req.body);
      const msg = await storage.createContactMessage(data);
      res.status(201).json({ success: true, message: "Contact form submitted successfully", messageId: msg.id });
    } catch (error: any) {
      if (error?.name === "ZodError") return res.status(400).json({ success: false, message: "Validation error", errors: error.message });
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes("@")) return res.status(400).json({ success: false, message: "Valid email is required" });
    res.status(201).json({ success: true, message: "Successfully subscribed to newsletter" });
  });

  // === One-Pager Authorization System ===

  app.post("/api/access-request", async (req, res) => {
    try {
      const data = insertAccessRequestSchema.parse(req.body);
      const request = await storage.createAccessRequest(data);
      sendAccessRequestNotification(ADMIN_NOTIFY_EMAIL, data).catch(console.error);
      res.status(201).json({ success: true, message: "Access request submitted. You will receive an authorization code via email once approved." });
    } catch (error: any) {
      if (error?.name === "ZodError") return res.status(400).json({ success: false, message: "Validation error", errors: error.message });
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.post("/api/validate-code", async (req, res) => {
    try {
      const { email, code } = validateCodeSchema.parse(req.body);
      const valid = await storage.validateAndUseAccessCode(email, code);
      if (!valid) return res.status(401).json({ success: false, message: "Invalid or already used authorization code." });
      const token = randomBytes(24).toString("hex");
      downloadTokens.set(token, { email: valid.email, expiresAt: Date.now() + 5 * 60 * 1000 });
      res.json({ success: true, downloadUrl: `/api/download-one-pager?token=${token}` });
    } catch (error: any) {
      if (error?.name === "ZodError") return res.status(400).json({ success: false, message: "Validation error", errors: error.message });
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  app.get("/api/download-one-pager", async (req, res) => {
    const token = req.query.token as string;
    if (!token) return res.status(400).json({ success: false, message: "Token required" });
    const data = downloadTokens.get(token);
    if (!data || data.expiresAt < Date.now()) {
      downloadTokens.delete(token);
      return res.status(401).json({ success: false, message: "Invalid or expired download link" });
    }
    downloadTokens.delete(token);
    const content = `MONACHE CONSULTING GROUP
Clinical Research Services - One Pager

Senior Clinical Research Associate: Uchechukwu Omesiete
Experience: 11+ Years in Clinical Research

Therapeutic Areas:
- Endocrinology, Dermatology, Cardiology, Gastroenterology
- Infectious Disease, Pulmonology, Oncology, Immunology
- Neurology, Rare Disease, Cardiovascular Devices, Organ Transplant

Education:
- MS Biomedical Engineering (Drexel University)
- BA Psychology (Temple University)

Certifications: GCP Certified

Services:
- Auditing & GCP Compliance
- Risk-Based Monitoring
- Site Management & Training
- Business Development

Contact: Sites@monacheconsultinggroup.com
Authorized download for: ${data.email}
`;
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Content-Disposition", `attachment; filename="MCG-OnePager.txt"`);
    res.send(content);
  });

  // === Admin endpoints ===
  app.post("/api/admin/verify", adminAuth, (_req, res) => res.json({ success: true }));

  app.get("/api/admin/access-requests", adminAuth, async (_req, res) => {
    const requests = await storage.getAccessRequests();
    res.json({ success: true, requests });
  });

  app.post("/api/admin/access-requests/:id/status", adminAuth, async (req, res) => {
    const { status } = req.body;
    if (!["approved", "denied", "pending"].includes(status)) return res.status(400).json({ success: false, message: "Invalid status" });
    const updated = await storage.updateAccessRequestStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ success: false, message: "Request not found" });
    res.json({ success: true, request: updated });
  });

  app.get("/api/admin/access-codes", adminAuth, async (_req, res) => {
    const codes = await storage.getAccessCodes();
    res.json({ success: true, codes });
  });

  app.post("/api/admin/issue-code", adminAuth, async (req, res) => {
    try {
      const validated = insertAccessCodeSchema.parse(req.body);
      const code = await storage.createAccessCode(validated);
      const sent = await sendAuthorizationCode(code.email, code.code, req.body.name);
      res.status(201).json({ success: true, code, emailed: sent });
    } catch (error: any) {
      if (error?.name === "ZodError") return res.status(400).json({ success: false, message: "Validation error", errors: error.message });
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Object storage
  app.post("/api/objects/upload", async (_req, res) => {
    try {
      const svc = new ObjectStorageService();
      const uploadURL = await svc.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to get upload URL" });
    }
  });

  app.get("/objects/:objectPath(*)", async (req, res) => {
    try {
      const svc = new ObjectStorageService();
      const file = await svc.getObjectEntityFile(req.path);
      svc.downloadObject(file, res);
    } catch (error) {
      res.status(404).json({ success: false, message: "File not found" });
    }
  });
}
