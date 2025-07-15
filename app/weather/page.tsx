"use client";

import {
  selectCurrentCityCoords,
  useAppSelector,
  useGetCityWeatherQuery,
} from "@/app/store";
import { CitySearch } from "@/pages/weather";
import {
  CloudIcon,
  CloudWithLightningAndRainIcon,
  CloudWithLightningIcon,
  CloudWithRainIcon,
  CloudWithSnowIcon,
  SunBehindCloudIcon,
  SunBehindLargeCloudIcon,
  SunBehindRainCloudIcon,
  SunBehindSmallCloudIcon,
  SunIcon,
} from "@/shared/ui";

export default function WeatherPage() {
  const currentCityCoords = useAppSelector(selectCurrentCityCoords);

  const {
    data: weatherData,
    isSuccess,
    isLoading: weatherIsLoading,
  } = useGetCityWeatherQuery(currentCityCoords, {
    skip: !currentCityCoords,
  });

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
      <CitySearch />
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
