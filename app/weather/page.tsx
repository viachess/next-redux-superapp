"use client";

import { CitySearch, WeatherDetails } from "@/pages/weather";

export default function WeatherPage() {
  return (
    <div className="bg-light-gray h-full w-full">
      <div>
        <header className="w-full p-4 sticky mx-auto my-0">
          <CitySearch />
        </header>
        <main>
          <WeatherDetails />
        </main>
      </div>
    </div>
  );
}
