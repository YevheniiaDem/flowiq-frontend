"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/src/shared/components/ui/button";
import { Card } from "@/src/shared/components/ui/card";
import { Input } from "@/src/shared/components/ui/input";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { profileService } from "../services/profile.service";
import { changePasswordSchema, type ChangePasswordFormValues } from "../validators/profileSchemas";

interface ChangePasswordFormProps {
  onSuccess: (message: string) => void;
}

export function ChangePasswordForm({ onSuccess }: ChangePasswordFormProps) {
  const { t } = usePreferences();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ChangePasswordFormValues) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await profileService.changePassword(values);
      reset();
      onSuccess(t("profile.security.passwordChanged"));
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t("profile.security.passwordError"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <h3 className="mb-1 text-sm font-semibold">{t("profile.security.changePassword")}</h3>
      <p className="mb-4 text-xs text-muted-foreground">{t("profile.security.changePasswordHint")}</p>

      {submitError && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="currentPassword" className="text-xs font-medium text-muted-foreground">
            {t("profile.security.currentPassword")}
          </label>
          <Input id="currentPassword" type="password" autoComplete="current-password" {...register("currentPassword")} />
          {errors.currentPassword && (
            <p className="text-[10px] text-destructive">{errors.currentPassword.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="newPassword" className="text-xs font-medium text-muted-foreground">
            {t("profile.security.newPassword")}
          </label>
          <Input id="newPassword" type="password" autoComplete="new-password" {...register("newPassword")} />
          <p className="text-[10px] text-muted-foreground">{t("profile.security.passwordRules")}</p>
          {errors.newPassword && <p className="text-[10px] text-destructive">{errors.newPassword.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="text-xs font-medium text-muted-foreground">
            {t("profile.security.confirmPassword")}
          </label>
          <Input id="confirmPassword" type="password" autoComplete="new-password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="text-[10px] text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={submitting || !isDirty}>
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("profile.security.updatePassword")}
          </Button>
        </div>
      </form>
    </Card>
  );
}
