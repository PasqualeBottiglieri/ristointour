import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ristoranti & Pizzerie | Ristointour",
  description:
    "Scopri i migliori ristoranti e pizzerie della Piana del Sele. Cucina tradizionale, fine dining e specialità locali.",
};

export default function RistorantiPage() {
  return (
    <>
      <Header />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Ristoranti & Pizzerie
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              I migliori tavoli della Piana del Sele e della provincia di Salerno.
              Dalla cucina tradizionale cilentana al fine dining stellato.
            </p>
          </div>
          <BusinessListingGrid
            categories={["ristorante", "pizzeria"]}
            emptyIcon="restaurant"
            emptyLabel="Nessun ristorante trovato"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
