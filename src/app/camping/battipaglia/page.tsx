import type { Metadata } from "next";
import { ogMeta } from "@/lib/metadata";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";
import Breadcrumb from "@/components/Breadcrumb";
import { getPublishedListings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Camping e Villaggi a Battipaglia — Vacanze nella Piana del Sele",
  description:
    "Scopri i migliori camping e villaggi turistici a Battipaglia. Strutture attrezzate vicino al mare e alla Piana del Sele con tutti i comfort.",
  alternates: { canonical: "/camping/battipaglia" },
  ...ogMeta("Camping e Villaggi a Battipaglia — ristointour.it"),
};

export default async function CampingBattipaglia() {
  const listings = await getPublishedListings(["camping"], "Battipaglia");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Camping e Villaggi a Battipaglia",
    description:
      "I migliori camping e villaggi turistici a Battipaglia, Piana del Sele.",
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
          addressLocality: "Battipaglia",
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
          { name: "Battipaglia", href: "/camping/battipaglia" },
        ]}
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Camping e Villaggi a Battipaglia
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              Camping e villaggi turistici nella zona di Battipaglia. Strutture
              attrezzate vicino al litorale e alla Piana del Sele, ideali per
              vacanze in famiglia.
            </p>
          </div>
          <BusinessListingGrid
            categories={["camping"]}
            location="Battipaglia"
            emptyIcon="holiday_village"
            emptyLabel="Nessun camping trovato a Battipaglia"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
