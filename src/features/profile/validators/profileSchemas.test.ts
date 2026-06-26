import { describe, expect, it } from "vitest";
import {
  changePasswordSchema,
  fopProfileSchema,
  personalInfoSchema,
} from "./profileSchemas";

describe("profileSchemas", () => {
  describe("personalInfoSchema", () => {
    it("accepts valid personal info", () => {
      const result = personalInfoSchema.safeParse({
        firstName: "Ivan",
        lastName: "Petrenko",
        email: "ivan@example.com",
        phone: "+380501234567",
        company: "FOP Ivan",
      });
      expect(result.success).toBe(true);
    });

    it("rejects empty first name", () => {
      const result = personalInfoSchema.safeParse({
        firstName: "",
        email: "ivan@example.com",
      });
      expect(result.success).toBe(false);
    });

    it("rejects invalid email", () => {
      const result = personalInfoSchema.safeParse({
        firstName: "Ivan",
        email: "not-an-email",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("fopProfileSchema", () => {
    it("accepts valid FOP profile", () => {
      const result = fopProfileSchema.safeParse({
        fopGroup: 3,
        taxSystem: "SINGLE_TAX",
        vatPayer: false,
        kvedCodes: ["62.01"],
      });
      expect(result.success).toBe(true);
    });

    it("requires at least one KVED code", () => {
      const result = fopProfileSchema.safeParse({
        fopGroup: 3,
        taxSystem: "SINGLE_TAX",
        vatPayer: false,
        kvedCodes: [],
      });
      expect(result.success).toBe(false);
    });
  });

  describe("changePasswordSchema", () => {
    it("accepts strong matching passwords", () => {
      const result = changePasswordSchema.safeParse({
        currentPassword: "OldPass123!",
        newPassword: "NewPass456!",
        confirmPassword: "NewPass456!",
      });
      expect(result.success).toBe(true);
    });

    it("rejects weak new password", () => {
      const result = changePasswordSchema.safeParse({
        currentPassword: "OldPass123!",
        newPassword: "weak",
        confirmPassword: "weak",
      });
      expect(result.success).toBe(false);
    });

    it("rejects mismatched confirmation", () => {
      const result = changePasswordSchema.safeParse({
        currentPassword: "OldPass123!",
        newPassword: "NewPass456!",
        confirmPassword: "Different789!",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.path.includes("confirmPassword"))).toBe(true);
      }
    });
  });
});
