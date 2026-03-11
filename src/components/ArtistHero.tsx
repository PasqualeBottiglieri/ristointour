import type { Artist } from "@/data/artists";

export default function ArtistHero({ artist }: { artist: Artist }) {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-end">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={artist.image}
        alt={artist.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 pb-12 w-full">
        {artist.badge && (
          <span
            className={`inline-block px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-4 ${artist.badgeStyle || "bg-white/90 backdrop-blur"}`}
          >
            {artist.badge}
          </span>
        )}
        <h1 className="text-4xl md:text-6xl font-black text-white mb-2">
          {artist.name}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-white/80 font-display">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">music_note</span>
            {artist.genre}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">location_on</span>
            {artist.location}, Campania
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">celebration</span>
            {artist.eventTypes.join(", ")}
          </span>
        </div>
      </div>
    </section>
  );
}
