"use client";

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
} from "@/icons";
import { useGetCityWeatherQuery } from "@/lib/features/weatherApi/weatherApiSlice";

export default function WeatherPage() {
  const { data, isSuccess, isLoading } = useGetCityWeatherQuery("New York");

  return (
    <div>
      <h1>Weather page</h1>
      {isLoading && <h2>Loading</h2>}
      {isSuccess && (
        <>
          <div>
            Location: {data.location.name}, {data.location.country}
          </div>
          <div>Temp in Celcius: {data.current.temp_c}</div>
        </>
      )}
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
