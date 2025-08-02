import {
  selectCurrentCityCoords,
  useAppSelector,
  useGetCityWeatherQuery,
} from "@/app/store";
import { skipToken } from "@reduxjs/toolkit/query";

export const useCurrentCityWeather = () => {
  const currentCityCoords = useAppSelector(selectCurrentCityCoords);

  return useGetCityWeatherQuery(currentCityCoords ?? skipToken);
};
