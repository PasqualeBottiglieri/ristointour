import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtistGrid from "@/components/ArtistGrid";
import { getPublishedArtists } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Artisti & Musica per Eventi | Ristointour",
  description:
    "Scopri i migliori artisti e musicisti per il tuo evento nella Piana del Sele. Jazz, musica napoletana, DJ set e molto altro.",
};

export default async function ArtistiPage() {
  const artists = await getPublishedArtists();

  return (
    <>
      <Header />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Artisti & Musica per Eventi
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              Trova l&apos;artista perfetto per il tuo evento nella Piana del Sele.
              Dai matrimoni alle feste aziendali, dalla musica classica al DJ set.
            </p>
          </div>
          <ArtistGrid artists={artists} />
        </div>
      </section>
      <Footer />
    </>
  );
}
