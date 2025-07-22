import {
  WeatherConditionsCodesEnum,
  weatherConditionsMap,
} from "@/shared/conditions";
import { FC, memo } from "react";

type Props = {
  weatherCode: number;
};

export const WeatherIcon: FC<Props> = memo(({ weatherCode }) => {
  const code = weatherCode.toString() as WeatherConditionsCodesEnum;
  const Icon = weatherConditionsMap[code]?.icon;
  return Icon ? <Icon size={36} /> : null;
});

WeatherIcon.displayName = "WeatherIcon";
