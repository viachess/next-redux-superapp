import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { WEATHER_API_BASE_URL } from "../constants";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get("q");
  if (!searchQuery) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.WEATHER_API_KEY;
  const url = `${WEATHER_API_BASE_URL}/search.json?q=${encodeURIComponent(
    searchQuery
  )}&key=${apiKey}`;

  const { data } = await axios.get(url);

  return NextResponse.json(data);
}
