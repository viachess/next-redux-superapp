import { useEffect, useState } from "react";

export function useYMaps3Instance() {
  const [ymaps, setYmaps] = useState<typeof ymaps3 | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (ymaps3) {
        setYmaps(ymaps3);
      } else {
        const checkYmaps = setInterval(() => {
          if (ymaps3) {
            setYmaps(ymaps3);
            clearInterval(checkYmaps);
          }
        }, 150);

        return () => clearInterval(checkYmaps);
      }
    }
  }, []);

  return ymaps;
}
