import { PayloadAction } from "@reduxjs/toolkit";
import { LocationSearchResult } from "../../features";

export type WeatherSliceState = {
  currentCity: LocationSearchResult | undefined;
  searchLocationQuery: string;
};

export type UpdateCityAction = PayloadAction<LocationSearchResult>;
export type UpdateSearchLocationQueryAction = PayloadAction<{ query: string }>;
