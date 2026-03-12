import type { Artist } from "@/lib/types";
import { jsonArray, parseGenres } from "@/lib/types";

export default function ArtistCardBasic({ artist }: { artist: Artist }) {
  const eventTypes = jsonArray<string>(artist.eventTypes);

  return (
    <div className="flex items-center gap-4 bg-white rounded-lg p-4 border border-stone-200 hover:border-stone-300 hover:shadow-sm transition-all duration-300">
      {/* Thumbnail */}
      <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm truncate">{artist.name}</h4>
        <p className="text-stone-500 text-xs font-display truncate">
          {parseGenres(artist.genre).join(", ")} &middot; {eventTypes[0]}
        </p>
        <div className="flex items-center gap-1 text-stone-400 mt-1">
          <span className="material-symbols-outlined text-xs">location_on</span>
          <span className="text-[11px] font-display">{artist.location}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="shrink-0 flex items-center gap-1">
        {artist.phone && (
          <a
            href={`tel:${artist.phone}`}
            className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
            title="Chiama"
          >
            <span className="material-symbols-outlined text-lg">call</span>
          </a>
        )}
        {artist.website && (
          <a
            href={artist.website}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 transition-colors"
            title="Sito web"
          >
            <span className="material-symbols-outlined text-lg">language</span>
          </a>
        )}
      </div>
    </div>
  );
}
