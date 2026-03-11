import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/api-auth";
import type { GooglePlaceSearchResult } from "@/lib/google-places";

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export async function POST(request: NextRequest) {
  const authError = await verifyAdminAuth(request);
  if (authError) return authError;

  if (!GOOGLE_API_KEY) {
    return NextResponse.json(
      { error: "Google Places API key non configurata" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const query = body.query?.trim();
  if (!query) {
    return NextResponse.json(
      { error: "Query di ricerca mancante" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_API_KEY,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.primaryType,places.primaryTypeDisplayName,places.location,places.businessStatus",
        },
        body: JSON.stringify({
          textQuery: query,
          languageCode: "it",
          maxResultCount: 10,
          locationBias: {
            circle: {
              center: { latitude: 40.6, longitude: 15.0 },
              radius: 50000,
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Places search error:", response.status, errorText);
      console.error("API Key present:", !!GOOGLE_API_KEY, "Key length:", GOOGLE_API_KEY?.length);
      return NextResponse.json(
        { error: "Errore nella ricerca Google Places", debug: errorText },
        { status: 502 }
      );
    }

    const data = await response.json();
    const places: GooglePlaceSearchResult[] = (data.places || []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (p: any) => ({
        id: p.id,
        displayName: p.displayName?.text || "",
        formattedAddress: p.formattedAddress || "",
        rating: p.rating,
        userRatingCount: p.userRatingCount,
        primaryType: p.primaryType,
        primaryTypeDisplayName: p.primaryTypeDisplayName?.text,
        latitude: p.location?.latitude,
        longitude: p.location?.longitude,
        businessStatus: p.businessStatus,
      })
    );

    return NextResponse.json({ places });
  } catch (error) {
    console.error("Google Places search exception:", error);
    return NextResponse.json(
      { error: "Errore di connessione a Google Places" },
      { status: 502 }
    );
  }
}
