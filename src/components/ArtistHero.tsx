import type { Artist } from "@/lib/types";
import { jsonArray, parseGenres } from "@/lib/types";

export default function ArtistHero({ artist }: { artist: Artist }) {
  const eventTypes = jsonArray<string>(artist.eventTypes);

  return (
    <section className="relative h-[55vh] min-h-[420px] md:h-[60vh] md:min-h-[500px] flex items-end">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={artist.image}
        alt={artist.name}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/30 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 pb-14 md:pb-16 w-full">
        {artist.badge && (
          <span
            className={`inline-block px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-5 ${artist.badgeStyle || "bg-white/90 backdrop-blur"}`}
          >
            {artist.badge}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight">
          {artist.name}
        </h1>
        <p className="text-white/70 text-lg md:text-xl font-display mb-5 max-w-2xl">
          {artist.shortDescription}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/60 text-sm font-display">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">music_note</span>
            {parseGenres(artist.genre).join(", ")}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">location_on</span>
            {artist.location}, Campania
          </span>
          {eventTypes.length > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">celebration</span>
              {eventTypes.join(", ")}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
