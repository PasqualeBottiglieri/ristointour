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

        <a
          href={`https://wa.me/393385940445?text=${encodeURIComponent(`Ciao! Vorrei informazioni su ${restaurant.name} trovato su ristointour.it`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1fba59] transition-all flex items-center justify-center gap-2"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Scrivici su WhatsApp
        </a>
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
