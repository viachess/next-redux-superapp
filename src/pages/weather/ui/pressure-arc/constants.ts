import { ArcConfig } from "./types";

export const CIRCLE_SIZE = 130;
export const ARC_WIDTH = 6;
export const OUTER_RADIUS = CIRCLE_SIZE / 2;
export const INNER_RADIUS = CIRCLE_SIZE / 2 - ARC_WIDTH;
export const IDLE_COLOR = "#C4CAD0";
export const CIRCLE_RADIUS = ARC_WIDTH;
export const PRESSURE_NORM_MIN = 739;
export const PRESSURE_NORM_MAX = 759;
export const BELOW_PRESSURE_NORM_COLOR = "#ffd23f";
export const PRESSURE_NORM_COLOR = "#09e85e";
export const ABOVE_PRESSURE_NORM_COLOR = "#d34e24";

// Меньше нормы: 690 - 738
// Норма: 739−759 мм рт. ст.
// Выше нормы: 760 - 800 мм рт.ст

export const arcs: ReadonlyArray<ArcConfig> = [
  {
    startAngle: 1.25 * Math.PI,
    endAngle: 1.75 * Math.PI,
    pressureMin: 690,
    pressureMax: 738,
    color: BELOW_PRESSURE_NORM_COLOR,
    padAngle: 0.1,
    outerRadius: OUTER_RADIUS,
    innerRadius: INNER_RADIUS,
  },
  {
    startAngle: 1.75 * Math.PI,
    endAngle: 2.25 * Math.PI,
    pressureMin: PRESSURE_NORM_MIN,
    pressureMax: PRESSURE_NORM_MAX,
    color: PRESSURE_NORM_COLOR,
    padAngle: 0,
    outerRadius: OUTER_RADIUS,
    innerRadius: INNER_RADIUS,
  },
  {
    startAngle: 2.25 * Math.PI,
    endAngle: 2.75 * Math.PI,
    pressureMin: 760,
    pressureMax: 800,
    color: ABOVE_PRESSURE_NORM_COLOR,
    padAngle: 0.1,
    outerRadius: OUTER_RADIUS,
    innerRadius: INNER_RADIUS,
  },
];
