export const MODAL_IDS = {
  WEATHER_MAP: "WEATHER_MAP_MODAL",
  // Add new IDs here
} as const;

export type ModalId = (typeof MODAL_IDS)[keyof typeof MODAL_IDS];
