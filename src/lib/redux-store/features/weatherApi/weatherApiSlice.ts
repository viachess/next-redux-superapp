import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  City,
  CityWeatherData,
  LocationSearchResult,
  LocationSearchQuery,
} from "./types";

export const weatherApiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "api" }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    getCityWeather: builder.query<CityWeatherData, City>({
      query: (city) => `/weather?q=${city}`,
    }),
    searchLocation: builder.query<LocationSearchResult[], LocationSearchQuery>({
      // Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508
      // city name e.g.: q=Paris
      query: (searchQuery) => `/search?q=${searchQuery}`,
    }),
  }),
});

export const { useGetCityWeatherQuery, useSearchLocationQuery } =
  weatherApiSlice;
