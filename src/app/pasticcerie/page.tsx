import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessListingGrid from "@/components/BusinessListingGrid";

export const metadata: Metadata = {
  title: "Pasticcerie | Ristointour",
  description:
    "Le migliori pasticcerie artigianali della Piana del Sele. Sfogliatelle, delizie al limone e dolci della tradizione campana.",
};

export default function PasticceriePage() {
  return (
    <>
      <Header />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Pasticcerie
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              L&apos;arte dolciaria campana nella Piana del Sele. Sfogliatelle,
              pastiere, delizie al limone e creazioni artigianali.
            </p>
          </div>
          <BusinessListingGrid
            categories={["pasticceria"]}
            emptyIcon="bakery_dining"
            emptyLabel="Nessuna pasticceria trovata"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
