import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { City, CityWeatherData } from "./types";

export const weatherApiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "api" }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    getCityWeather: builder.query<CityWeatherData, City>({
      query: (city) => `/weather?q=${city}`,
    }),
  }),
});

export const { useGetCityWeatherQuery } = weatherApiSlice;
