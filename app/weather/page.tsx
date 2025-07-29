"use client";

import cn from "classnames";
import { CitySearch, CurrentWeather, PressureData } from "@/pages/weather";
import s from "./page.module.css";

export default function WeatherPage() {
  return (
    <div className="bg-light-gray h-full">
      <header className={s.header}>
        <CitySearch />
      </header>
      <main
        className={cn(
          s.main,
          "flex flex-col w-max rounded-xl shadow-md min-w-5xl my-0 mx-auto px-8 py-5 bg-white gap-10"
        )}
      >
        <CurrentWeather />
        {/* [] <24Hour Forecast /> */}
        <PressureData />
        {/* [] 10 day forecast */}
      </main>
    </div>
  );
}
