import { type User, type InsertUser, type SiteLead, type InsertSiteLead, type ContactMessage, type InsertContactMessage, type AccessRequest, type InsertAccessRequest, type AccessCode, type InsertAccessCode, users, siteLeads, contactMessages, accessRequests, accessCodes } from "@shared/schema";
import { randomUUID, randomBytes } from "crypto";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

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

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return rows[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const rows = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return rows[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const rows = await db.insert(users).values(insertUser).returning();
    return rows[0];
  }

  async createSiteLead(insertLead: InsertSiteLead): Promise<SiteLead> {
    const rows = await db.insert(siteLeads).values(insertLead as any).returning();
    return rows[0];
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const rows = await db.insert(contactMessages).values(insertMessage).returning();
    return rows[0];
  }

  async getSiteLeads(): Promise<SiteLead[]> {
    return await db.select().from(siteLeads).orderBy(desc(siteLeads.createdAt));
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async createAccessRequest(insertReq: InsertAccessRequest): Promise<AccessRequest> {
    const rows = await db.insert(accessRequests).values({ ...insertReq, status: "pending" }).returning();
    return rows[0];
  }

  async getAccessRequests(): Promise<AccessRequest[]> {
    return await db.select().from(accessRequests).orderBy(desc(accessRequests.createdAt));
  }

  async updateAccessRequestStatus(id: string, status: string): Promise<AccessRequest | undefined> {
    const rows = await db.update(accessRequests).set({ status }).where(eq(accessRequests.id, id)).returning();
    return rows[0];
  }

  async createAccessCode(insertCode: InsertAccessCode): Promise<AccessCode> {
    const code = generateCode();
    const rows = await db.insert(accessCodes).values({
      code,
      email: insertCode.email.toLowerCase(),
      used: false,
    }).returning();
    return rows[0];
  }

  async getAccessCodes(): Promise<AccessCode[]> {
    return await db.select().from(accessCodes).orderBy(desc(accessCodes.createdAt));
  }

  async validateAndUseAccessCode(email: string, code: string): Promise<AccessCode | undefined> {
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedCode = code.toUpperCase().trim();
    const rows = await db.select().from(accessCodes).where(
      and(eq(accessCodes.code, normalizedCode), eq(accessCodes.email, normalizedEmail), eq(accessCodes.used, false))
    ).limit(1);
    if (!rows[0]) return undefined;
    const updated = await db.update(accessCodes)
      .set({ used: true, usedAt: new Date() })
      .where(eq(accessCodes.id, rows[0].id))
      .returning();
    return updated[0];
  }
}

export class MemStorage implements IStorage {
  private users = new Map<string, User>();
  private siteLeads = new Map<string, SiteLead>();
  private contactMessages = new Map<string, ContactMessage>();
  private accessRequests = new Map<string, AccessRequest>();
  private accessCodes = new Map<string, AccessCode>();

  async getUser(id: string) { return this.users.get(id); }
  async getUserByUsername(username: string) { return Array.from(this.users.values()).find(u => u.username === username); }
  async createUser(u: InsertUser): Promise<User> { const id = randomUUID(); const user = { ...u, id }; this.users.set(id, user); return user; }
  async createSiteLead(l: InsertSiteLead): Promise<SiteLead> { const id = randomUUID(); const lead = { ...l, id, createdAt: new Date() } as SiteLead; this.siteLeads.set(id, lead); return lead; }
  async createContactMessage(m: InsertContactMessage): Promise<ContactMessage> { const id = randomUUID(); const msg = { ...m, company: m.company || null, id, createdAt: new Date() } as ContactMessage; this.contactMessages.set(id, msg); return msg; }
  async getSiteLeads() { return Array.from(this.siteLeads.values()); }
  async getContactMessages() { return Array.from(this.contactMessages.values()); }
  async createAccessRequest(r: InsertAccessRequest): Promise<AccessRequest> { const id = randomUUID(); const req = { ...r, reason: r.reason || null, id, status: "pending", createdAt: new Date() } as AccessRequest; this.accessRequests.set(id, req); return req; }
  async getAccessRequests() { return Array.from(this.accessRequests.values()).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)); }
  async updateAccessRequestStatus(id: string, status: string) { const req = this.accessRequests.get(id); if (!req) return undefined; const u = { ...req, status }; this.accessRequests.set(id, u); return u; }
  async createAccessCode(c: InsertAccessCode): Promise<AccessCode> { const id = randomUUID(); const code = { id, code: generateCode(), email: c.email.toLowerCase(), used: false, usedAt: null, createdAt: new Date() } as AccessCode; this.accessCodes.set(id, code); return code; }
  async getAccessCodes() { return Array.from(this.accessCodes.values()).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)); }
  async validateAndUseAccessCode(email: string, code: string) {
    const e = email.toLowerCase().trim(); const c = code.toUpperCase().trim();
    const found = Array.from(this.accessCodes.values()).find(x => x.code === c && x.email === e && !x.used);
    if (!found) return undefined;
    const u = { ...found, used: true, usedAt: new Date() }; this.accessCodes.set(found.id, u); return u;
  }
}

export const storage: IStorage = process.env.DATABASE_URL ? new DbStorage() : new MemStorage();
