"use client";

import { KeyboardKeysEnum } from "@/types/keyboard";
import { ChangeEvent, forwardRef, KeyboardEvent } from "react";

type InputTextProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  className?: string;
};

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  function InputText({ onChange, onSubmit, value }, ref) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === KeyboardKeysEnum.Enter) {
        onSubmit?.();
      }
    };

    return (
      <input
        ref={ref}
        // leading-tight focus:outline-none
        className="appearance-none focus:shadow-outline"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    );
  }
);
