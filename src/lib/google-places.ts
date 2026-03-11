export interface GooglePlaceSearchResult {
  id: string;
  displayName: string;
  formattedAddress: string;
  rating?: number;
  userRatingCount?: number;
  primaryType?: string;
  primaryTypeDisplayName?: string;
  latitude?: number;
  longitude?: number;
  businessStatus?: string;
}

export interface GooglePlaceDetails {
  placeId: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  priceRange?: string;
  openTime?: string;
  hours?: { day: string; time: string }[];
  category?: string;
  latitude?: number;
  longitude?: number;
  googleMapsUrl?: string;
}

const TYPE_TO_CATEGORY: Record<string, string> = {
  restaurant: "ristorante",
  italian_restaurant: "ristorante",
  seafood_restaurant: "ristorante",
  fine_dining_restaurant: "ristorante",
  pizza_restaurant: "pizzeria",
  farm: "agriturismo",
  farmstay: "agriturismo",
  winery: "cantina",
  pastry_shop: "pasticceria",
  bakery: "pasticceria",
  meal_takeaway: "ristorante",
  food: "ristorante",
};

export function mapGoogleTypeToCategory(
  primaryType?: string
): string | undefined {
  if (!primaryType) return undefined;
  return TYPE_TO_CATEGORY[primaryType];
}

export function mapPriceLevel(priceLevel?: string): string | undefined {
  if (!priceLevel) return undefined;
  const map: Record<string, string> = {
    PRICE_LEVEL_FREE: "Gratis",
    PRICE_LEVEL_INEXPENSIVE: "€",
    PRICE_LEVEL_MODERATE: "€€",
    PRICE_LEVEL_EXPENSIVE: "€€€",
    PRICE_LEVEL_VERY_EXPENSIVE: "€€€€",
  };
  return map[priceLevel];
}

export function mapWeekdayDescriptions(
  descriptions?: string[]
): { day: string; time: string }[] {
  if (!descriptions || descriptions.length === 0) return [];
  return descriptions.map((desc) => {
    // Format: "lunedì: 12:00–15:00, 19:00–23:00" or "lunedì: Chiuso"
    const colonIndex = desc.indexOf(":");
    if (colonIndex === -1) return { day: desc, time: "" };
    const day = desc.slice(0, colonIndex).trim();
    const time = desc.slice(colonIndex + 1).trim();
    // Capitalize first letter
    const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
    return { day: capitalizedDay, time };
  });
}

export function extractOpenTime(
  descriptions?: string[]
): string | undefined {
  if (!descriptions || descriptions.length === 0) return undefined;
  // Find today's hours or a representative weekday
  const now = new Date();
  const dayIndex = now.getDay(); // 0=Sun, 1=Mon...
  // Google weekdayDescriptions starts from Monday (index 0)
  const googleIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  if (descriptions[googleIndex]) {
    const desc = descriptions[googleIndex];
    const colonIndex = desc.indexOf(":");
    if (colonIndex !== -1) {
      const time = desc.slice(colonIndex + 1).trim();
      if (time.toLowerCase() !== "chiuso") return time;
    }
  }
  // Fallback: first non-closed day
  for (const desc of descriptions) {
    const colonIndex = desc.indexOf(":");
    if (colonIndex !== -1) {
      const time = desc.slice(colonIndex + 1).trim();
      if (time.toLowerCase() !== "chiuso") return time;
    }
  }
  return undefined;
}
