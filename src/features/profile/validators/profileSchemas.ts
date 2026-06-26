import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().max(100).optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email"),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  company: z.string().trim().max(100).optional().or(z.literal("")),
});

export const fopProfileSchema = z.object({
  fopGroup: z.number().int().min(0).max(3),
  taxSystem: z.enum(["SINGLE_TAX", "GENERAL"]),
  vatPayer: z.boolean(),
  taxRate: z.number().min(0).max(1).nullable().optional(),
  registrationDate: z.string().optional().or(z.literal("")),
  region: z.string().trim().max(100).optional().or(z.literal("")),
  mainKved: z.string().trim().max(20).optional().or(z.literal("")),
  mainKvedName: z.string().trim().max(255).optional().or(z.literal("")),
  kvedCodes: z.array(z.string().trim().min(1).max(20)).min(1, "At least one KVED code is required"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(10, "Minimum 10 characters")
      .regex(/[A-Z]/, "Must include uppercase letter")
      .regex(/[a-z]/, "Must include lowercase letter")
      .regex(/\d/, "Must include number")
      .regex(/[^A-Za-z0-9]/, "Must include special character"),
    confirmPassword: z.string().min(1, "Please confirm password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
export type FopProfileFormValues = z.infer<typeof fopProfileSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
