import { artists } from "@/data/artists";
import ArtistCard from "./ArtistCard";

interface EventiMusicaProps {
  location: string;
  maxArtists?: number;
}

export default function EventiMusica({ location, maxArtists = 3 }: EventiMusicaProps) {
  const localArtists = artists
    .filter((a) => a.location === location)
    .slice(0, maxArtists);

  if (localArtists.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black mb-2">Musica per Eventi</h2>
            <p className="text-stone-500 font-display">
              Artisti disponibili a {location}
            </p>
          </div>
          <a
            className="text-primary font-bold flex items-center gap-2 hover:underline font-display"
            href="/artisti"
          >
            Vedi tutti gli artisti{" "}
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {localArtists.map((artist) => (
            <ArtistCard key={artist.slug} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
}
