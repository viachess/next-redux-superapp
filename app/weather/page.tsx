"use client";

import cn from "classnames";
import { CitySearch, CurrentWeather, PressureArc } from "@/pages/weather";
import s from "./page.module.css";

export default function WeatherPage() {
  return (
    <div className="bg-light-gray h-full">
      <header className={s.header}>
        <CitySearch />
      </header>
      <main className={cn(s.main, "w-max h-full rounded-xl shadow-md")}>
        <CurrentWeather />
        {/* [] <24Hour Forecast /> */}
        {/* [...] pie chart block */}
        <PressureArc />
        {/* [] 10 day forecast */}
      </main>
    </div>
  );
}
