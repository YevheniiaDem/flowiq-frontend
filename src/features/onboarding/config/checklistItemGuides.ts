import type { ChecklistItemId } from "../types/activation";
import type { HelpGuideId } from "../types";

export const CHECKLIST_ITEM_GUIDES: Partial<Record<ChecklistItemId, HelpGuideId>> = {
  first_import: "import_guide",
  review_transactions: "transactions_guide",
  ai_accountant: "ai_accountant",
  forecasts: "forecasts_guide",
  first_task: "tasks_guide",
};
