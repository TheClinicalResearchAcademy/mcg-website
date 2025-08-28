import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSiteLeadSchema, insertContactMessageSchema } from "@shared/schema";
import { ObjectStorageService } from "./objectStorage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Site lead form submission
  app.post("/api/lead", async (req, res) => {
    try {
      const validatedData = insertSiteLeadSchema.parse(req.body);
      const lead = await storage.createSiteLead(validatedData);
      
      console.log("New site lead created:", {
        id: lead.id,
        siteName: lead.siteName,
        contactName: lead.contactName,
        email: lead.email,
        createdAt: lead.createdAt
      });
      
      res.status(201).json({ 
        success: true, 
        message: "Site application submitted successfully",
        leadId: lead.id 
      });
    } catch (error) {
      console.error("Error creating site lead:", error);
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.message 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      console.log("New contact message created:", {
        id: message.id,
        name: message.name,
        email: message.email,
        company: message.company,
        createdAt: message.createdAt
      });
      
      res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        messageId: message.id 
      });
    } catch (error) {
      console.error("Error creating contact message:", error);
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.message 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Newsletter signup
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || !email.includes("@")) {
        return res.status(400).json({ 
          success: false, 
          message: "Valid email is required" 
        });
      }
      
      console.log("Newsletter signup:", { email, timestamp: new Date() });
      
      res.status(201).json({ 
        success: true, 
        message: "Successfully subscribed to newsletter" 
      });
    } catch (error) {
      console.error("Error processing newsletter signup:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
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
      res.status(500).json({ 
        success: false, 
        message: "Failed to get upload URL" 
      });
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
      res.status(404).json({ 
        success: false, 
        message: "File not found" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
