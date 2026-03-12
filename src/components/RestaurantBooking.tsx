import type { Listing } from "@/lib/types";

function displayUrl(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function RestaurantBooking({
  restaurant,
}: {
  restaurant: Listing;
}) {
  const mapsUrl =
    restaurant.googleMapsUrl ||
    (restaurant.latitude && restaurant.longitude
      ? `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`
      : restaurant.address
        ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurant.address)}`
        : null);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 sticky top-24">
      <h3 className="font-serif text-2xl mb-6">Contatta Ora</h3>

      <div className="space-y-4">
        {restaurant.phone && (
          <a
            href={`tel:${restaurant.phone}`}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">call</span>
            Chiama Ora
          </a>
        )}

        {restaurant.email && (
          <a
            href={`mailto:${restaurant.email}`}
            className="w-full bg-emerald-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-950 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">mail</span>
            Scrivi Email
          </a>
        )}

        {restaurant.website && (
          <a
            href={restaurant.website}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-stone-200 text-stone-700 py-4 rounded-xl font-bold text-lg hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">language</span>
            Visita il Sito
          </a>
        )}
      </div>

      <div className="mt-10 pt-8 border-t border-stone-100 space-y-6">
        {restaurant.phone && (
          <div className="flex items-center gap-3 text-stone-600">
            <span className="material-symbols-outlined text-primary">
              call
            </span>
            <span className="text-sm font-medium">{restaurant.phone}</span>
          </div>
        )}
        {restaurant.email && (
          <div className="flex items-center gap-3 text-stone-600 min-w-0">
            <span className="material-symbols-outlined text-primary shrink-0">
              mail
            </span>
            <span className="text-sm font-medium truncate">
              {restaurant.email}
            </span>
          </div>
        )}
        {restaurant.website && (
          <div className="flex items-center gap-3 text-stone-600 min-w-0">
            <span className="material-symbols-outlined text-primary shrink-0">
              language
            </span>
            <a
              href={restaurant.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline truncate"
            >
              {displayUrl(restaurant.website)}
            </a>
          </div>
        )}

        {(restaurant.mapImage || mapsUrl) && (
          <div className="rounded-xl overflow-hidden h-40 relative group">
            {restaurant.mapImage ? (
              <div
                className="absolute inset-0 bg-stone-200 flex items-center justify-center grayscale bg-cover bg-center"
                style={{
                  backgroundImage: `url('${restaurant.mapImage}')`,
                }}
              >
                <span className="material-symbols-outlined text-primary text-4xl">
                  location_on
                </span>
              </div>
            ) : (
              <div className="absolute inset-0 bg-stone-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-stone-300 text-5xl">
                  map
                </span>
              </div>
            )}
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 bg-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md flex items-center gap-1 hover:bg-stone-50"
              >
                <span className="material-symbols-outlined text-sm">
                  directions
                </span>{" "}
                Indicazioni
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
