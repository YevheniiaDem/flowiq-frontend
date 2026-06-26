export type TaxSystem = "SINGLE_TAX" | "GENERAL";

export type FopGroup = 0 | 1 | 2 | 3;

export interface Profile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  phone?: string | null;
  avatar?: string | null;
  company?: string | null;
  role: string;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface FopProfile {
  fopGroup: FopGroup;
  taxSystem: TaxSystem;
  vatPayer: boolean;
  taxRate?: number | null;
  registrationDate?: string | null;
  region?: string | null;
  mainKved?: string | null;
  mainKvedName?: string | null;
  kvedCodes: string[];
  updatedAt?: string | null;
}

export interface UserSession {
  id: string;
  deviceLabel?: string | null;
  browser?: string | null;
  ipAddress?: string | null;
  loginAt?: string | null;
  lastActivityAt?: string | null;
  current: boolean;
}

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
}

export interface UpdateFopProfilePayload {
  fopGroup: FopGroup;
  taxSystem: TaxSystem;
  vatPayer: boolean;
  taxRate?: number | null;
  registrationDate?: string | null;
  region?: string;
  mainKved?: string;
  mainKvedName?: string;
  kvedCodes: string[];
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type SettingsTab = "general" | "profile" | "security" | "notifications" | "appearance";
