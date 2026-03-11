import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Caseifici | Ristointour",
  description:
    "I migliori caseifici artigianali della Piana del Sele. Mozzarella di Bufala Campana DOP, ricotta e formaggi tipici.",
};

export default function CaseificiPage() {
  return (
    <>
      <Header />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Caseifici
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              La terra della Mozzarella di Bufala Campana DOP. Scopri i caseifici
              artigianali dove nascono i formaggi più pregiati della Campania.
            </p>
          </div>
          <BusinessListingGrid
            categories={["caseificio"]}
            emptyIcon="flatware"
            emptyLabel="Nessun caseificio trovato"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
