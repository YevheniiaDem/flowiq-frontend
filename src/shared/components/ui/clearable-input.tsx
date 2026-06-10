"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Input } from "@/src/shared/components/ui/input";
import { Button } from "@/src/shared/components/ui/button";
import { cn } from "@/src/shared/utils/utils";

const CLEARABLE_TYPES = new Set(["text", "search", "email", "url", "tel"]);

export interface ClearableInputProps extends React.ComponentProps<typeof Input> {
  containerClassName?: string;
  clearAriaLabel?: string;
  leftIcon?: React.ReactNode;
  leftIconClassName?: string;
  clearable?: boolean;
}

const ClearableInput = React.forwardRef<HTMLInputElement, ClearableInputProps>(
  (
    {
      className,
      containerClassName,
      clearAriaLabel = "Clear field",
      leftIcon,
      leftIconClassName,
      clearable = true,
      type = "text",
      value,
      defaultValue,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      defaultValue?.toString() ?? ""
    );

    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value ?? "") : uncontrolledValue;
    const inputType = type ?? "text";
    const showClear =
      clearable &&
      CLEARABLE_TYPES.has(inputType) &&
      currentValue.length > 0 &&
      !disabled;

    const setRefs = (element: HTMLInputElement | null) => {
      innerRef.current = element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(event.target.value);
      }
      onChange?.(event);
    };

    const handleClear = () => {
      if (!isControlled) {
        setUncontrolledValue("");
      }

      const element = innerRef.current;
      if (element) {
        element.value = "";
        element.dispatchEvent(new Event("input", { bubbles: true }));
      }

      onChange?.({
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);

      element?.focus();
    };

    return (
      <div className={cn("relative", containerClassName)}>
        {leftIcon && (
          <div
            className={cn(
              "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground",
              leftIconClassName
            )}
          >
            {leftIcon}
          </div>
        )}
        <Input
          ref={setRefs}
          type={inputType}
          value={isControlled ? value : undefined}
          defaultValue={!isControlled ? defaultValue : undefined}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            leftIcon && "pl-8",
            showClear && "pr-9",
            clearable &&
              inputType === "search" &&
              "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-ms-clear]:hidden",
            className
          )}
          {...props}
        />
        {showClear && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={handleClear}
            aria-label={clearAriaLabel}
            tabIndex={-1}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }
);

ClearableInput.displayName = "ClearableInput";

export { ClearableInput };
