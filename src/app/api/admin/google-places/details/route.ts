import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/api-auth";
import {
  mapGoogleTypeToCategory,
  mapPriceLevel,
  mapWeekdayDescriptions,
  extractOpenTime,
  type GooglePlaceDetails,
  type GooglePlacePhoto,
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
  "editorialSummary",
  "photos",
].join(",");

async function resolvePhotoUri(
  photoName: string,
  maxWidthPx: number
): Promise<string | null> {
  if (!GOOGLE_API_KEY) return null;
  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${maxWidthPx}&skipHttpRedirect=true`,
      { headers: { "X-Goog-Api-Key": GOOGLE_API_KEY } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.photoUri || null;
  } catch {
    return null;
  }
}

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

    // Resolve photo URIs in parallel (max 10)
    let photos: GooglePlacePhoto[] = [];
    if (p.photos && Array.isArray(p.photos)) {
      const photoSlice = p.photos.slice(0, 10);
      const resolved = await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        photoSlice.map(async (photo: any) => {
          const url = await resolvePhotoUri(photo.name, 800);
          if (!url) return null;
          return {
            url,
            widthPx: photo.widthPx || 0,
            heightPx: photo.heightPx || 0,
          };
        })
      );
      photos = resolved.filter((p): p is GooglePlacePhoto => p !== null);
    }

    const details: GooglePlaceDetails = {
      placeId,
      name: p.displayName?.text || "",
      address: p.formattedAddress || "",
      description: p.editorialSummary?.text || undefined,
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
      photos: photos.length > 0 ? photos : undefined,
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
