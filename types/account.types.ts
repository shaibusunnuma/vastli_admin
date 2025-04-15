import { Restaurant } from "./restaurants";

export interface Account {
  id: string;
  contact: Contact;
  preferences: Preferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  primaryPhone: string;
  secondaryPhones?: string[];
  primaryEmail: string;
  secondaryEmails?: string[];
}

export interface Preferences {
  language: string;
  notifications: Notifications;
}

export interface Notifications {
  email: boolean;
  sms: boolean;
  push: boolean;
}

export enum Languages {
  en = "English",
  fr = "French",
}

export enum FormState {
  IDLE = "idle",
  ADDING = "adding",
  VERIFYING = "verifying",
}
