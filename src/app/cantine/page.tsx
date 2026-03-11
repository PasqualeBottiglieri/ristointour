import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cantine | Ristointour",
  description:
    "Scopri le migliori cantine della Piana del Sele. Vini autoctoni, degustazioni e visite guidate nei vigneti del Cilento.",
};

export default function CantinePage() {
  return (
    <>
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
            emptyIcon="wine_bar"
            emptyLabel="Nessuna cantina trovata"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
