/**
 * Clamps a number between a minimum and maximum value.
 *
 * If min is greater than max, the values are swapped at runtime to ensure correct behavior.
 * This prevents counter-intuitive results when the arguments are provided in the wrong order.
 *
 * @param value The number to clamp.
 * @param min The minimum value (will be swapped with max if greater).
 * @param max The maximum value (will be swapped with min if less).
 * @returns The clamped value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.max(min, Math.min(value, max));
}

export function convertPressureToMercury(mb_pressure: number): number {
  return Math.floor(mb_pressure / 1.333);
}
