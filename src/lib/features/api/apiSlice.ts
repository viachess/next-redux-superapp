import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { Post } from "@/features/posts/postsSlice";
import { WEATHER_API_BASE_URL } from "./constants";

type CityWeatherData = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
};

type City = string;

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: WEATHER_API_BASE_URL }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    getCityWeather: builder.query<CityWeatherData, City>({
      query: (city) =>
        `/current.json?q=${city}&key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetCityWeatherQuery } = apiSlice;
