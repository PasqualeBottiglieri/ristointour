import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";
import FaqSection, { buildFaqJsonLd } from "@/components/FaqSection";
import { getPublishedListings } from "@/lib/queries";

const faqs = [
  {
    question: "Quali tipi di ristoranti trovo nella Piana del Sele?",
    answer: "Nella Piana del Sele trovi ristoranti di cucina tradizionale cilentana, pizzerie napoletane, ristoranti di pesce, fine dining stellato, trattorie familiari e locali con specialità di bufala.",
  },
  {
    question: "Come posso prenotare un ristorante su Ristointour?",
    answer: "Ogni scheda ristorante include il numero di telefono e, dove disponibile, un link diretto per la prenotazione online. Puoi contattare il ristorante direttamente dalla pagina.",
  },
  {
    question: "I ristoranti elencati sono verificati?",
    answer: "Sì, tutti i ristoranti presenti su Ristointour sono attività reali e verificate della Piana del Sele e della provincia di Salerno.",
  },
];

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Ristoranti & Pizzerie nella Piana del Sele",
  description:
    "Scopri i migliori ristoranti e pizzerie della Piana del Sele. Cucina tradizionale, fine dining e specialità locali a Battipaglia, Eboli, Paestum.",
  alternates: { canonical: "/ristoranti" },
};

export default async function RistorantiPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  const { location } = await searchParams;
  const listings = await getPublishedListings(["ristorante", "pizzeria"], location);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ristoranti & Pizzerie nella Piana del Sele",
    description: "I migliori ristoranti e pizzerie della Piana del Sele, Campania.",
    numberOfItems: listings.length,
    itemListElement: listings.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Restaurant",
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
          ? { url: `https://www.ristointour.it/ristoranti/${l.slug}` }
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
              Ristoranti & Pizzerie
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              I migliori tavoli della Piana del Sele e della provincia di Salerno.
              Dalla cucina tradizionale cilentana al fine dining stellato.
            </p>
          </div>
          <BusinessListingGrid
            categories={["ristorante", "pizzeria"]}
            location={location}
            emptyIcon="restaurant"
            emptyLabel="Nessun ristorante trovato"
          />
          <FaqSection faqs={faqs} />
        </div>
      </section>
      <Footer />
    </>
  );
}
