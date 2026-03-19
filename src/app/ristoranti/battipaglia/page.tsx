import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getPublishedListings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Ristoranti a Battipaglia — Dove Mangiare Bene nel 2026",
  description:
    "Scopri i migliori ristoranti e pizzerie a Battipaglia. Cucina tradizionale, pesce, pizza napoletana e specialità bufaline nella Piana del Sele.",
  alternates: { canonical: "/ristoranti/battipaglia" },
};

export default async function RistorantiBattipaglia() {
  const listings = await getPublishedListings(
    ["ristorante", "pizzeria"],
    "Battipaglia"
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ristoranti a Battipaglia",
    description:
      "I migliori ristoranti e pizzerie a Battipaglia, Piana del Sele.",
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
          addressLocality: "Battipaglia",
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
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Ristoranti", href: "/ristoranti" },
          { name: "Battipaglia", href: "/ristoranti/battipaglia" },
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
              <span className="text-stone-600">Battipaglia</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Ristoranti a Battipaglia
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              Dove mangiare bene a Battipaglia: dai ristoranti di pesce alle
              pizzerie napoletane, dalle trattorie tipiche alle specialità di
              bufala. Scopri i migliori tavoli della capitale della mozzarella.
            </p>
          </div>
          <BusinessListingGrid
            categories={["ristorante", "pizzeria"]}
            location="Battipaglia"
            emptyIcon="restaurant"
            emptyLabel="Nessun ristorante trovato a Battipaglia"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
