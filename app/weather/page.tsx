"use client";

import { CitySuggest } from "@/pages/weather/ui";
import {
  CloudIcon,
  SunIcon,
  CloudWithLightningAndRainIcon,
  CloudWithLightningIcon,
  CloudWithRainIcon,
  CloudWithSnowIcon,
  SunBehindCloudIcon,
  SunBehindLargeCloudIcon,
  SunBehindRainCloudIcon,
  SunBehindSmallCloudIcon,
  SearchInput,
} from "@/shared/ui";
import { useGetCityWeatherQuery, useSearchLocationQuery } from "@/app/store";
import { useCallback, useState } from "react";

export default function WeatherPage() {
  const [currentCity, setCurrentCity] = useState("New York");
  const [searchLocationQuery, setSearchLocationQuery] = useState("");
  const {
    data: weatherData,
    isSuccess,
    isLoading: weatherIsLoading,
  } = useGetCityWeatherQuery(currentCity);

  const { data: searchLocationData, isLoading: searchLocationLoading } =
    useSearchLocationQuery(searchLocationQuery, {
      skip: !searchLocationQuery,
    });

  console.log(searchLocationData);

  const onSearchLocationQueryChange = useCallback((value: string) => {
    setSearchLocationQuery(value);
  }, []);

  return (
    <div>
      <h1>Weather page</h1>
      {weatherIsLoading && <h2>Loading</h2>}
      {isSuccess && (
        <>
          <div>
            Location: {weatherData.location.name},{weatherData.location.country}
          </div>
          <div>Temp in Celcius: {weatherData.current.temp_c}</div>
        </>
      )}
      <SearchInput onSearchQueryChange={onSearchLocationQueryChange} />
      {searchLocationQuery && <CitySuggest list={searchLocationData} />}
      <SunIcon size={36} />
      <CloudIcon size={36} />
      <CloudWithLightningAndRainIcon size={36} />
      <CloudWithLightningIcon size={36} />
      <CloudWithRainIcon size={36} />
      <CloudWithSnowIcon size={36} />
      <SunBehindCloudIcon size={36} />
      <SunBehindLargeCloudIcon size={36} />
      <SunBehindRainCloudIcon size={36} />
      <SunBehindSmallCloudIcon size={36} />
    </div>
  );
}
