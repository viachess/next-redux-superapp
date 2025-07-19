import {
  selectCurrentCityCoords,
  useAppSelector,
  useGetCityWeatherQuery,
} from "@/app/store";
import { FC, memo, useMemo } from "react";
import cn from "classnames";
import s from "./weather-details.module.css";
import { WeatherIcon } from "./ui/weather-icon";

export const WeatherDetails: FC = memo(() => {
  const currentCityCoords = useAppSelector(selectCurrentCityCoords);

  const {
    data: weatherData,
    isSuccess,
    isLoading: weatherIsLoading,
  } = useGetCityWeatherQuery(currentCityCoords, {
    skip: !currentCityCoords,
  });

  const currentTemperatureSign = useMemo(() => {
    if (weatherData?.current.temp_c === 0 || !weatherData) {
      return "";
    }
    if (weatherData.current.temp_c > 0) {
      return "+";
    }
    return "-";
  }, [weatherData]);

  return (
    <div className="bg-white mx-auto mt-0 rounded-t-xl">
      {weatherIsLoading && <h2>Loading</h2>}
      {isSuccess && (
        <div className="flex">
          <div className="flex items-center">
            <span className={cn(s.side, s.sign)}>{currentTemperatureSign}</span>
            <span className={s.temperature}>
              {Math.round(weatherData.current.temp_c)}
            </span>
            {/* degree icon, maybe add farenheit selector later */}
            <span className={cn(s.side, s.degree)}>°</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-medium">
              <WeatherIcon />
              {/* short current weather description */}
              <span>Clear, no precipitation expected for the next 2 hours</span>
            </div>
            {/* feels like block */}
            <div className="flex justify-between">
              {/* feels like description */}
              <div>Feels like +24C</div>
              {/* TODO: add icons for each line */}
              <div className="flex gap-1">
                {/* wind speed */}
                <span>3,1ms NW</span>
                {/* pressure */}
                <span>763</span>
                {/* humidity */}
                <span>55%</span>
                {/* water temp ? */}
                <span>25°</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

WeatherDetails.displayName = "WeatherDetails";
