import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { territories } from "@/data/content";

const territoryDescriptions: Record<string, string> = {
  "Piana del Sele":
    "Il cuore agricolo della provincia di Salerno, terra di bufale, mozzarella DOP e tradizioni contadine millenarie.",
  "Paestum":
    "Patrimonio UNESCO con i templi greci meglio conservati al mondo, circondato da eccellenze gastronomiche e spiagge.",
  "Eboli":
    "Porta d'ingresso del Cilento, ricca di storia, frantoi, cantine e una vivace scena enogastronomica locale.",
  "Battipaglia":
    "Capitale mondiale della mozzarella di bufala, con caseifici storici e una tradizione casearia senza pari.",
};

export const metadata: Metadata = {
  title: "I Nostri Territori | Ristointour",
  description:
    "Esplora i territori della Piana del Sele, Paestum, Eboli e Battipaglia. Gastronomia, cultura e natura nel cuore della Campania.",
};

export default function TerritoriPage() {
  return (
    <>
      <Header />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              I Nostri Territori
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              Dal mare di Paestum alle colline del Cilento, ogni territorio ha una
              storia da raccontare e sapori unici da scoprire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {territories.map((t) => (
              <div
                key={t.name}
                className="group relative rounded-2xl overflow-hidden"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    src={t.image}
                    alt={t.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent" />
                </div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h2 className="text-3xl font-black text-white mb-3">
                    {t.name}
                  </h2>
                  <p className="text-stone-300 font-display text-sm leading-relaxed max-w-md">
                    {territoryDescriptions[t.name] ?? ""}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Province note */}
          <div className="mt-16 border-t border-stone-200 pt-12 text-center">
            <span className="material-symbols-outlined text-4xl text-primary mb-4 block">
              explore
            </span>
            <h3 className="text-2xl font-black mb-3">
              Prossimamente: tutta la Campania
            </h3>
            <p className="text-stone-500 font-display max-w-lg mx-auto">
              Stiamo espandendo Ristointour all&apos;intera provincia di Salerno
              e oltre. Nuovi territori, nuove eccellenze, stessa passione.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
