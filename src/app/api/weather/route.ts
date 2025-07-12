import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("q");
  if (!city) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.weatherapi.com/v1/current.json?q=${encodeURIComponent(
    city
  )}&key=${apiKey}`;

  const { data } = await axios.get(url);

  return NextResponse.json(data);
}
