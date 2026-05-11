import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSiteLeadSchema, insertContactMessageSchema, insertAccessRequestSchema, insertAccessCodeSchema, validateCodeSchema } from "@shared/schema";
import { ObjectStorageService } from "./objectStorage";
import { randomBytes } from "crypto";

const downloadTokens = new Map<string, { email: string; expiresAt: number }>();

function adminAuth(req: Request, res: Response, next: NextFunction) {
  const password = req.headers["x-admin-password"];
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return res.status(500).json({ success: false, message: "Admin password not configured" });
  }
  if (password !== expected) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Site lead form submission
  app.post("/api/lead", async (req, res) => {
    try {
      const validatedData = insertSiteLeadSchema.parse(req.body);
      const lead = await storage.createSiteLead(validatedData);
      res.status(201).json({ success: true, message: "Site application submitted successfully", leadId: lead.id });
    } catch (error) {
      console.error("Error creating site lead:", error);
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ success: false, message: "Validation error", errors: error.message });
      }
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, message: "Contact form submitted successfully", messageId: message.id });
    } catch (error) {
      console.error("Error creating contact message:", error);
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ success: false, message: "Validation error", errors: error.message });
      }
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Newsletter signup
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ success: false, message: "Valid email is required" });
      }
      res.status(201).json({ success: true, message: "Successfully subscribed to newsletter" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // === One-Pager Download Authorization System ===

  // Recruiter requests access (public)
  app.post("/api/access-request", async (req, res) => {
    try {
      const validatedData = insertAccessRequestSchema.parse(req.body);
      const request = await storage.createAccessRequest(validatedData);
      console.log("New access request:", { id: request.id, name: request.name, email: request.email, company: request.company });
      res.status(201).json({ success: true, message: "Access request submitted. You will receive an authorization code via email once approved." });
    } catch (error) {
      console.error("Error creating access request:", error);
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ success: false, message: "Validation error", errors: error.message });
      }
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Validate authorization code and issue download token (public)
  app.post("/api/validate-code", async (req, res) => {
    try {
      const { email, code } = validateCodeSchema.parse(req.body);
      const validCode = await storage.validateAndUseAccessCode(email, code);
      if (!validCode) {
        return res.status(401).json({ success: false, message: "Invalid or already used authorization code." });
      }
      const token = randomBytes(24).toString("hex");
      downloadTokens.set(token, { email: validCode.email, expiresAt: Date.now() + 5 * 60 * 1000 });
      res.json({ success: true, downloadUrl: `/api/download-one-pager?token=${token}` });
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ success: false, message: "Validation error", errors: error.message });
      }
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Download endpoint - validates token and serves the one-pager
  app.get("/api/download-one-pager", async (req, res) => {
    const token = req.query.token as string;
    if (!token) {
      return res.status(400).json({ success: false, message: "Token required" });
    }
    const tokenData = downloadTokens.get(token);
    if (!tokenData || tokenData.expiresAt < Date.now()) {
      downloadTokens.delete(token);
      return res.status(401).json({ success: false, message: "Invalid or expired download link" });
    }
    downloadTokens.delete(token);

    // Serve the one-pager. For now serves a placeholder text file.
    // Replace this by uploading your actual PDF to the public object storage and updating the path.
    const onePagerContent = `MONACHE CONSULTING GROUP
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
Authorized download for: ${tokenData.email}
`;
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Content-Disposition", `attachment; filename="MCG-OnePager.txt"`);
    res.send(onePagerContent);
  });

  // === Admin endpoints (password protected) ===

  app.post("/api/admin/verify", adminAuth, (_req, res) => {
    res.json({ success: true });
  });

  app.get("/api/admin/access-requests", adminAuth, async (_req, res) => {
    const requests = await storage.getAccessRequests();
    res.json({ success: true, requests });
  });

  app.post("/api/admin/access-requests/:id/status", adminAuth, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!["approved", "denied", "pending"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }
    const updated = await storage.updateAccessRequestStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }
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
      res.status(201).json({ success: true, code });
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ success: false, message: "Validation error", errors: error.message });
      }
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Get upload URL for documents
  app.post("/api/objects/upload", async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ success: false, message: "Failed to get upload URL" });
    }
  });

  // Serve uploaded documents
  app.get("/objects/:objectPath(*)", async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const objectFile = await objectStorageService.getObjectEntityFile(req.path);
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error serving object:", error);
      res.status(404).json({ success: false, message: "File not found" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
