"use client";

import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, closeModal, updateCity } from "@/app/store";
import { Map } from "@/features/map";
import { useGeolocation } from "@/shared/hooks";
import type { LngLat } from "@yandex/ymaps3-types";
import s from "./weather-modal.module.scss";
import { DEFAULT_MOSCOW_COORDS } from "@/features/map";
import { CityList } from "./city-list";

interface City {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

export const WeatherMapContent = () => {
  const dispatch = useAppDispatch();
  const { loading, latitude, longitude, error } = useGeolocation();

  const [mapCenter, setMapCenter] = useState<LngLat>(DEFAULT_MOSCOW_COORDS);

  const [markerLocation, setMarkerLocation] = useState<LngLat>(mapCenter);

  useEffect(() => {
    if (latitude && longitude && !loading) {
      const newCenter: LngLat = [longitude, latitude];
      setMapCenter(newCenter);
      setMarkerLocation(newCenter);
    }
  }, [latitude, longitude, loading]);

  const handleMapClick = useCallback((coords: LngLat) => {
    setMarkerLocation(coords);
    setMapCenter(coords);
  }, []);

  const handleConfirmSelection = useCallback(
    (city: City) => {
      dispatch(updateCity(city));
      dispatch(closeModal());
    },
    [dispatch]
  );

  return (
    <div className={s.modal}>
      {!loading && error && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-gray-100 text-gray-700 px-4 py-2 rounded shadow text-sm z-10">
          geolocation is disabled by user
          {error.message}
        </div>
      )}
      <div className="flex h-full">
        <div className="flex-1">
          <Map
            center={mapCenter}
            markerLocation={markerLocation}
            onClick={handleMapClick}
          />
        </div>
        <CityList
          center={mapCenter}
          onConfirmSelection={handleConfirmSelection}
        />
      </div>
    </div>
  );
};
