import {
  AtmospherePressureIcon,
  HumidityIcon,
  WindSpeedIcon,
} from "@/shared/ui";
import cn from "classnames";
import { FC, memo, useMemo } from "react";
import { useCurrentCityWeather } from "../../model/use-current-city-weather";
import s from "./current-weather.module.css";
import { WeatherIcon } from "./ui/weather-icon";
import { convertPressureToMercury } from "@/shared";

export const CurrentWeather: FC = memo(() => {
  const {
    data: weatherData,
    isSuccess,
    isLoading: weatherIsLoading,
  } = useCurrentCityWeather();

  const currentTemperatureSign = useMemo(() => {
    if (!weatherData || weatherData.current.temp_c <= 0) {
      return "";
    }
    return "+";
  }, [weatherData]);

  const feelsLikeTemperature = useMemo(() => {
    if (!weatherData || weatherData.current.feelslike_c <= 0) {
      return Math.floor(weatherData?.current.feelslike_c || 0);
    }
    return `+${Math.floor(weatherData.current.feelslike_c)}`;
  }, [weatherData]);

  const precipitationForecastText = useMemo(() => {
    // TODO: request forecast related to rain and form the phrase around it
    // possible options:
    // 1. rain is expected in {time}
    // 2. no precipitation expected for the next 2 hours
    // [] if it's raining, don't show that text
    return "precipitation forecast text";
  }, []);

  return (
    <div>
      {weatherIsLoading && (
        <div className="flex w-full justify-start items-center py-8">
          <svg
            className="animate-spin h-12 w-12 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      )}
      {isSuccess && (
        <div className="flex w-full">
          {/* large number with current temperature */}
          <div className="flex items-center mr-4">
            <span className={cn(s.side, s.sign)}>{currentTemperatureSign}</span>
            <span className={s.temperature}>
              {Math.floor(weatherData.current.temp_c)}
            </span>
            <span className={cn(s.side, s.degree)}>°</span>
          </div>
          <div className="flex flex-col justify-between w-full pt-3">
            <div className="flex items-center gap-4 font-medium">
              <WeatherIcon weatherCode={weatherData.current.condition.code} />
              {/* short current weather description */}
              <span>
                {weatherData.current.condition.text},{" "}
                {precipitationForecastText}
              </span>
            </div>
            {/* feels like block */}
            <div className="flex justify-between pb-4 text-[var(--text-secondary)]">
              <div>Feels like {feelsLikeTemperature}°</div>
              <div className="flex gap-6">
                {/* wind speed */}
                <div className="flex items-center gap-1">
                  <div className="rounded-3xl bg-light-gray w-6 h-6 flex items-center justify-center">
                    <WindSpeedIcon size={20} stroke="currentColor" />
                  </div>
                  <span>
                    <span>
                      {(weatherData.current.wind_kph / 3.6).toFixed(1)} m/s{" "}
                      {weatherData.current.wind_dir}
                    </span>
                  </span>
                </div>
                {/* pressure */}
                <div className="flex items-center gap-1">
                  <div className="rounded-3xl bg-light-gray w-6 h-6 flex items-center justify-center">
                    <AtmospherePressureIcon size={16} stroke="currentColor" />
                  </div>
                  <span>
                    {convertPressureToMercury(weatherData.current.pressure_mb)}
                  </span>
                </div>
                {/* humidity */}
                <div className="flex items-center gap-1">
                  <div className="rounded-3xl bg-light-gray w-6 h-6 flex items-center justify-center">
                    <HumidityIcon size={16} stroke="currentColor" />
                  </div>
                  <span>{weatherData.current.humidity}%</span>
                </div>
                {/* water temp, api doesn't offer water temperature */}
                {/* <div className="flex items-center gap-1">
                  <div className="rounded-3xl bg-light-gray w-6 h-6 flex items-center justify-center">
                    <WaterTemperatureIcon size={16} stroke="currentColor" />
                  </div>
                  <span>25°</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

CurrentWeather.displayName = "CurrentWeather";
