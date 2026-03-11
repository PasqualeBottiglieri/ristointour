import type { Artist } from "@/data/artists";

export default function ArtistBio({ artist }: { artist: Artist }) {
  if (!artist.biography && !artist.musicStyle) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {artist.biography && (
          <div>
            <h2 className="text-3xl font-black mb-6">Biografia</h2>
            <p className="text-stone-600 leading-relaxed font-display">
              {artist.biography}
            </p>
          </div>
          )}
          <div>
            {artist.musicStyle && (
            <>
            <h2 className="text-3xl font-black mb-6">Stile Musicale</h2>
            <p className="text-stone-600 leading-relaxed font-display">
              {artist.musicStyle}
            </p>
            </>
            )}
            <div className="mt-8">
              <h3 className="text-xs uppercase tracking-widest font-bold text-orange-600 mb-4 font-display">
                Ideale per
              </h3>
              <div className="flex flex-wrap gap-2">
                {artist.eventTypes.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 bg-stone-100 rounded-full text-sm font-bold font-display"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
