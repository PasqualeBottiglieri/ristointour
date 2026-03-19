import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";
import FaqSection, { buildFaqJsonLd } from "@/components/FaqSection";
import { getPublishedListings } from "@/lib/queries";

const faqs = [
  {
    question: "Cosa si mangia in un agriturismo della Piana del Sele?",
    answer: "Negli agriturismi della Piana del Sele si gusta cucina contadina con prodotti dell'orto, formaggi di bufala, salumi locali, pasta fatta a mano e piatti della tradizione cilentana, spesso a km zero.",
  },
  {
    question: "Gli agriturismi sono adatti alle famiglie con bambini?",
    answer: "Sì, la maggior parte degli agriturismi offre spazi all'aperto, fattorie didattiche e attività per bambini come la raccolta di frutta e la visita agli animali.",
  },
  {
    question: "Serve prenotare per mangiare in agriturismo?",
    answer: "È sempre consigliato prenotare, soprattutto nei weekend e durante i periodi festivi. La maggior parte degli agriturismi lavora su prenotazione per garantire prodotti freschi.",
  },
];

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Agriturismi nella Piana del Sele",
  description:
    "Scopri i migliori agriturismi della Piana del Sele. Ospitalità rurale, cucina contadina e prodotti a km zero a Eboli, Capaccio e Battipaglia.",
  alternates: { canonical: "/agriturismi" },
};

export default async function AgriturismiPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  const { location } = await searchParams;
  const listings = await getPublishedListings(["agriturismo"], location);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Agriturismi nella Piana del Sele",
    description: "I migliori agriturismi della Piana del Sele, Campania.",
    numberOfItems: listings.length,
    itemListElement: listings.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LocalBusiness",
        name: l.name,
        description: l.description,
        image: l.image,
        address: {
          "@type": "PostalAddress",
          addressLocality: l.location,
          addressRegion: "Campania",
          addressCountry: "IT",
        },
        ...(l.hasDetailPage
          ? { url: `https://www.ristointour.com/ristoranti/${l.slug}` }
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
              Agriturismi
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              Immersi nella campagna della Piana del Sele, i nostri agriturismi
              offrono ospitalità autentica, cucina contadina e prodotti a km zero.
            </p>
          </div>
          <BusinessListingGrid
            categories={["agriturismo"]}
            location={location}
            emptyIcon="agriculture"
            emptyLabel="Nessun agriturismo trovato"
          />
          <FaqSection faqs={faqs} />
        </div>
      </section>
      <Footer />
    </>
  );
}
