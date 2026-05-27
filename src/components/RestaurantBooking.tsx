import Image from "next/image";
import type { Listing } from "@/lib/types";
import { jsonArray } from "@/lib/types";

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

        {(() => {
          const waPhone = restaurant.whatsappNumber;
          if (!waPhone) return null;
          const waNumber = waPhone.replace(/[^0-9+]/g, "").replace(/^\+/, "");
          return (
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Ciao! Vorrei informazioni su ${restaurant.name} trovato su ristointour.it`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1fba59] transition-all flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Scrivici su WhatsApp
            </a>
          );
        })()}
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

        {/* Social Links */}
        {(() => {
          const socials = jsonArray<{ platform: string; url: string }>(restaurant.socialLinks);
          if (socials.length === 0) return null;

          const socialConfig: Record<string, { label: string; color: string; icon: string }> = {
            instagram: {
              label: "Instagram",
              color: "#E4405F",
              icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
            },
            facebook: {
              label: "Facebook",
              color: "#1877F2",
              icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
            },
            tiktok: {
              label: "TikTok",
              color: "#000000",
              icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
            },
            youtube: {
              label: "YouTube",
              color: "#FF0000",
              icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
            },
            spotify: {
              label: "Spotify",
              color: "#1DB954",
              icon: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z",
            },
          };

          return (
            <div className="pt-6 border-t border-stone-100">
              <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">
                Seguici sui Social
              </p>
              <div className="flex flex-wrap gap-2">
                {socials.map((social) => {
                  const config = socialConfig[social.platform];
                  if (!config) return null;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-stone-50 rounded-xl hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
                      title={config.label}
                    >
                      <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform group-hover:scale-110" style={{ fill: config.color }}>
                        <path d={config.icon} />
                      </svg>
                      <span className="text-sm font-semibold text-stone-700">{config.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {(restaurant.mapImage || mapsUrl) && (
          <div className="rounded-xl overflow-hidden h-40 relative group">
            {restaurant.mapImage ? (
              <div className="absolute inset-0 bg-stone-200 flex items-center justify-center grayscale">
                <Image
                  src={restaurant.mapImage}
                  alt={`Mappa ${restaurant.name}`}
                  fill
                  sizes="400px"
                  className="object-cover"
                  unoptimized
                />
                <span className="material-symbols-outlined text-primary text-4xl relative z-10">
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
