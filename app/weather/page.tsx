"use client";

import cn from "classnames";
import { CitySearch, WeatherDetails } from "@/pages/weather";
import s from "./page.module.css";

export default function WeatherPage() {
  return (
    <div className="bg-light-gray max-w-full h-full">
      <header className={s.header}>
        <CitySearch />
      </header>
      <main className={cn(s.main, "w-max h-full rounded-xl shadow-md")}>
        <WeatherDetails />
      </main>
    </div>
  );
}
