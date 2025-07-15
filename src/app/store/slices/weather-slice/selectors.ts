import { RootState } from "../../types";

export const selectCurrentCityName = (state: RootState) =>
  state.weatherSlice.currentCityName;
export const selectCurrentCityCoords = (state: RootState) =>
  state.weatherSlice.currentCityCoords;
export const selectSearchLocationQuery = (state: RootState) =>
  state.weatherSlice.searchLocationQuery;
