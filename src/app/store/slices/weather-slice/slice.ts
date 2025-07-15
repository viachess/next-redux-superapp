import { createSlice } from "@reduxjs/toolkit";
import {
  UpdateCityAction,
  UpdateSearchLocationQueryAction,
  WeatherSliceState,
} from "./types";

const initialState: WeatherSliceState = {
  currentCityName: "",
  currentCityCoords: undefined,
  searchLocationQuery: "",
};

const weatherSlice = createSlice({
  name: "weather-slice",
  initialState,
  reducers: {
    updateCity(state, action: UpdateCityAction) {
      const { name, lat, lon } = action.payload;
      state.currentCityName = name;
      state.currentCityCoords = {
        lat,
        lon,
      };
    },
    updateSearchLocationQuery(state, action: UpdateSearchLocationQueryAction) {
      const { query } = action.payload;
      state.searchLocationQuery = query;
    },
  },
});

export const weatherSliceReducer = weatherSlice.reducer;
export const { updateCity, updateSearchLocationQuery } = weatherSlice.actions;
