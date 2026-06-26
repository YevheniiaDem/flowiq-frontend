"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/src/shared/components/ui/button";
import { Card } from "@/src/shared/components/ui/card";
import { DropdownSelect } from "@/src/shared/components/ui/dropdown-select";
import { Input } from "@/src/shared/components/ui/input";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { useFopProfile } from "../hooks/useFopProfile";
import { dispatchProfileUpdated, profileService } from "../services/profile.service";
import type { FopGroup, TaxSystem } from "../types";
import { fopProfileSchema, type FopProfileFormValues } from "../validators/profileSchemas";

const UKRAINIAN_REGIONS = [
  "Вінницька область",
  "Волинська область",
  "Дніпропетровська область",
  "Донецька область",
  "Житомирська область",
  "Закарпатська область",
  "Запорізька область",
  "Івано-Франківська область",
  "Київ",
  "Київська область",
  "Кіровоградська область",
  "Луганська область",
  "Львівська область",
  "Миколаївська область",
  "Одеська область",
  "Полтавська область",
  "Рівненська область",
  "Сумська область",
  "Тернопільська область",
  "Харківська область",
  "Херсонська область",
  "Хмельницька область",
  "Черкаська область",
  "Чернівецька область",
  "Чернігівська область",
];

interface FopInfoFormProps {
  onSuccess: (message: string) => void;
}

export function FopInfoForm({ onSuccess }: FopInfoFormProps) {
  const { t } = usePreferences();
  const { fopProfile, loading, error, refresh } = useFopProfile();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<FopProfileFormValues>({
    resolver: zodResolver(fopProfileSchema),
    defaultValues: {
      fopGroup: 2,
      taxSystem: "SINGLE_TAX",
      vatPayer: false,
      taxRate: 0.05,
      registrationDate: "",
      region: "",
      mainKved: "",
      mainKvedName: "",
      kvedCodes: ["62.01"],
    },
  });

  const fopGroup = watch("fopGroup");
  const kvedCodes = watch("kvedCodes");

  const fopGroupOptions = useMemo(
    () => [
      { value: "1", label: t("profile.fop.groups.1") },
      { value: "2", label: t("profile.fop.groups.2") },
      { value: "3", label: t("profile.fop.groups.3") },
      { value: "0", label: t("profile.fop.groups.general") },
    ],
    [t]
  );

  const taxSystemOptions = useMemo(
    () => [
      { value: "SINGLE_TAX", label: t("profile.fop.taxSystems.SINGLE_TAX") },
      { value: "GENERAL", label: t("profile.fop.taxSystems.GENERAL") },
    ],
    [t]
  );

  const regionOptions = useMemo(
    () => UKRAINIAN_REGIONS.map((region) => ({ value: region, label: region })),
    []
  );

  useEffect(() => {
    if (fopProfile) {
      reset({
        fopGroup: fopProfile.fopGroup as FopGroup,
        taxSystem: fopProfile.taxSystem as TaxSystem,
        vatPayer: fopProfile.vatPayer,
        taxRate: fopProfile.taxRate ?? null,
        registrationDate: fopProfile.registrationDate ?? "",
        region: fopProfile.region ?? "",
        mainKved: fopProfile.mainKved ?? "",
        mainKvedName: fopProfile.mainKvedName ?? "",
        kvedCodes: fopProfile.kvedCodes.length > 0 ? fopProfile.kvedCodes : ["62.01"],
      });
    }
  }, [fopProfile, reset]);
  const onSubmit = async (values: FopProfileFormValues) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await profileService.updateFopProfile({
        fopGroup: values.fopGroup as FopGroup,
        taxSystem: values.taxSystem,
        vatPayer: values.vatPayer,
        taxRate: values.taxRate ?? null,
        registrationDate: values.registrationDate || null,
        region: values.region || undefined,
        mainKved: values.mainKved || undefined,
        mainKvedName: values.mainKvedName || undefined,
        kvedCodes: values.kvedCodes,
      });
      await refresh();
      dispatchProfileUpdated();
      onSuccess(t("profile.fop.saved"));
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t("profile.fop.saveError"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !fopProfile) {
    return (
      <Card className="flex h-40 items-center justify-center rounded-xl border-border/50 bg-card/50">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border-border/50 bg-card/50 p-4 backdrop-blur-sm">
      <h3 className="mb-1 text-sm font-semibold">{t("profile.fop.title")}</h3>
      <p className="mb-4 text-xs text-muted-foreground">{t("profile.fop.hint")}</p>

      {(error || submitError) && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {submitError ?? error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">{t("profile.fop.fopGroup")}</label>
            <Controller
              control={control}
              name="fopGroup"
              render={({ field }) => (
                <DropdownSelect
                  value={String(field.value)}
                  options={fopGroupOptions}
                  onChange={(value) => field.onChange(Number(value))}
                  aria-label={t("profile.fop.fopGroup")}
                />
              )}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">{t("profile.fop.taxSystem")}</label>
            <Controller
              control={control}
              name="taxSystem"
              render={({ field }) => (
                <DropdownSelect
                  value={field.value}
                  options={taxSystemOptions}
                  onChange={field.onChange}
                  aria-label={t("profile.fop.taxSystem")}
                />
              )}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-2 pt-6">
            <input id="vatPayer" type="checkbox" className="h-4 w-4 rounded border-border" {...register("vatPayer")} />
            <label htmlFor="vatPayer" className="text-xs font-medium text-muted-foreground">
              {t("profile.fop.vatPayer")}
            </label>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="taxRate" className="text-xs font-medium text-muted-foreground">
              {t("profile.fop.taxRate")}
            </label>
            <Input
              id="taxRate"
              type="number"
              step="0.01"
              min="0"
              max="1"
              {...register("taxRate")}
              disabled={fopGroup === 0}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="registrationDate" className="text-xs font-medium text-muted-foreground">
              {t("profile.fop.registrationDate")}
            </label>
            <Input id="registrationDate" type="date" {...register("registrationDate")} />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">{t("profile.fop.region")}</label>
          <Controller
            control={control}
            name="region"
            render={({ field }) => (
              <DropdownSelect
                value={field.value ?? ""}
                options={regionOptions}
                onChange={field.onChange}
                aria-label={t("profile.fop.region")}
              />
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="mainKved" className="text-xs font-medium text-muted-foreground">
              {t("profile.fop.mainKved")}
            </label>
            <Input id="mainKved" {...register("mainKved")} placeholder="62.01" />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="mainKvedName" className="text-xs font-medium text-muted-foreground">
              {t("profile.fop.mainKvedName")}
            </label>
            <Input id="mainKvedName" {...register("mainKvedName")} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">{t("profile.fop.kvedList")}</label>
          {kvedCodes.map((_, index) => (
            <div key={index} className="flex gap-2">
              <Input {...register(`kvedCodes.${index}` as const)} placeholder="62.01" />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  const next = kvedCodes.filter((__, i) => i !== index);
                  setValue("kvedCodes", next.length > 0 ? next : [""], { shouldDirty: true });
                }}
                disabled={kvedCodes.length <= 1}
                aria-label={t("profile.fop.removeKved")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {errors.kvedCodes && (
            <p className="text-[10px] text-destructive">{errors.kvedCodes.message as string}</p>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setValue("kvedCodes", [...kvedCodes, ""], { shouldDirty: true })}
          >
            <Plus className="mr-2 h-3.5 w-3.5" />
            {t("profile.fop.addKved")}
          </Button>
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
