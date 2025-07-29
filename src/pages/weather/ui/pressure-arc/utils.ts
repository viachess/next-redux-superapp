import { clamp } from "@/shared";
import { ArcConfig } from "./types";

export function getSelectedArcAndT(
  arcs: Readonly<ArcConfig[]>,
  clampedPressure: number,
  globalMax: number
): { selectedArc: ArcConfig; t: number } {
  const EPSILON = 1e-6;
  let selectedArc = arcs[0];
  let t = 0;
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
    t = clamp(t, 0, 1);
  }
  return { selectedArc, t };
}

export function getCirclePosition(
  selectedArc: ArcConfig,
  t: number,
  OUTER_RADIUS: number,
  INNER_RADIUS: number,
  CIRCLE_RADIUS: number
): { x: number; y: number } {
  const r = (OUTER_RADIUS + INNER_RADIUS) / 2;
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
  return { x, y };
}
