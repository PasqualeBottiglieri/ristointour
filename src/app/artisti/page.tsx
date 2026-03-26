import type { Metadata } from "next";
import { ogMeta } from "@/lib/metadata";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtistGrid from "@/components/ArtistGrid";
import FaqSection, { buildFaqJsonLd } from "@/components/FaqSection";
import { getPublishedArtists, extractArtistFilterOptions } from "@/lib/queries";

const faqs = [
  {
    question: "Che tipo di artisti posso trovare per il mio evento?",
    answer: "Su Ristointour trovi cantanti, band, DJ, musicisti classici e performer per ogni tipo di evento: matrimoni, cene private, feste aziendali, aperitivi, sagre e festival.",
  },
  {
    question: "Come posso contattare un artista?",
    answer: "Ogni scheda artista include i contatti diretti: numero di telefono e link ai profili social. Puoi contattarli direttamente per un preventivo personalizzato.",
  },
  {
    question: "Gli artisti sono disponibili anche fuori dalla Piana del Sele?",
    answer: "Sì, la maggior parte degli artisti si sposta in tutta la provincia di Salerno e in Campania. Contattali direttamente per verificare disponibilità e costi di trasferta.",
  },
];

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Artisti & Musica per Eventi nella Piana del Sele",
  description:
    "Scopri i migliori artisti e musicisti per il tuo evento nella Piana del Sele. Jazz, musica napoletana, DJ set per matrimoni e feste.",
  alternates: { canonical: "/artisti" },
  ...ogMeta("Artisti & Musica — ristointour.it"),
};

export default async function ArtistiPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  const { location } = await searchParams;
  const artists = await getPublishedArtists();
  const { genres, locations, eventTypes } = extractArtistFilterOptions(artists);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Artisti & Musica per Eventi nella Piana del Sele",
    description: "I migliori artisti e musicisti per eventi nella Piana del Sele, Campania.",
    numberOfItems: artists.length,
    itemListElement: artists.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: a.name,
        description: a.shortDescription,
        image: a.image,
        ...(a.hasDetailPage
          ? { url: `https://www.ristointour.it/artisti/${a.slug}` }
          : {}),
      },
    })),
  };

  const faqJsonLd = buildFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
          <ArtistGrid
            artists={artists}
            genres={genres}
            locations={locations}
            eventTypes={eventTypes}
            initialLocation={location}
          />
          <FaqSection faqs={faqs} />
        </div>
      </section>
      <Footer />
    </>
  );
}
