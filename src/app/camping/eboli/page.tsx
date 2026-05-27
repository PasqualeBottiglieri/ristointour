import type { Metadata } from "next";
import { ogMeta } from "@/lib/metadata";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";
import Breadcrumb from "@/components/Breadcrumb";
import { getPublishedListings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Camping e Villaggi a Eboli — Vacanze nella Piana del Sele",
  description:
    "Scopri i migliori camping e villaggi turistici a Eboli. Strutture immerse nel verde della Piana del Sele con tutti i servizi per una vacanza rilassante.",
  alternates: { canonical: "/camping/eboli" },
  ...ogMeta("Camping e Villaggi a Eboli — ristointour.it"),
};

export default async function CampingEboli() {
  const listings = await getPublishedListings(["camping"], "Eboli");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Camping e Villaggi a Eboli",
    description:
      "I migliori camping e villaggi turistici a Eboli, Piana del Sele.",
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
          addressLocality: "Eboli",
          addressRegion: "Campania",
          addressCountry: "IT",
        },
        ...(l.hasDetailPage
          ? { url: `https://www.ristointour.it/camping/${l.slug}` }
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
          { name: "Camping e Villaggi", href: "/camping" },
          { name: "Eboli", href: "/camping/eboli" },
        ]}
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Camping e Villaggi a Eboli
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              Strutture immerse nel verde della Piana del Sele. Camping e
              villaggi turistici con piazzole, bungalow e servizi per tutta la
              famiglia nella zona di Eboli.
            </p>
          </div>
          <BusinessListingGrid
            categories={["camping"]}
            location="Eboli"
            emptyIcon="holiday_village"
            emptyLabel="Nessun camping trovato a Eboli"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
