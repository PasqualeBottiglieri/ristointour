import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";
import FaqSection, { buildFaqJsonLd } from "@/components/FaqSection";
import { getPublishedListings } from "@/lib/queries";

const faqs = [
  {
    question: "Si possono visitare i caseifici della Piana del Sele?",
    answer: "Sì, molti caseifici offrono visite guidate alla lavorazione della mozzarella, solitamente nelle prime ore del mattino. È consigliato prenotare in anticipo contattando direttamente il caseificio.",
  },
  {
    question: "Qual è la differenza tra mozzarella di bufala DOP e normale?",
    answer: "La Mozzarella di Bufala Campana DOP è prodotta esclusivamente con latte di bufala d'acqua mediterranea, seguendo un disciplinare rigoroso. Ha un sapore più intenso, consistenza più morbida e un colore bianco porcellana.",
  },
  {
    question: "Posso acquistare mozzarella direttamente dai caseifici?",
    answer: "Sì, quasi tutti i caseifici hanno un punto vendita diretto dove puoi acquistare mozzarella freschissima, burrata, ricotta, trecce e altri prodotti caseari, spesso a prezzi più convenienti rispetto ai negozi.",
  },
];

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Caseifici nella Piana del Sele — Mozzarella di Bufala DOP",
  description:
    "I migliori caseifici artigianali della Piana del Sele. Mozzarella di Bufala Campana DOP, ricotta e formaggi tipici a Battipaglia e Paestum.",
  alternates: { canonical: "/caseifici" },
};

export default async function CaseificiPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  const { location } = await searchParams;
  const listings = await getPublishedListings(["caseificio"], location);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Caseifici nella Piana del Sele",
    description: "I migliori caseifici artigianali della Piana del Sele, Campania.",
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
              Caseifici
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              La terra della Mozzarella di Bufala Campana DOP. Scopri i caseifici
              artigianali dove nascono i formaggi più pregiati della Campania.
            </p>
          </div>
          <BusinessListingGrid
            categories={["caseificio"]}
            location={location}
            emptyIcon="flatware"
            emptyLabel="Nessun caseificio trovato"
          />
          <FaqSection faqs={faqs} />
        </div>
      </section>
      <Footer />
    </>
  );
}
