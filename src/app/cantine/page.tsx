import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";
import FaqSection, { buildFaqJsonLd } from "@/components/FaqSection";
import { getPublishedListings } from "@/lib/queries";

const faqs = [
  {
    question: "Si possono fare degustazioni di vino nelle cantine della Piana del Sele?",
    answer: "Sì, molte cantine offrono degustazioni guidate con abbinamenti gastronomici. Si consiglia di prenotare in anticipo, soprattutto nei weekend e nei periodi di vendemmia.",
  },
  {
    question: "Quali vitigni si coltivano nella Piana del Sele?",
    answer: "Nella zona si coltivano vitigni autoctoni come Aglianico, Fiano, Greco e Primitivo, oltre a varietà internazionali. I vini del Cilento e della Piana del Sele hanno ottenuto riconoscimenti DOC e IGT.",
  },
  {
    question: "Le cantine vendono vino direttamente al pubblico?",
    answer: "Sì, quasi tutte le cantine hanno un punto vendita diretto dove acquistare vini sfusi e in bottiglia, spesso a prezzi di cantina. Alcune offrono anche spedizioni.",
  },
];

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cantine e Vini della Piana del Sele",
  description:
    "Scopri le migliori cantine della Piana del Sele. Vini autoctoni, degustazioni e visite guidate nei vigneti del Cilento e Campania.",
  alternates: { canonical: "/cantine" },
};

export default async function CantinePage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  const { location } = await searchParams;
  const listings = await getPublishedListings(["cantina"], location);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cantine e Vini della Piana del Sele",
    description: "Le migliori cantine della Piana del Sele, Campania.",
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
              Cantine
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              Un viaggio tra i vitigni autoctoni del Cilento e della Piana del
              Sele. Degustazioni, visite in vigna e i migliori vini del
              territorio.
            </p>
          </div>
          <BusinessListingGrid
            categories={["cantina"]}
            location={location}
            emptyIcon="wine_bar"
            emptyLabel="Nessuna cantina trovata"
          />
          <FaqSection faqs={faqs} />
        </div>
      </section>
      <Footer />
    </>
  );
}
