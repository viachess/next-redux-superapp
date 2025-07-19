"use client";

import { KeyboardKeysEnum } from "@/shared/types/keyboard";
import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  KeyboardEvent,
  RefObject,
} from "react";

type InputTextProps = {
  value?: string | number | readonly string[] | undefined;
  ref?: RefObject<HTMLInputElement | null>;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputText: FC<InputTextProps> = ({
  value = "",
  onChange,
  onSubmit,
  onKeyDown,
  className = "",
  disabled = false,
  ref,
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KeyboardKeysEnum.Enter) {
      onSubmit?.(e);
    }
    onKeyDown?.(e);
  };

  return (
    <input
      ref={ref}
      disabled={disabled}
      className={`appearance-none focus:shadow-outline ${className}`}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  );
};
