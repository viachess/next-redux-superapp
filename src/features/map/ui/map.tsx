"use client";

import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useYandexMapsModules } from "../lib/use-yandex-map";
import {
  BehaviorMapEventHandler,
  DomEventHandler,
  LngLat,
} from "@yandex/ymaps3-types";
import { DEFAULT_MOSCOW_COORDS } from "../model/constants";

interface MapProps {
  center?: LngLat;
  markerLocation?: LngLat;
  onClick?: (coords: LngLat) => void;
}

const DEFAULT_ZOOM_LEVEL = 9;

export const Map: React.FC<MapProps> = memo(
  ({
    center = DEFAULT_MOSCOW_COORDS,
    markerLocation = DEFAULT_MOSCOW_COORDS,
    onClick,
  }) => {
    const [zoom, setZoom] = useState(DEFAULT_ZOOM_LEVEL);
    const zoomRef = useRef<number | null>(null);
    const yMapsModules = useYandexMapsModules();

    const handleMapClick: DomEventHandler = useCallback(
      (o, e) => {
        onClick?.(e.coordinates);
        if (zoomRef.current) {
          setZoom(zoomRef.current);
          zoomRef.current = null;
        }
      },
      [onClick]
    );

    const location = useMemo(() => {
      return {
        center,
        zoom,
      };
    }, [center, zoom]);

    if (!yMapsModules || !ymaps3) return null;
    const handleActionEnd: BehaviorMapEventHandler = (e) => {
      if (e.type === "scrollZoom") {
        zoomRef.current = e.location.zoom;
      }
    };
    const reactify = yMapsModules.yMaps.reactify.bindTo(React, ReactDOM);

    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapFeatureDataSource,
      YMapLayer,
      YMapControls,
      YMapMarker,
      YMapListener,
    } = reactify.module(ymaps3);

    const { YMapZoomControl } = reactify.module(
      yMapsModules.zoomControlsModule
    );
    const { YMapDefaultMarker } = reactify.module(
      yMapsModules.defaultMarkerModule
    );

    return (
      <div className="w-full h-full">
        <YMap location={location} mode="vector">
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />
          {/* <YMapFeatureDataSource id="weather-map" /> */}
          {/* <YMapMarker coordinates={center} draggable={true}>
          <section>
            <h1>You can drag this header</h1>
          </section>
        </YMapMarker> */}
          <YMapDefaultMarker coordinates={markerLocation} />
          <YMapListener
            onClick={handleMapClick}
            onActionEnd={handleActionEnd}
          />
        </YMap>
      </div>
    );
  }
);
Map.displayName = "Map";
