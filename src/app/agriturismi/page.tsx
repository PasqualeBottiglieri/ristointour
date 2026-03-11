import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agriturismi | Ristointour",
  description:
    "Scopri i migliori agriturismi della Piana del Sele. Ospitalità rurale, cucina contadina e prodotti a km zero.",
};

export default function AgriturismiPage() {
  return (
    <>
      <Header />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Agriturismi
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              Immersi nella campagna della Piana del Sele, i nostri agriturismi
              offrono ospitalità autentica, cucina contadina e prodotti a km zero.
            </p>
          </div>
          <BusinessListingGrid
            categories={["agriturismo"]}
            emptyIcon="agriculture"
            emptyLabel="Nessun agriturismo trovato"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
