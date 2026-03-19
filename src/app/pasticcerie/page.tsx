import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";
import FaqSection, { buildFaqJsonLd } from "@/components/FaqSection";
import { getPublishedListings } from "@/lib/queries";

const faqs = [
  {
    question: "Quali dolci tipici campani posso trovare nelle pasticcerie?",
    answer: "Le pasticcerie della Piana del Sele offrono sfogliatelle ricce e frolle, pastiere napoletane, delizie al limone, babà al rum, zeppole di San Giuseppe e dolci con ricotta di bufala.",
  },
  {
    question: "Le pasticcerie accettano ordini per eventi e cerimonie?",
    answer: "Sì, la maggior parte delle pasticcerie artigianali realizza torte personalizzate, confetti, bomboniere e vassoi di dolci su ordinazione per matrimoni, battesimi e altri eventi.",
  },
  {
    question: "Ci sono pasticcerie aperte la domenica?",
    answer: "Sì, le pasticcerie artigianali sono generalmente aperte la domenica mattina, che è il giorno di maggior afflusso. È consigliato arrivare presto per la migliore scelta di prodotti freschi.",
  },
];

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Pasticcerie Artigianali nella Piana del Sele",
  description:
    "Le migliori pasticcerie artigianali della Piana del Sele. Sfogliatelle, delizie al limone e dolci della tradizione campana a Salerno e Battipaglia.",
  alternates: { canonical: "/pasticcerie" },
};

export default async function PasticceriePage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  const { location } = await searchParams;
  const listings = await getPublishedListings(["pasticceria"], location);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pasticcerie Artigianali nella Piana del Sele",
    description: "Le migliori pasticcerie artigianali della Piana del Sele, Campania.",
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
              Pasticcerie
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              L&apos;arte dolciaria campana nella Piana del Sele. Sfogliatelle,
              pastiere, delizie al limone e creazioni artigianali.
            </p>
          </div>
          <BusinessListingGrid
            categories={["pasticceria"]}
            location={location}
            emptyIcon="bakery_dining"
            emptyLabel="Nessuna pasticceria trovata"
          />
          <FaqSection faqs={faqs} />
        </div>
      </section>
      <Footer />
    </>
  );
}
