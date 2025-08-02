import { RootState } from "../../types";
import { createSelector } from "@reduxjs/toolkit";

export const selectCurrentCity = (state: RootState) =>
  state.weatherSlice.currentCity;

export const selectCurrentCityCoords = createSelector(
  [selectCurrentCity],
  (city) => {
    if (city) {
      return { lat: city.lat, lon: city.lon };
    }
    return undefined;
  }
);

export const selectSearchLocationQuery = (state: RootState) =>
  state.weatherSlice.searchLocationQuery;
