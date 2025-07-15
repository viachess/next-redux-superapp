"use client";

import {
  selectSearchLocationQuery,
  updateSearchLocationQuery,
  useAppSelector,
  useSearchLocationQuery,
  useAppDispatch,
  updateCity,
  LocationSearchResult,
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

/* 
  [] add isOpen state, depending on it show:
    [] disabled input with centered city name and a magnifier icon
    [] after click show enabled empty search input with suggestions as text is typed
*/

export const CitySearch: FC = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 400);
  const searchLocationQuery = useAppSelector(selectSearchLocationQuery);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data: searchLocationResult,
    isSuccess: isSearchLocationQuerySuccess,
    isError: isSearchLocationQueryError,
  } = useSearchLocationQuery(searchLocationQuery, {
    skip: !searchLocationQuery,
  });

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const resetSearchQuery = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    dispatch(updateSearchLocationQuery({ query: debouncedSearchQuery }));
  }, [debouncedSearchQuery, dispatch]);

  const emptySearchQuery = !searchLocationQuery.length;
  const emptyCitiesList = searchLocationResult && !searchLocationResult.length;
  const noSearchLocationResult = searchLocationResult === undefined;

  console.log("searchLocationQuery");
  console.log(searchLocationQuery);
  console.log("searchLocationResult");
  console.log(searchLocationResult);

  const menuComponent = useMemo(() => {
    if (isSearchLocationQueryError) {
      return <>search error</>;
    }

    if (!emptySearchQuery && emptyCitiesList && isSearchLocationQuerySuccess) {
      return <>No cities found for that search query</>;
    }

    return null;
  }, [
    emptySearchQuery,
    emptyCitiesList,
    isSearchLocationQuerySuccess,
    isSearchLocationQueryError,
  ]);

  const showSearchResults =
    isSearchLocationQuerySuccess && !emptySearchQuery && !emptyCitiesList;

  return (
    <Downshift
      id="city-search-box"
      onChange={(selection) => {
        const { name, lat, lon } = selection as LocationSearchResult;
        dispatch(
          updateCity({
            name,
            lat,
            lon,
          })
        );
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
      }) => (
        <div>
          <div className="w-72 flex gap-1">
            <div
              className="flex shadow-sm bg-white gap-0.5"
              {...getRootProps({}, { suppressRefError: true })}
            >
              <MagnifyingGlassIcon />
              <InputText
                {...getInputProps({
                  value: searchQuery,
                  onChange: handleSearchQueryChange,
                  ref: inputRef,
                })}
              />
            </div>
          </div>
          {menuComponent}
          <ul
            className={`absolute w-72 bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
              !showSearchResults && "hidden"
            }`}
            {...getMenuProps()}
          >
            {showSearchResults
              ? searchLocationResult.map((item, index) => {
                  const { name, country } = item;
                  return (
                    <li
                      className={cn(
                        highlightedIndex === index && "bg-blue-300",
                        selectedItem === item && "font-bold",
                        "py-2 px-3 shadow-sm flex flex-col"
                      )}
                      key={`${name}/${country}/${index}`}
                      {...getItemProps({
                        index,
                        item,
                      })}
                    >
                      <span>{name}</span>
                      <span>{country}</span>
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
