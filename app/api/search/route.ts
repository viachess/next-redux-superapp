import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { WEATHER_API_SEARCH_ENDPOINT } from "../constants";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get("q");
  const coords = searchParams.get("coords");

  if (!searchQuery && !coords) {
    return NextResponse.json(
      { error: "Query parameter 'q' or 'coords' is required" },
      { status: 400 }
    );
  }

  try {
    if (searchQuery) {
      // Use WeatherAPI.com for search queries
      const weatherApiKey = process.env.WEATHER_API_KEY;
      const { data } = await axios.get(
        `${WEATHER_API_SEARCH_ENDPOINT}?key=${weatherApiKey}&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      return NextResponse.json(data);
    } else {
      // Use Yandex for reverse geocoding
      const yandexApiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
      const url = `https://geocode-maps.yandex.ru/v1/?apikey=${yandexApiKey}&geocode=${encodeURIComponent(
        coords!
      )}&format=json&kind=locality&lang=en_US`;
      const { data } = await axios.get(url);
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error("API request failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 }
    );
  }
}
