import type { Metadata } from "next";
import { ogMeta } from "@/lib/metadata";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";
import Breadcrumb from "@/components/Breadcrumb";
import { getPublishedListings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Agriturismi a Eboli — Ospitalità Rurale e Cucina Genuina",
  description:
    "Scopri i migliori agriturismi a Eboli. Cucina contadina, prodotti biologici a km zero, fattorie didattiche e relax nella campagna della Piana del Sele.",
  alternates: { canonical: "/agriturismi/eboli" },
  ...ogMeta("Agriturismi a Eboli — ristointour.it"),
};

export default async function AgriturismiEboli() {
  const listings = await getPublishedListings(["agriturismo"], "Eboli");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Agriturismi a Eboli",
    description:
      "I migliori agriturismi a Eboli, porta del Cilento.",
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
          addressLocality: "Eboli",
          addressRegion: "Campania",
          addressCountry: "IT",
        },
        ...(l.hasDetailPage
          ? { url: `https://www.ristointour.it/ristoranti/${l.slug}` }
          : {}),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Agriturismi", href: "/agriturismi" },
          { name: "Eboli", href: "/agriturismi/eboli" },
        ]}
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Agriturismi a Eboli
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              Eboli, porta d&apos;ingresso del Cilento. Scopri gli agriturismi
              immersi nella campagna: cucina contadina con prodotti dell&apos;orto,
              fattorie didattiche, degustazioni e ospitalità rurale autentica.
            </p>
          </div>
          <BusinessListingGrid
            categories={["agriturismo"]}
            location="Eboli"
            emptyIcon="agriculture"
            emptyLabel="Nessun agriturismo trovato a Eboli"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
