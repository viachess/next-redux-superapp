"use client";

import { useState } from "react";
import type { LngLat } from "@yandex/ymaps3-types";
import { useSearchLocationQuery } from "@/app/store";

interface City {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

interface CityListProps {
  center: LngLat;
  onConfirmSelection?: (city: City) => void;
}

export const CityList = ({ center, onConfirmSelection }: CityListProps) => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const {
    data: searchResults,
    isLoading,
    error: queryError,
  } = useSearchLocationQuery(
    {
      lon: center[0],
      lat: center[1],
    },
    {
      skip: !center,
    }
  );

  const cities: City[] =
    searchResults?.map((result, index) => ({
      id: index,
      name: result.name,
      region: result.region,
      country: result.country,
      lat: result.lat,
      lon: result.lon,
    })) || [];

  const handleCityClick = (city: City) => {
    setSelectedCity(city);
  };

  const handleConfirmSelection = () => {
    if (selectedCity && onConfirmSelection) {
      onConfirmSelection(selectedCity);
    }
  };

  if (isLoading) {
    return (
      <div className="w-80 bg-white p-4 border-l border-gray-200 h-full">
        <div className="text-gray-500 text-center">Loading cities...</div>
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="w-80 bg-white p-4 border-l border-gray-200 h-full">
        <div className="text-red-500 text-center">Failed to fetch cities</div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      <h3 className="text-lg font-semibold p-4 border-b border-gray-200">
        Cities Nearby
      </h3>

      <div className="flex-1 overflow-y-auto p-4">
        {cities.length === 0 ? (
          <div className="text-gray-500 text-center">
            No cities found nearby
          </div>
        ) : (
          <div className="space-y-2">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => handleCityClick(city)}
                className={`cursor-pointer w-full text-left p-3 rounded-lg transition-colors ${
                  selectedCity?.id === city.id
                    ? "bg-blue-100 border-2 border-blue-300"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="font-medium text-gray-900">{city.name}</div>
                <div className="text-sm text-gray-600">
                  {city.region && `${city.region}, `}
                  {city.country}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedCity && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <button
            onClick={handleConfirmSelection}
            className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};
