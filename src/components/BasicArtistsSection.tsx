import { getBasicHomepageArtists } from "@/lib/queries";
import ArtistCardBasic from "./ArtistCardBasic";

export default async function BasicArtistsSection() {
  const basicArtists = await getBasicHomepageArtists();

  if (basicArtists.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-black mb-1">
            Altri Artisti
          </h2>
          <p className="text-stone-500 font-display text-sm">
            Contattali direttamente per il tuo evento
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {basicArtists.map((artist) => (
          <ArtistCardBasic key={artist.slug} artist={artist} />
        ))}
      </div>
    </section>
  );
}
