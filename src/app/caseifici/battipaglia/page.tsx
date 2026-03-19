import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getPublishedListings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Caseifici a Battipaglia — Mozzarella di Bufala DOP",
  description:
    "I migliori caseifici a Battipaglia: mozzarella di bufala campana DOP fresca, ricotta, burrata e formaggi artigianali. Visite guidate e degustazioni.",
  alternates: { canonical: "/caseifici/battipaglia" },
};

export default async function CaseificiBattipaglia() {
  const listings = await getPublishedListings(["caseificio"], "Battipaglia");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Caseifici a Battipaglia",
    description:
      "I migliori caseifici artigianali a Battipaglia, capitale della mozzarella di bufala.",
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
          { name: "Caseifici", href: "/caseifici" },
          { name: "Battipaglia", href: "/caseifici/battipaglia" },
        ]}
      />
      <Header />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <nav className="text-sm text-stone-400 font-display mb-4">
              <Link href="/caseifici" className="hover:text-primary transition-colors">
                Caseifici
              </Link>
              <span className="mx-2">/</span>
              <span className="text-stone-600">Battipaglia</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Caseifici a Battipaglia
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              Battipaglia, la capitale mondiale della mozzarella di bufala. Scopri
              i caseifici artigianali dove nasce la Mozzarella di Bufala Campana
              DOP: degustazioni, visite guidate e vendita diretta.
            </p>
          </div>
          <BusinessListingGrid
            categories={["caseificio"]}
            location="Battipaglia"
            emptyIcon="flatware"
            emptyLabel="Nessun caseificio trovato a Battipaglia"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
