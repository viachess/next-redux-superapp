"use client";

import { useGetCityWeatherQuery } from "@/lib/features/api/apiSlice";

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
    </div>
  );
}
