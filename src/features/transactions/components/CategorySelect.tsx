"use client";

import { DropdownSelect } from "@/src/shared/components/ui/dropdown-select";

interface CategorySelectProps {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

export function CategorySelect({ value, options, onChange }: CategorySelectProps) {
  return (
    <DropdownSelect
      value={value}
      options={options.map((option) => ({ value: option, label: option }))}
      onChange={onChange}
    />
  );
}
