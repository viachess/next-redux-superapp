import { useEffect, useRef, useState } from "react";

type GeolocationState = {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: GeolocationPositionError | null;
};

export function useGeolocation(options: PositionOptions = {}) {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });

  const optionsRef = useRef<PositionOptions>(options);

  useEffect(() => {
    let watchId: number | undefined;

    if ("geolocation" in navigator) {
      const onEvent = ({ coords, timestamp }: GeolocationPosition) => {
        if (process.env.NODE_ENV === "development") {
          console.log(
            "Geolocation success:",
            coords.latitude,
            coords.longitude
          );
        }
        setState((prev) => ({
          ...prev,
          loading: false,
          timestamp,
          latitude: coords.latitude,
          longitude: coords.longitude,
          altitude: coords.altitude,
          accuracy: coords.accuracy,
          altitudeAccuracy: coords.altitudeAccuracy,
          heading: coords.heading,
          speed: coords.speed,
        }));
      };

      const onEventError: PositionErrorCallback = (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log("Geolocation error:", error.code, error.message);
        }
        setState((s) => ({
          ...s,
          loading: false,
          error,
        }));
      };

      // First try to get current position
      navigator.geolocation.getCurrentPosition(
        onEvent,
        onEventError,
        optionsRef.current
      );

      // Then start watching for position updates
      watchId = navigator.geolocation.watchPosition(
        onEvent,
        onEventError,
        optionsRef.current
      );
    } else {
      // Geolocation is not supported
      console.error("Geolocation is not supported by this browser.");
      setState((prev) => ({
        ...prev,
        loading: false,
        error: null, // Don't set an error for unsupported geolocation
      }));
    }

    return () => {
      if ("geolocation" in navigator && watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return state;
}
