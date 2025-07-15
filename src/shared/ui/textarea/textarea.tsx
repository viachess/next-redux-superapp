"use client";

import { KeyboardKeysEnum } from "@/shared/types/keyboard";
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  memo,
  RefObject,
  useEffect,
} from "react";

type TextAreaProps = {
  value: string;
  onChange: (value: string) => void;
  ref?: RefObject<HTMLTextAreaElement | null>;
  onSubmit?: () => void;
  disabled?: boolean;
  className?: string;
};

export const TextArea: FC<TextAreaProps> = memo(
  ({
    ref = null,
    onChange,
    onSubmit = () => {},
    value,
    className = "",
    disabled = false,
  }) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.ctrlKey && e.key === KeyboardKeysEnum.Enter) {
        onSubmit();
      }
    };

    useEffect(() => {
      if (ref && ref.current) {
        ref.current.style.height = "auto";
        ref.current.style.height = `${ref.current.scrollHeight}px`;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        id="message"
        rows={1}
        className={`block p-2.5 min-h-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-y-hidden ${className}`}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      ></textarea>
    );
  }
);

TextArea.displayName = "TextArea";
