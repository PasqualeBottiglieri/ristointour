import type { Metadata } from "next";
import { ogMeta } from "@/lib/metadata";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";
import FaqSection, { buildFaqJsonLd } from "@/components/FaqSection";
import { getPublishedListings } from "@/lib/queries";

const faqs = [
  {
    question: "Qual e il periodo migliore per campeggiare nella Piana del Sele?",
    answer: "La stagione ideale va da aprile a ottobre, con il picco tra giugno e settembre. Molti camping e villaggi turistici della zona offrono accesso diretto al mare e sono perfetti per le vacanze estive.",
  },
  {
    question: "I camping della zona accettano animali domestici?",
    answer: "Molti camping e villaggi della Piana del Sele sono pet-friendly. Consigliamo di verificare le politiche specifiche di ogni struttura al momento della prenotazione.",
  },
  {
    question: "Che servizi offrono i camping vicino a Paestum?",
    answer: "I camping e villaggi vicino a Paestum offrono generalmente piscina, animazione, ristorante, market, Wi-Fi e accesso al mare. Alcune strutture dispongono anche di bungalow e case mobili per chi preferisce un soggiorno piu confortevole.",
  },
];

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Camping e Villaggi nella Piana del Sele",
  description:
    "Scopri i migliori camping e villaggi turistici nella Piana del Sele. Piazzole, bungalow, accesso al mare e tutti i servizi a Paestum, Eboli e Battipaglia.",
  alternates: { canonical: "/camping" },
  ...ogMeta("Camping e Villaggi nella Piana del Sele — ristointour.it"),
};

export default async function CampingPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  const { location } = await searchParams;
  const listings = await getPublishedListings(["camping"], location);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Camping e Villaggi nella Piana del Sele",
    description: "I migliori camping e villaggi turistici della Piana del Sele, Campania.",
    numberOfItems: listings.length,
    itemListElement: listings.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LodgingBusiness",
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
          ? { url: `https://www.ristointour.it/camping/${l.slug}` }
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
              Camping e Villaggi
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              I migliori camping e villaggi turistici della Piana del Sele.
              Piazzole, bungalow, piscine e accesso al mare tra Paestum, Eboli e
              il Cilento.
            </p>
          </div>
          <BusinessListingGrid
            categories={["camping"]}
            location={location}
            emptyIcon="holiday_village"
            emptyLabel="Nessun camping trovato"
          />
          <FaqSection faqs={faqs} />
        </div>
      </section>
      <Footer />
    </>
  );
}
