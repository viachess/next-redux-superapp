import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CityWeatherQuery,
  CityWeatherData,
  LocationSearchResult,
  LocationSearchQuery,
} from "./types";

export const weatherApiSlice = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "api" }),
  tagTypes: ["SearchLocationResult"],
  endpoints: (builder) => ({
    getCityWeather: builder.query<CityWeatherData, CityWeatherQuery>({
      query: (q) => `/weather?q=${q?.lat},${q?.lon}`,
    }),
    searchLocation: builder.query<LocationSearchResult[], LocationSearchQuery>({
      // Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508
      // city name e.g.: q=Paris
      queryFn: async (query, _queryApi, _extraOptions, fetchWithBQ) => {
        if (!query || query.trim() === "") {
          return { data: [] };
        }
        return (await fetchWithBQ(`search?q=${encodeURIComponent(query)}`)) as {
          data: LocationSearchResult[];
        };
      },
      providesTags: ["SearchLocationResult"],
    }),
  }),
});

export const { useGetCityWeatherQuery, useSearchLocationQuery } =
  weatherApiSlice;
