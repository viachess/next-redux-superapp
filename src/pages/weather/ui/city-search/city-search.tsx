"use client";

import {
  selectSearchLocationQuery,
  updateSearchLocationQuery,
  useAppSelector,
  useSearchLocationQuery,
  useAppDispatch,
  updateCity,
  LocationSearchResult,
  selectCurrentCity,
} from "@/app/store";
import { useDebounce } from "@/shared/hooks";
import { InputText, MagnifyingGlassIcon } from "@/shared/ui";
import Downshift from "downshift";
import cn from "classnames";
import {
  ChangeEvent,
  FC,
  memo,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";

export const CitySearch: FC = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const currentCity = useAppSelector(selectCurrentCity);
  const debouncedSearchQuery = useDebounce(searchQuery, 400);
  const searchLocationQuery = useAppSelector(selectSearchLocationQuery);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data: searchLocationResult,
    isLoading: isSearchLocationQueryLoading,
    isSuccess: isSearchLocationQuerySuccess,
    isError: isSearchLocationQueryError,
    isFetching: isSearchLocationFetching,
  } = useSearchLocationQuery({
    searchQuery: searchLocationQuery,
  });

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const resetSearchQuery = () => {
    setSearchQuery("");
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    resetSearchQuery();
    setIsInputFocused(false);
  };

  useEffect(() => {
    dispatch(updateSearchLocationQuery({ query: debouncedSearchQuery }));
  }, [debouncedSearchQuery, dispatch]);

  const emptySearchQuery = !searchQuery.length;
  const emptySearchLocationQuery = !searchLocationQuery.length;
  const emptyCitiesList = searchLocationResult && !searchLocationResult.length;

  const menuComponent = useMemo(() => {
    if (isSearchLocationQueryError) {
      return (
        <div className="text-red-500 bg-white rounded-xl mt-1 py-2 px-4 shadow-md border-[1px] border-gray-300">
          Search error, try a different query
        </div>
      );
    }

    if (
      isSearchLocationQuerySuccess &&
      !isSearchLocationFetching &&
      emptyCitiesList &&
      !emptySearchLocationQuery
    ) {
      return (
        <div className="bg-white rounded-xl mt-1 py-2 px-4 shadow-md border-[1px] border-gray-300">
          No cities found for that search query
        </div>
      );
    }

    return null;
  }, [
    emptySearchLocationQuery,
    emptyCitiesList,
    isSearchLocationQuerySuccess,
    isSearchLocationQueryError,
    isSearchLocationFetching,
  ]);

  const showSearchResults =
    !isSearchLocationQueryLoading &&
    isSearchLocationQuerySuccess &&
    !emptySearchQuery &&
    !emptySearchLocationQuery &&
    !emptyCitiesList;

  const locationName = useMemo(() => {
    if (!currentCity) {
      return "Find your city";
    }

    return `${currentCity.name}, ${currentCity.region}, ${currentCity.country}`;
  }, [currentCity]);

  return (
    <Downshift
      id="city-search-box"
      onChange={(selection) => {
        dispatch(updateCity(selection as LocationSearchResult));
        localStorage.setItem("selectedCity", JSON.stringify(selection));
        resetSearchQuery();
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }}
      itemToString={(item) => (item ? item.name : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        highlightedIndex,
        selectedItem,
        getRootProps,
        isOpen,
      }) => (
        <div className="w-full relative">
          <div
            className="relative shadow-md bg-white h-11 rounded-xl"
            {...getRootProps({}, { suppressRefError: true })}
          >
            <InputText
              {...getInputProps({
                value: searchQuery,
                onChange: handleSearchQueryChange,
                ref: inputRef,
                id: "city-search-input",
                onFocus: handleInputFocus,
                onBlur: handleInputBlur,
              })}
              className="relative w-full h-full px-2 py-1 rounded-xl"
            />
            <label
              htmlFor="city-search-input"
              className={`relative top-[-34px] flex justify-center items-center gap-1 pointer-events-none ${
                isInputFocused ? "opacity-0" : "opacity-100"
              }`}
            >
              <MagnifyingGlassIcon />
              <p>{locationName}</p>
            </label>
          </div>
          {menuComponent}
          <ul
            className={`absolute top-12 w-full rounded-xl bg-white mt-1 shadow-md max-h-80 overflow-y-auto z-10 ${
              !showSearchResults && "hidden"
            }`}
            {...getMenuProps()}
          >
            {showSearchResults
              ? searchLocationResult!.map((item, index) => {
                  const { name, region, country } = item;
                  return (
                    <li
                      className={cn(
                        highlightedIndex === index && "bg-blue-200",
                        selectedItem === item && "font-bold",
                        "py-2 px-3 flex flex-col first:rounded-t-xl last:rounded-b-xl"
                      )}
                      key={`${name}/${country}/${index}`}
                      {...getItemProps({
                        index,
                        item,
                      })}
                    >
                      <span>
                        {name}, {region}, {country}
                      </span>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
});

CitySearch.displayName = "CitySearch";
