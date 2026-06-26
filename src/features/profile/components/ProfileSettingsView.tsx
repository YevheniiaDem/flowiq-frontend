"use client";

import { useState } from "react";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { FopInfoForm } from "./FopInfoForm";
import { SuccessToast } from "./SuccessToast";

export function ProfileSettingsView() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <PersonalInfoForm onSuccess={setToastMessage} />
      <FopInfoForm onSuccess={setToastMessage} />
      <SuccessToast
        message={toastMessage ?? ""}
        open={!!toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
