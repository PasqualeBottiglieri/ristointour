import type { Artist } from "@/lib/types";
import { jsonArray } from "@/lib/types";

export default function ArtistBio({ artist }: { artist: Artist }) {
  const eventTypes = jsonArray<string>(artist.eventTypes);
  if (!artist.biography && !artist.musicStyle) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
          {artist.biography && (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#f86d16] mb-2 font-display">
                Chi siamo
              </p>
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-stone-900">
                Biografia
              </h2>
              <p className="text-stone-600 leading-[1.85] font-display text-base">
                {artist.biography}
              </p>
            </div>
          )}
          <div>
            {artist.musicStyle && (
              <>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#f86d16] mb-2 font-display">
                  Sound
                </p>
                <h2 className="text-3xl md:text-4xl font-black mb-6 text-stone-900">
                  Stile Musicale
                </h2>
                <p className="text-stone-600 leading-[1.85] font-display text-base">
                  {artist.musicStyle}
                </p>
              </>
            )}
            {eventTypes.length > 0 && (
              <div className={artist.musicStyle ? "mt-10" : ""}>
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#f86d16] mb-4 font-display">
                  Ideale per
                </h3>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map((type) => (
                    <span
                      key={type}
                      className="px-4 py-1.5 bg-stone-100 rounded-full text-sm font-bold font-display text-stone-700"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
