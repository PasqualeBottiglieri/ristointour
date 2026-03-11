import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/api-auth";
import {
  mapGoogleTypeToCategory,
  mapPriceLevel,
  mapWeekdayDescriptions,
  extractOpenTime,
  type GooglePlaceDetails,
} from "@/lib/google-places";

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const FIELD_MASK = [
  "displayName",
  "formattedAddress",
  "internationalPhoneNumber",
  "websiteUri",
  "rating",
  "userRatingCount",
  "regularOpeningHours.weekdayDescriptions",
  "priceLevel",
  "primaryType",
  "location",
  "googleMapsUri",
].join(",");

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
  const placeId = body.placeId?.trim();
  if (!placeId) {
    return NextResponse.json(
      { error: "Place ID mancante" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": GOOGLE_API_KEY,
          "X-Goog-FieldMask": FIELD_MASK,
          "X-Goog-Language-Code": "it",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Places details error:", errorText);
      return NextResponse.json(
        { error: "Errore nel recupero dettagli Google Places" },
        { status: 502 }
      );
    }

    const p = await response.json();
    const weekdays = p.regularOpeningHours?.weekdayDescriptions;

    const details: GooglePlaceDetails = {
      placeId,
      name: p.displayName?.text || "",
      address: p.formattedAddress || "",
      phone: p.internationalPhoneNumber || undefined,
      website: p.websiteUri || undefined,
      rating: p.rating,
      reviewCount: p.userRatingCount,
      priceRange: mapPriceLevel(p.priceLevel),
      openTime: extractOpenTime(weekdays),
      hours: mapWeekdayDescriptions(weekdays),
      category: mapGoogleTypeToCategory(p.primaryType),
      latitude: p.location?.latitude,
      longitude: p.location?.longitude,
      googleMapsUrl: p.googleMapsUri || undefined,
    };

    return NextResponse.json({ details });
  } catch (error) {
    console.error("Google Places details exception:", error);
    return NextResponse.json(
      { error: "Errore di connessione a Google Places" },
      { status: 502 }
    );
  }
}
