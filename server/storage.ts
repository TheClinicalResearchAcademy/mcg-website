import { type User, type InsertUser, type SiteLead, type InsertSiteLead, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createSiteLead(lead: InsertSiteLead): Promise<SiteLead>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getSiteLeads(): Promise<SiteLead[]>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private siteLeads: Map<string, SiteLead>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.siteLeads = new Map();
    this.contactMessages = new Map();
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
}

export const storage = new MemStorage();
