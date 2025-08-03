"use client";

import { useEffect } from "react";
import { useAppDispatch, MODAL_IDS } from "@/app/store";
import { closeModal } from "@/app/store/slices/modal-slice/slice";
import { ModalContainer, PortalTypeEnum } from "@/shared/ui";
import { WeatherMapContent } from "./weather-map-content";

export const WeatherModal = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(closeModal());
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [dispatch]);

  return (
    <ModalContainer
      opacity={0.5}
      name={MODAL_IDS.WEATHER_MAP}
      zIndex={5}
      type={PortalTypeEnum.MODAL}
    >
      <WeatherMapContent />
    </ModalContainer>
  );
};
