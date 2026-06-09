"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout, RegisterForm } from "@/src/features/auth";
import { authService } from "@/src/services";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      router.replace("/");
    }
  }, [router]);

  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
