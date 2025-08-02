import { useEffect, useState } from "react";
import { useYMaps3Instance } from "./use-y-maps-3-instance";

type Modules = {
  yMaps: typeof import("@yandex/ymaps3-types/reactify/index");
  zoomControlsModule: typeof import("@yandex/ymaps3-types/packages/controls/index");
  defaultMarkerModule: typeof import("@yandex/ymaps3-types/packages/markers/index");
} | null;

export function useYandexMapsModules() {
  const [yMapsModules, setYmapsModules] = useState<Modules>(null);
  const ymaps3Instance = useYMaps3Instance();

  useEffect(() => {
    async function loadYandexMapComponents() {
      if (yMapsModules !== null || ymaps3Instance === null) return;
      // Import Reactify and required modules
      const [ymaps3React, zoomControlsModule, defaultMarkerModule] =
        await Promise.all([
          ymaps3Instance.import("@yandex/ymaps3-reactify"),
          ymaps3Instance.import("@yandex/ymaps3-controls@0.0.1"),
          ymaps3Instance.import("@yandex/ymaps3-markers@0.0.1"),
          ymaps3Instance.ready,
        ]);
      setYmapsModules({
        yMaps: ymaps3React,
        zoomControlsModule,
        defaultMarkerModule,
      });
    }
    loadYandexMapComponents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ymaps3Instance]);

  return yMapsModules;
}
