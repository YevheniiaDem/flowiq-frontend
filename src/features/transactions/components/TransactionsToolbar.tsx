"use client";

import { useRef } from "react";
import { ArrowDownToLine, ArrowUpFromLine, Plus } from "lucide-react";
import { Button } from "@/src/shared/components/ui/button";

interface TransactionsToolbarProps {
  onAddTransaction: () => void;
  onImport: (file: File) => Promise<void>;
  onExport: () => Promise<void>;
  labels: Record<string, string>;
}

export function TransactionsToolbar({
  onAddTransaction,
  onImport,
  onExport,
  labels,
}: TransactionsToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button onClick={onAddTransaction} className="gap-2">
        <Plus className="h-4 w-4" />
        {labels.addTransaction}
      </Button>
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => fileInputRef.current?.click()}
      >
        <ArrowUpFromLine className="h-4 w-4" />
        {labels.importCsv}
      </Button>
      <Button variant="outline" className="gap-2" onClick={onExport}>
        <ArrowDownToLine className="h-4 w-4" />
        {labels.exportCsv}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (file) {
            await onImport(file);
            event.target.value = "";
          }
        }}
      />
    </div>
  );
}
