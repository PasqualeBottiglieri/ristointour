import Link from "next/link";
import type { Artist } from "@/lib/types";
import { jsonArray, parseGenres } from "@/lib/types";

export default function ArtistCard({ artist }: { artist: Artist }) {
  const eventTypes = jsonArray<string>(artist.eventTypes);

  return (
    <Link
      href={`/artisti/${artist.slug}`}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
    >
      <div className="h-64 overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={artist.image}
          alt={artist.name}
        />
        {artist.badge && (
          <div
            className={`absolute top-4 right-4 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${artist.badgeStyle || "bg-white/90 backdrop-blur"}`}
          >
            {artist.badge}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1 text-stone-400 mb-2">
          <span className="material-symbols-outlined text-sm">location_on</span>
          <span className="text-xs uppercase font-bold tracking-tighter font-display">
            {artist.location}, Campania
          </span>
        </div>
        <h3 className="text-xl font-bold mb-1">{artist.name}</h3>
        <p className="text-stone-500 text-sm mb-6 italic font-display">
          {parseGenres(artist.genre).join(", ")} &middot; {eventTypes[0]}
        </p>
        <span className="block w-full py-3 bg-emerald-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-emerald-950 transition-colors font-display text-center">
          Scopri artista
        </span>
      </div>
    </Link>
  );
}
