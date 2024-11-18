import React from "react";
import CurrencyInput from "react-currency-input-field";
import { cn } from "@/lib/utils";

interface InputPriceProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  placeholder?: string;
}

const NumericInput = ({
  field,
  placeholder = "Please enter a number",
}: InputPriceProps) => {
  return (
    <CurrencyInput
      name={field.name}
      placeholder={placeholder}
      decimalsLimit={2}
      allowDecimals={true}
      // value={field.value}
      defaultValue={field.value}
      onValueChange={(value) => {
        const numericValue = value ? parseFloat(value) : 0;
        field.onChange(numericValue);
      }}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-end text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      )}
    />
  );
};

export default NumericInput;
