"use client";

import { useEffect, useState } from "react";
import { CategorySelect } from "./CategorySelect";
import { DatePickerInput } from "./DatePickerInput";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/components/ui/dialog";
import { Button } from "@/src/shared/components/ui/button";
import { ClearableInput } from "@/src/shared/components/ui/clearable-input";
import { Input } from "@/src/shared/components/ui/input";
import { Transaction, TransactionFormValues, TransactionType } from "../types";
import { getCategoriesForType } from "../data/categories";
import { isTransactionDateInRange } from "../data/dateBounds";

interface TransactionFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  initialType?: TransactionType;
  transaction?: Transaction | null;
  onSubmit: (values: TransactionFormValues) => Promise<void>;
  labels: Record<string, string>;
}

const emptyForm = (type: TransactionType = "INCOME"): TransactionFormValues => ({
  type,
  amount: "",
  category: getCategoriesForType(type)[0],
  description: "",
  transactionDate: new Date().toISOString().slice(0, 10),
});

export function TransactionFormModal({
  open,
  onOpenChange,
  mode,
  initialType = "INCOME",
  transaction,
  onSubmit,
  labels,
}: TransactionFormModalProps) {
  const [form, setForm] = useState<TransactionFormValues>(emptyForm(initialType));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setDatePickerOpen(false);
      return;
    }

    if (mode === "edit" && transaction) {
      setForm({
        type: transaction.type,
        amount: String(transaction.amount),
        category: transaction.category,
        description: transaction.description ?? "",
        transactionDate: transaction.transactionDate,
      });
    } else {
      setForm(emptyForm(initialType));
    }
    setErrors({});
  }, [open, mode, transaction, initialType]);

  const categories = getCategoriesForType(form.type);

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.amount || Number(form.amount) <= 0) {
      nextErrors.amount = labels.validationAmount;
    }
    if (!form.category) {
      nextErrors.category = labels.validationCategory;
    }
    if (!form.transactionDate) {
      nextErrors.transactionDate = labels.validationDate;
    } else if (!isTransactionDateInRange(form.transactionDate)) {
      nextErrors.transactionDate = labels.validationDateRange;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(form);
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="transaction-form-modal" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? labels.addTitle : labels.editTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              {labels.type}
            </label>
            <div className="flex gap-2">
              {(["INCOME", "EXPENSE"] as TransactionType[]).map((type) => (
                <Button
                  key={type}
                  type="button"
                  size="sm"
                  variant={form.type === type ? "default" : "outline"}
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      type,
                      category: getCategoriesForType(type)[0],
                    }))
                  }
                >
                  {type === "INCOME" ? labels.income : labels.expense}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              {labels.amount}
            </label>
            <Input
              data-testid="transaction-form-amount"
              type="number"
              min="0.01"
              step="0.01"
              value={form.amount}
              onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
            />
            {errors.amount && <p className="mt-1 text-xs text-destructive">{errors.amount}</p>}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              {labels.category}
            </label>
            <CategorySelect
              value={form.category}
              options={categories}
              onChange={(category) => setForm((prev) => ({ ...prev, category }))}
            />
            {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category}</p>}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              {labels.description}
            </label>
            <ClearableInput
              data-testid="transaction-form-description"
              value={form.description}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, description: event.target.value }))
              }
              placeholder={labels.descriptionPlaceholder}
              clearAriaLabel={labels.clearField}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              {labels.date}
            </label>
            <DatePickerInput
              fullWidth
              value={form.transactionDate}
              onChange={(transactionDate) =>
                setForm((prev) => ({ ...prev, transactionDate }))
              }
              isPickerOpen={datePickerOpen}
              onPickerOpenChange={setDatePickerOpen}
              openCalendarLabel={labels.openCalendar}
              closeCalendarLabel={labels.closeCalendar}
            />
            {errors.transactionDate && (
              <p className="mt-1 text-xs text-destructive">{errors.transactionDate}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {labels.cancel}
          </Button>
          <Button data-testid="transaction-form-submit" onClick={handleSubmit} disabled={submitting}>
            {labels.save}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
