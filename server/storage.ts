import { type User, type InsertUser, type SiteLead, type InsertSiteLead, type ContactMessage, type InsertContactMessage, type AccessRequest, type InsertAccessRequest, type AccessCode, type InsertAccessCode } from "@shared/schema";
import { randomUUID, randomBytes } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createSiteLead(lead: InsertSiteLead): Promise<SiteLead>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getSiteLeads(): Promise<SiteLead[]>;
  getContactMessages(): Promise<ContactMessage[]>;
  createAccessRequest(req: InsertAccessRequest): Promise<AccessRequest>;
  getAccessRequests(): Promise<AccessRequest[]>;
  updateAccessRequestStatus(id: string, status: string): Promise<AccessRequest | undefined>;
  createAccessCode(req: InsertAccessCode): Promise<AccessCode>;
  getAccessCodes(): Promise<AccessCode[]>;
  validateAndUseAccessCode(email: string, code: string): Promise<AccessCode | undefined>;
}

function generateCode(): string {
  return randomBytes(4).toString("hex").toUpperCase();
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private siteLeads: Map<string, SiteLead>;
  private contactMessages: Map<string, ContactMessage>;
  private accessRequests: Map<string, AccessRequest>;
  private accessCodes: Map<string, AccessCode>;

  constructor() {
    this.users = new Map();
    this.siteLeads = new Map();
    this.contactMessages = new Map();
    this.accessRequests = new Map();
    this.accessCodes = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createSiteLead(insertLead: InsertSiteLead): Promise<SiteLead> {
    const id = randomUUID();
    const lead: SiteLead = { 
      ...insertLead, 
      id, 
      createdAt: new Date() 
    };
    this.siteLeads.set(id, lead);
    return lead;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      ...insertMessage,
      company: insertMessage.company || null,
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getSiteLeads(): Promise<SiteLead[]> {
    return Array.from(this.siteLeads.values());
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async createAccessRequest(insertReq: InsertAccessRequest): Promise<AccessRequest> {
    const id = randomUUID();
    const req: AccessRequest = {
      ...insertReq,
      reason: insertReq.reason || null,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.accessRequests.set(id, req);
    return req;
  }

  async getAccessRequests(): Promise<AccessRequest[]> {
    return Array.from(this.accessRequests.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async updateAccessRequestStatus(id: string, status: string): Promise<AccessRequest | undefined> {
    const req = this.accessRequests.get(id);
    if (!req) return undefined;
    const updated = { ...req, status };
    this.accessRequests.set(id, updated);
    return updated;
  }

  async createAccessCode(insertCode: InsertAccessCode): Promise<AccessCode> {
    const id = randomUUID();
    const code: AccessCode = {
      id,
      code: generateCode(),
      email: insertCode.email.toLowerCase(),
      used: false,
      usedAt: null,
      createdAt: new Date(),
    };
    this.accessCodes.set(id, code);
    return code;
  }

  async getAccessCodes(): Promise<AccessCode[]> {
    return Array.from(this.accessCodes.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async validateAndUseAccessCode(email: string, code: string): Promise<AccessCode | undefined> {
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedCode = code.toUpperCase().trim();
    const found = Array.from(this.accessCodes.values()).find(
      (c) => c.code === normalizedCode && c.email === normalizedEmail && !c.used
    );
    if (!found) return undefined;
    const updated = { ...found, used: true, usedAt: new Date() };
    this.accessCodes.set(found.id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
