"use client";

import { KeyboardKeysEnum } from "@/types/keyboard";
import { ChangeEvent, FC, KeyboardEvent, RefObject } from "react";

type InputTextProps = {
  value?: string;
  onChange?: (value: string) => void;
  ref?: RefObject<HTMLInputElement | null>;
  disabled?: boolean;
  onSubmit?: () => void;
  className?: string;
};

export const InputText: FC<InputTextProps> = ({
  value,
  onChange,
  onSubmit,
  className = "",
  disabled = false,
  ref,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KeyboardKeysEnum.Enter) {
      onSubmit?.();
    }
  };

  return (
    <input
      ref={ref}
      disabled={disabled}
      // leading-tight focus:outline-none
      className={`appearance-none focus:shadow-outline ${className}`}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};
