import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { experiences } from "@/data/content";

export const metadata: Metadata = {
  title: "Esperienze Gastronomiche | Ristointour",
  description:
    "Vivi esperienze enogastronomiche uniche nella Piana del Sele. Tour dei caseifici, degustazioni, pranzi in agriturismo e corsi di cucina.",
};

export default function EsperienzePage() {
  return (
    <>
      <Header />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Esperienze Gastronomiche
            </h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              Vivi il territorio attraverso esperienze autentiche: tour dei
              caseifici, degustazioni di vini, pranzi in agriturismo e corsi di
              cucina della tradizione mediterranea.
            </p>
          </div>

          {/* Main Experiences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px] mb-20">
            {experiences.map((exp) => (
              <div
                key={exp.title}
                className={`${exp.colSpan} relative group overflow-hidden rounded-2xl`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={exp.image}
                  alt={exp.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent flex flex-col justify-end p-8">
                  {exp.subtitle && (
                    <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 font-display">
                      {exp.subtitle}
                    </span>
                  )}
                  <h3 className={`${exp.titleSize} font-bold text-white mb-2`}>
                    {exp.title}
                  </h3>
                  <p className="text-stone-300 max-w-md font-display">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-emerald-900 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">
              Vuoi organizzare un&apos;esperienza?
            </h2>
            <p className="text-stone-300 font-display max-w-xl mx-auto mb-8">
              Contattaci per creare esperienze personalizzate per il tuo gruppo,
              la tua azienda o il tuo evento speciale nella Piana del Sele.
            </p>
            <a
              href="/contatti"
              className="inline-block px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-orange-600 transition-colors font-display"
            >
              Contattaci
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
