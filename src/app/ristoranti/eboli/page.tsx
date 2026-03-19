import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getPublishedListings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Ristoranti a Eboli — Dove Mangiare Bene nel 2026",
  description:
    "Scopri i migliori ristoranti e pizzerie a Eboli. Trattorie tipiche, cucina casalinga, agriturismi e sapori autentici della Piana del Sele.",
  alternates: { canonical: "/ristoranti/eboli" },
};

export default async function RistorantiEboli() {
  const listings = await getPublishedListings(
    ["ristorante", "pizzeria"],
    "Eboli"
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ristoranti a Eboli",
    description:
      "I migliori ristoranti e pizzerie a Eboli, Piana del Sele.",
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
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Ristoranti", href: "/ristoranti" },
          { name: "Eboli", href: "/ristoranti/eboli" },
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
              <span className="text-stone-600">Eboli</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Ristoranti a Eboli
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              Dove mangiare bene a Eboli: trattorie della tradizione, pizzerie
              artigianali, cucina casalinga e i sapori autentici della porta del
              Cilento.
            </p>
          </div>
          <BusinessListingGrid
            categories={["ristorante", "pizzeria"]}
            location="Eboli"
            emptyIcon="restaurant"
            emptyLabel="Nessun ristorante trovato a Eboli"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
