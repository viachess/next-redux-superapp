import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CityWeatherQuery,
  CityWeatherData,
  LocationSearchResult,
  LocationSearchQuery,
  GeocoderResponse,
  WeatherApiSearchResponse,
} from "./types";
import { ArrayElement } from "@/shared/types";

const mapYandexLocation = (
  geoObject: ArrayElement<
    GeocoderResponse["response"]["GeoObjectCollection"]["featureMember"]
  >["GeoObject"]
): LocationSearchResult => {
  const point = geoObject.Point.pos.split(" ");
  const { CountryName, AdministrativeArea } =
    geoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country;

  return {
    country: CountryName,
    region: AdministrativeArea.AdministrativeAreaName,
    name: geoObject.name,
    lon: parseFloat(point[0]),
    lat: parseFloat(point[1]),
  };
};

const mapWeatherApiLocation = (
  location: WeatherApiSearchResponse
): LocationSearchResult => {
  return {
    name: location.name,
    region: location.region,
    country: location.country,
    lat: location.lat,
    lon: location.lon,
  };
};

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
        if (
          "searchQuery" in query &&
          (!query.searchQuery || query.searchQuery.trim() === "")
        ) {
          return { data: [] };
        }

        let searchParam = "";
        try {
          if ("searchQuery" in query) {
            searchParam = `q=${encodeURIComponent(query.searchQuery)}`;
          } else {
            searchParam = `coords=${query.lon},${query.lat}`;
          }

          const result = await fetchWithBQ(`search?${searchParam}`);

          if ("searchQuery" in query) {
            // WeatherAPI.com response
            const weatherApiData = result.data as WeatherApiSearchResponse[];
            return { data: weatherApiData.map(mapWeatherApiLocation) };
          } else {
            // Yandex Geocoder response
            const yandexData = result.data as GeocoderResponse;
            const mapped = yandexData.response.GeoObjectCollection.featureMember
              .filter(
                (member) =>
                  member.GeoObject.metaDataProperty.GeocoderMetaData.kind ===
                  "locality"
              )
              .map((member) => mapYandexLocation(member.GeoObject));

            return { data: mapped };
          }
        } catch (err) {
          console.error(err);
          return { data: [] };
        }
      },
      providesTags: ["SearchLocationResult"],
    }),
  }),
});

export const { useGetCityWeatherQuery, useSearchLocationQuery } =
  weatherApiSlice;
