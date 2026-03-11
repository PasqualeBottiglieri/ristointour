import { getFeaturedArtists } from "@/lib/queries";
import ArtistCard from "./ArtistCard";

export default async function FeaturedArtists() {
  const featured = await getFeaturedArtists();

  return (
    <section className="py-20 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black mb-2">
              Artisti per i Tuoi Eventi
            </h2>
            <p className="text-stone-500 font-display">
              Musica dal vivo per rendere unica ogni occasione
            </p>
          </div>
          <a
            className="text-primary font-bold flex items-center gap-2 hover:underline font-display"
            href="/artisti"
          >
            Mostra tutti{" "}
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((artist) => (
            <ArtistCard key={artist.slug} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
}
