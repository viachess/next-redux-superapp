"use client";

import { FC, memo } from "react";
import { PressureArc } from "../pressure-arc/pressure-arc";
import { useCurrentCityWeather } from "../../model/use-current-city-weather";
import {
  ABOVE_PRESSURE_NORM_COLOR,
  BELOW_PRESSURE_NORM_COLOR,
  PRESSURE_NORM_COLOR,
  PRESSURE_NORM_MAX,
  PRESSURE_NORM_MIN,
} from "../pressure-arc";
import { convertPressureToMercury } from "@/shared";

const getPressureStatus = (
  currentPressure: number
): "below" | "normal" | "above" => {
  if (currentPressure < PRESSURE_NORM_MIN) {
    return "below";
  }
  if (currentPressure > PRESSURE_NORM_MAX) {
    return "above";
  }
  return "normal";
};

const getPressureNormText = (currentPressure: number): string => {
  const status = getPressureStatus(currentPressure);
  if (status === "below") {
    return "Below the norm";
  }
  if (status === "above") {
    return "Above the norm";
  }
  return "Normal";
};

const getNormTextColor = (currentPressure: number): string => {
  const status = getPressureStatus(currentPressure);
  if (status === "below") {
    return BELOW_PRESSURE_NORM_COLOR;
  }
  if (status === "above") {
    return ABOVE_PRESSURE_NORM_COLOR;
  }
  return PRESSURE_NORM_COLOR;
};

export const PressureData: FC = memo(() => {
  const weather = useCurrentCityWeather();

  if (!weather.data) {
    return null;
  }

  const { location, current } = weather.data;

  const convertedPressure = convertPressureToMercury(current.pressure_mb);
  const normTextColor = getNormTextColor(convertedPressure);
  const pressureNormText = getPressureNormText(convertedPressure);

  return (
    <div className="flex items-center gap-6">
      <PressureArc />
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Pressure in {location.name}</h1>
        <div className="flex gap-3">
          <span
            className="font-bold"
            style={{
              color: normTextColor,
            }}
          >
            {pressureNormText}
          </span>
          <span>
            Norm: {PRESSURE_NORM_MIN}-{PRESSURE_NORM_MAX} mm of mercury column
          </span>
        </div>
      </div>
    </div>
  );
});

PressureData.displayName = "PressureData";
