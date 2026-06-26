"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/src/shared/components/ui/button";
import { Card } from "@/src/shared/components/ui/card";
import { Input } from "@/src/shared/components/ui/input";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { useProfile } from "../hooks/useProfile";
import { dispatchProfileUpdated, profileService, resolveAvatarUrl } from "../services/profile.service";
import { personalInfoSchema, type PersonalInfoFormValues } from "../validators/profileSchemas";

interface PersonalInfoFormProps {
  onSuccess: (message: string) => void;
}

export function PersonalInfoForm({ onSuccess }: PersonalInfoFormProps) {
  const { t } = usePreferences();
  const { profile, loading, error, refresh } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName ?? "",
        lastName: profile.lastName ?? "",
        email: profile.email,
        phone: profile.phone ?? "",
        company: profile.company ?? "",
      });
    }
  }, [profile, reset]);
  const onSubmit = async (values: PersonalInfoFormValues) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await profileService.updateProfile({
        firstName: values.firstName,
        lastName: values.lastName ?? "",
        email: values.email,
        phone: values.phone || undefined,
        company: values.company || undefined,
      });
      await refresh();
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("user");
        if (stored) {
          const user = JSON.parse(stored) as { name?: string; email?: string };
          user.name = `${values.firstName} ${values.lastName ?? ""}`.trim();
          user.email = values.email;
          localStorage.setItem("user", JSON.stringify(user));
        }
      }
      dispatchProfileUpdated();
      onSuccess(t("profile.personal.saved"));
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t("profile.personal.saveError"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    setSubmitError(null);
    try {
      const updated = await profileService.uploadAvatar(file);
      await refresh();
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("user");
        if (stored) {
          const user = JSON.parse(stored);
          user.avatar = updated.avatar;
          localStorage.setItem("user", JSON.stringify(user));
        }
      }
      dispatchProfileUpdated();
      onSuccess(t("profile.personal.avatarSaved"));
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t("profile.personal.avatarError"));
    } finally {
      setUploadingAvatar(false);
      event.target.value = "";
    }
  };

  if (loading && !profile) {
    return (
      <Card className="flex h-40 items-center justify-center rounded-xl border-border/50 bg-card/50">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </Card>
    );
  }

  const avatarUrl = resolveAvatarUrl(profile?.avatar);

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <h3 className="mb-1 text-sm font-semibold">{t("profile.personal.title")}</h3>
      <p className="mb-4 text-xs text-muted-foreground">{t("profile.personal.hint")}</p>

      {(error || submitError) && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {submitError ?? error}
        </div>
      )}

      <div className="mb-4 flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border/50 bg-muted">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-muted-foreground">
              {profile?.firstName?.[0] ?? "?"}
            </div>
          )}
          {uploadingAvatar && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
        </div>
        <div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploadingAvatar}
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="mr-2 h-3.5 w-3.5" />
            {t("profile.personal.uploadAvatar")}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <p className="mt-1 text-[10px] text-muted-foreground">{t("profile.personal.avatarHint")}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="firstName" className="text-xs font-medium text-muted-foreground">
              {t("profile.personal.firstName")}
            </label>
            <Input id="firstName" {...register("firstName")} aria-invalid={!!errors.firstName} />
            {errors.firstName && <p className="text-[10px] text-destructive">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="lastName" className="text-xs font-medium text-muted-foreground">
              {t("profile.personal.lastName")}
            </label>
            <Input id="lastName" {...register("lastName")} aria-invalid={!!errors.lastName} />
            {errors.lastName && <p className="text-[10px] text-destructive">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
            {t("profile.personal.email")}
          </label>
          <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
          <p className="text-[10px] text-muted-foreground">{t("profile.personal.emailHint")}</p>
          {errors.email && <p className="text-[10px] text-destructive">{errors.email.message}</p>}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-xs font-medium text-muted-foreground">
              {t("profile.personal.phone")}
            </label>
            <Input id="phone" {...register("phone")} placeholder="+380501234567" />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="company" className="text-xs font-medium text-muted-foreground">
              {t("profile.personal.company")}
            </label>
            <Input id="company" {...register("company")} />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {isDirty && (
            <span className="text-xs font-medium text-amber-500">{t("profile.unsavedChanges")}</span>
          )}
          <Button type="submit" disabled={submitting || !isDirty} className="ml-auto">
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t("profile.saveChanges")}
          </Button>
        </div>
      </form>
    </Card>
  );
}
