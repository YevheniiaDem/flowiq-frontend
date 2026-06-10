"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, UserPlus } from "lucide-react";
import { authService } from "@/src/services";
import { usePreferences } from "@/src/shared/context/PreferencesContext";
import { Button } from "@/src/shared/components/ui/button";
import { ClearableInput } from "@/src/shared/components/ui/clearable-input";
import { Input } from "@/src/shared/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";

export function RegisterForm() {
  const router = useRouter();
  const { t } = usePreferences();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.register({
        name,
        email,
        password,
        company: company || undefined,
      });
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("auth.registerFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-2xl border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>{t("auth.registerTitle")}</CardTitle>
        <CardDescription>{t("auth.registerDescription")}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </div>
          )}
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-medium text-muted-foreground">
              {t("auth.fullName")}
            </label>
            <ClearableInput
              id="name"
              type="text"
              placeholder={t("auth.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              clearAriaLabel={t("common.clearField")}
              className="h-9 bg-background/50"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
              {t("auth.email")}
            </label>
            <ClearableInput
              id="email"
              type="email"
              placeholder={t("auth.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              clearAriaLabel={t("common.clearField")}
              className="h-9 bg-background/50"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="company" className="text-xs font-medium text-muted-foreground">
              {t("auth.company")}{" "}
              <span className="text-muted-foreground/60">{t("auth.optional")}</span>
            </label>
            <ClearableInput
              id="company"
              type="text"
              placeholder={t("auth.companyPlaceholder")}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              autoComplete="organization"
              clearAriaLabel={t("common.clearField")}
              className="h-9 bg-background/50"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-medium text-muted-foreground">
              {t("auth.password")}
            </label>
            <Input
              id="password"
              type="password"
              placeholder={t("auth.passwordMin")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="h-9 bg-background/50"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 border-t-0 bg-transparent">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                {t("auth.createAccount")}
              </>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            {t("auth.hasAccount")}{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              {t("auth.signInLink")}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
