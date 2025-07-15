import { PayloadAction } from "@reduxjs/toolkit";
import { LocationSearchResult } from "../../features";

export type WeatherSliceState = {
  currentCityName: string;
  currentCityCoords:
    | {
        lat: number;
        lon: number;
      }
    | undefined;
  searchLocationQuery: string;
};

export type UpdateCityAction = PayloadAction<
  Pick<LocationSearchResult, "name" | "lat" | "lon">
>;
export type UpdateSearchLocationQueryAction = PayloadAction<{ query: string }>;
