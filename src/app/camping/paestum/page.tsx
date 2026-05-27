import type { Metadata } from "next";
import { ogMeta } from "@/lib/metadata";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";
import Breadcrumb from "@/components/Breadcrumb";
import { getPublishedListings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Camping e Villaggi a Paestum — Vacanze al Mare nel 2026",
  description:
    "Scopri i migliori camping e villaggi turistici a Paestum. Piazzole, bungalow, accesso al mare e piscina vicino ai Templi e alla spiaggia.",
  alternates: { canonical: "/camping/paestum" },
  ...ogMeta("Camping e Villaggi a Paestum — ristointour.it"),
};

export default async function CampingPaestum() {
  const listings = await getPublishedListings(["camping"], "Paestum");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Camping e Villaggi a Paestum",
    description:
      "I migliori camping e villaggi turistici a Paestum, Piana del Sele.",
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
          addressLocality: "Paestum",
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
          { name: "Paestum", href: "/camping/paestum" },
        ]}
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Camping e Villaggi a Paestum
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              Vacanze all&apos;aria aperta a due passi dai Templi e dal mare.
              Camping con piazzole, bungalow, piscine e accesso diretto alla
              spiaggia nella zona archeologica di Paestum.
            </p>
          </div>
          <BusinessListingGrid
            categories={["camping"]}
            location="Paestum"
            emptyIcon="holiday_village"
            emptyLabel="Nessun camping trovato a Paestum"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
