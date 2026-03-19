import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getPublishedListings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Ristoranti a Paestum — Dove Mangiare Vicino ai Templi",
  description:
    "Scopri i migliori ristoranti e pizzerie a Paestum. Cucina cilentana, pesce fresco, fine dining e trattorie tipiche vicino ai Templi e al mare.",
  alternates: { canonical: "/ristoranti/paestum" },
};

export default async function RistorantiPaestum() {
  const listings = await getPublishedListings(
    ["ristorante", "pizzeria"],
    "Paestum"
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ristoranti a Paestum",
    description:
      "I migliori ristoranti e pizzerie a Paestum, Piana del Sele.",
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
          addressLocality: "Paestum",
          addressRegion: "Campania",
          addressCountry: "IT",
        },
        ...(l.hasDetailPage
          ? { url: `https://www.ristointour.com/ristoranti/${l.slug}` }
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
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Ristoranti", href: "/ristoranti" },
          { name: "Paestum", href: "/ristoranti/paestum" },
        ]}
      />
      <Header />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <nav className="text-sm text-stone-400 font-display mb-4">
              <Link href="/ristoranti" className="hover:text-primary transition-colors">
                Ristoranti
              </Link>
              <span className="mx-2">/</span>
              <span className="text-stone-600">Paestum</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Ristoranti a Paestum
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              Dove mangiare a Paestum: dalla cucina cilentana tradizionale al
              fine dining stellato, dal pesce fresco alle specialità di bufala.
              I migliori ristoranti vicino ai Templi e al litorale.
            </p>
          </div>
          <BusinessListingGrid
            categories={["ristorante", "pizzeria"]}
            location="Paestum"
            emptyIcon="restaurant"
            emptyLabel="Nessun ristorante trovato a Paestum"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
