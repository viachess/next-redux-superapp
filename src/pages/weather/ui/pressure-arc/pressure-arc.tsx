"use client";

import { FC, memo } from "react";
import { Group } from "@visx/group";
import { Arc, Circle } from "@visx/shape";
import { CustomArc } from "./custom-arc";
import { useCurrentCityWeather } from "../../hooks/use-current-city-weather";

const CIRCLE_SIZE = 200;
const ARC_WIDTH = CIRCLE_SIZE / 35;
const OUTER_RADIUS = CIRCLE_SIZE / 2 - ARC_WIDTH;
const INNER_RADIUS = CIRCLE_SIZE / 2;
const IDLE_COLOR = "#C4CAD0";
const CIRCLE_RADIUS = ARC_WIDTH * 1.5;

const arcs = [
  {
    startAngle: 1.25 * Math.PI,
    endAngle: 1.75 * Math.PI,
    pressureMin: 690,
    pressureMax: 738,
    color: "#FFD23F",
    padAngle: 0.1,
    outerRadius: OUTER_RADIUS,
    innerRadius: INNER_RADIUS,
  },
  {
    startAngle: 1.75 * Math.PI,
    endAngle: 2.25 * Math.PI,
    pressureMin: 739,
    pressureMax: 759,
    color: "#09E85E",
    padAngle: 0,
    outerRadius: OUTER_RADIUS,
    innerRadius: INNER_RADIUS,
  },
  {
    startAngle: 2.25 * Math.PI,
    endAngle: 2.75 * Math.PI,
    pressureMin: 760,
    pressureMax: 800,
    color: "#D34E24",
    padAngle: 0.1,
    outerRadius: OUTER_RADIUS,
    innerRadius: INNER_RADIUS,
  },
];

// Меньше нормы: 690 - 738
// Норма: 739−759 мм рт. ст.
// Выше нормы: 760 - 800 мм рт.ст

export const PressureArc: FC = memo(() => {
  const weatherQuery = useCurrentCityWeather();
  if (!weatherQuery.data?.current.pressure_mb) {
    return null;
  }

  const pressure = Math.floor(weatherQuery.data.current.pressure_mb / 1.333);

  // Clamp pressure to global min/max
  const globalMin = arcs[0].pressureMin;
  const globalMax = arcs[arcs.length - 1].pressureMax;
  const clampedPressure = Math.max(globalMin, Math.min(pressure, globalMax));

  // Select the arc whose range includes the clamped pressure (including endpoints)
  let selectedArc = arcs[0];
  let t = 0;
  // Use a small epsilon for floating point comparison
  const EPSILON = 1e-6;
  if (Math.abs(clampedPressure - globalMax) < EPSILON) {
    selectedArc = arcs[arcs.length - 1];
    t = 1;
  } else {
    selectedArc =
      arcs.find(
        (arc) =>
          clampedPressure >= arc.pressureMin &&
          clampedPressure <= arc.pressureMax
      ) || arcs[0];
    if (selectedArc.pressureMax !== selectedArc.pressureMin) {
      t =
        (clampedPressure - selectedArc.pressureMin) /
        (selectedArc.pressureMax - selectedArc.pressureMin);
    }
    t = Math.max(0, Math.min(1, t));
  }

  // Calculate circle position (midpoint between inner and outer radius)
  const r = (OUTER_RADIUS + INNER_RADIUS) / 2;
  // Calculate angular offset so the whole circle stays inside the arc
  const angleOffset = CIRCLE_RADIUS / r;
  const visibleStart = selectedArc.startAngle + (selectedArc.padAngle || 0) / 2;
  const visibleEnd = selectedArc.endAngle - (selectedArc.padAngle || 0) / 2;
  const safeStart = visibleStart + angleOffset;
  const safeEnd = visibleEnd - angleOffset;
  const angle = safeStart + t * (safeEnd - safeStart);

  const offset = -Math.PI / 2;
  const normalizedAngle = (angle + offset) % (2 * Math.PI);
  const x = r * Math.cos(normalizedAngle);
  const y = r * Math.sin(normalizedAngle);

  return (
    <div className="chords">
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
          {/* Draw the circle for the current pressure */}
          <Circle cx={x} cy={y} r={CIRCLE_RADIUS} fill="rgba(0, 0, 0, 0.8)" />
        </Group>
      </svg>
    </div>
  );
});

PressureArc.displayName = "PressureArc";
