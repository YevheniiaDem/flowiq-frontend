import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { BusinessGuideView } from "@/src/features/business-guide";

export default function BusinessGuidePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      }
    >
      <BusinessGuideView />
    </Suspense>
  );
}
