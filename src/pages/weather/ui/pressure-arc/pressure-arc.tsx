"use client";

import { FC, memo } from "react";
import { Group } from "@visx/group";
import { Arc, Circle } from "@visx/shape";
import { useCurrentCityWeather } from "../../hooks/use-current-city-weather";
import {
  arcs,
  CIRCLE_RADIUS,
  CIRCLE_SIZE,
  IDLE_COLOR,
  INNER_RADIUS,
  OUTER_RADIUS,
} from "./constants";
import { getSelectedArcAndT, getCirclePosition } from "./utils";
import { clamp, convertPressureToMercury } from "@/shared";

export const PressureArc: FC = memo(() => {
  const weatherQuery = useCurrentCityWeather();
  if (!weatherQuery.data) {
    return null;
  }

  const pressure = convertPressureToMercury(
    weatherQuery.data.current.pressure_mb
  );

  // на всякий случай помещаем давление в доступные границы (690 - 800)
  const globalMin = arcs[0].pressureMin;
  const globalMax = arcs[arcs.length - 1].pressureMax;
  const clampedPressure = clamp(pressure, globalMin, globalMax);

  // Select the arc whose range includes the clamped pressure (including endpoints) and calculate t
  const { selectedArc, t } = getSelectedArcAndT(
    arcs,
    clampedPressure,
    globalMax
  );

  // Calculate circle position (midpoint between inner and outer radius)
  const { x, y } = getCirclePosition(
    selectedArc,
    t,
    OUTER_RADIUS,
    INNER_RADIUS,
    CIRCLE_RADIUS
  );

  return (
    <div className="pressure-arc">
      <svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
        <Group top={CIRCLE_SIZE / 2} left={CIRCLE_SIZE / 2}>
          {arcs.map(
            (
              {
                startAngle,
                endAngle,
                outerRadius,
                innerRadius,
                padAngle,
                color,
              },
              i
            ) => {
              return (
                <Arc
                  key={i}
                  startAngle={startAngle}
                  endAngle={endAngle}
                  outerRadius={outerRadius}
                  innerRadius={innerRadius}
                  padAngle={padAngle}
                  cornerRadius={3}
                  fill={color === selectedArc.color ? color : IDLE_COLOR}
                />
              );
            }
          )}
          {/* Круг отображающий текущее значение давления */}
          <Circle
            cx={x}
            cy={y}
            r={CIRCLE_RADIUS}
            fill="rgba(0, 0, 0)"
            stroke="white"
            strokeWidth={1}
          />
          <text
            fill="black"
            y={8}
            fontSize={32}
            fontWeight={600}
            textAnchor="middle"
            pointerEvents="none"
          >
            {pressure}
          </text>
          <text
            fill="grey"
            y={40}
            fontSize={14}
            textAnchor="middle"
            pointerEvents="none"
          >
            mm Hg
          </text>
        </Group>
      </svg>
    </div>
  );
});

PressureArc.displayName = "PressureArc";
