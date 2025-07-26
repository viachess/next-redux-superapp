import {
  AtmospherePressureIcon,
  HumidityIcon,
  WindSpeedIcon,
} from "@/shared/ui";
import cn from "classnames";
import { FC, memo, useMemo } from "react";
import { useCurrentCityWeather } from "../../hooks/use-current-city-weather";
import s from "./current-weather.module.css";
import { WeatherIcon } from "./ui/weather-icon";

export const CurrentWeather: FC = memo(() => {
  const {
    data: weatherData,
    isSuccess,
    isLoading: weatherIsLoading,
  } = useCurrentCityWeather();

  const currentTemperatureSign = useMemo(() => {
    if (weatherData?.current.temp_c === 0 || !weatherData) {
      return "";
    }
    if (weatherData.current.temp_c > 0) {
      return "+";
    }
    return "-";
  }, [weatherData]);

  const feelsLikeTemperature = useMemo(() => {
    if (weatherData?.current.feelslike_c === 0 || !weatherData) {
      return weatherData?.current.feelslike_c;
    }

    if (weatherData.current.feelslike_c > 0) {
      return `+${Math.floor(weatherData.current.feelslike_c)}`;
    }
    return `-${Math.floor(weatherData.current.feelslike_c)}`;
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
    <div className="rounded-t-xl px-8 pt-5 pb-0">
      {weatherIsLoading && <h2>Loading</h2>}
      {isSuccess && (
        <div className="flex w-full">
          {/* large number with current temperature */}
          <div className="flex items-center mr-4">
            <span className={cn(s.side, s.sign)}>{currentTemperatureSign}</span>
            <span className={s.temperature}>
              {Math.round(weatherData.current.temp_c)}
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
              {/* feels like description */}
              <div>Feels like {feelsLikeTemperature}°</div>
              {/* TODO: add icons for each line */}
              <div className="flex gap-6">
                {/* wind speed */}
                <div className="flex items-center gap-1">
                  <div className="rounded-3xl bg-light-gray w-6 h-6 flex items-center justify-center">
                    <WindSpeedIcon size={20} stroke="currentColor" />
                  </div>
                  <span>
                    {(weatherData.current.wind_kph / 3.6).toFixed(1)}ms{" "}
                    {weatherData.current.wind_dir}
                  </span>
                </div>
                {/* pressure */}
                <div className="flex items-center gap-1">
                  <div className="rounded-3xl bg-light-gray w-6 h-6 flex items-center justify-center">
                    <AtmospherePressureIcon size={16} stroke="currentColor" />
                  </div>
                  {/* millibars to mm of mercury */}
                  <span>
                    {Math.floor(weatherData.current.pressure_mb / 1.333)}
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
