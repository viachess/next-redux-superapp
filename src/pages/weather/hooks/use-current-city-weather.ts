import {
  selectCurrentCityCoords,
  useAppSelector,
  useGetCityWeatherQuery,
} from "@/app/store";

export const useCurrentCityWeather = () => {
  const currentCityCoords = useAppSelector(selectCurrentCityCoords);

  return useGetCityWeatherQuery(currentCityCoords, {
    skip: !currentCityCoords,
  });
};
