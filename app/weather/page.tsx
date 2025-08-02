"use client";

import cn from "classnames";
import {
  CitySearch,
  CurrentWeather,
  FindMeButton,
  PressureData,
} from "@/pages/weather";
import s from "./page.module.css";
import { updateCity, useAppDispatch } from "@/app/store";
import { useEffect, useState } from "react";

export default function WeatherPage() {
  const dispatch = useAppDispatch();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCity = localStorage.getItem("selectedCity");
      try {
        if (savedCity) {
          dispatch(updateCity(JSON.parse(savedCity)));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setHydrated(true);
      }
    }
  }, [dispatch]);

  return (
    <div className="bg-light-gray h-full">
      {hydrated && (
        <>
          <header className={s.header}>
            <FindMeButton />
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
        </>
      )}
    </div>
  );
}
