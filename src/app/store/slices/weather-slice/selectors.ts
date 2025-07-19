import { RootState } from "../../types";

export const selectCurrentCity = (state: RootState) =>
  state.weatherSlice.currentCity;
export const selectCurrentCityCoords = (state: RootState) => {
  if (state.weatherSlice.currentCity) {
    return {
      lat: state.weatherSlice.currentCity.lat,
      lon: state.weatherSlice.currentCity.lon,
    };
  }
};
export const selectSearchLocationQuery = (state: RootState) =>
  state.weatherSlice.searchLocationQuery;
