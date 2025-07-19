import { createSlice } from "@reduxjs/toolkit";
import {
  UpdateCityAction,
  UpdateSearchLocationQueryAction,
  WeatherSliceState,
} from "./types";

const initialState: WeatherSliceState = {
  currentCity: undefined,
  searchLocationQuery: "",
};

const weatherSlice = createSlice({
  name: "weather-slice",
  initialState,
  reducers: {
    updateCity(state, action: UpdateCityAction) {
      state.currentCity = { ...action.payload };
    },
    updateSearchLocationQuery(state, action: UpdateSearchLocationQueryAction) {
      const { query } = action.payload;
      state.searchLocationQuery = query;
    },
  },
});

export const weatherSliceReducer = weatherSlice.reducer;
export const { updateCity, updateSearchLocationQuery } = weatherSlice.actions;
