"use client";

import { FC, memo, useCallback, useEffect, useState } from "react";
import { InputText } from "..";
import { useDebounce } from "@/lib/hooks";

type SearchInputProps = {
  onSearchQueryChange: (value: string) => void;
};

export const SearchInput: FC<SearchInputProps> = memo(
  ({ onSearchQueryChange }) => {
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 600);

    const handleChange = useCallback(
      (value: string) => {
        setSearchValue(value);
      },
      [setSearchValue]
    );

    useEffect(() => {
      onSearchQueryChange(debouncedSearchValue);
    }, [debouncedSearchValue, onSearchQueryChange]);

    return <InputText onChange={handleChange} />;
  }
);

SearchInput.displayName = "SearchInput";
