import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FaqSection, { buildFaqJsonLd } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Eboli — Porta del Cilento e dei Suoi Sapori",
  description:
    "Guida gastronomica a Eboli: agriturismi, trattorie, cantine e le tradizioni culinarie della porta del Cilento nella Piana del Sele.",
  alternates: { canonical: "/territori/eboli" },
};

const faqs = [
  {
    question: "Per cosa è conosciuta Eboli dal punto di vista gastronomico?",
    answer: "Eboli è famosa per i suoi agriturismi con cucina contadina, le trattorie familiari, i frantoi con olio extravergine, le cantine con vini locali e i prodotti tipici del territorio tra la Piana del Sele e il Cilento.",
  },
  {
    question: "Ci sono agriturismi a Eboli con fattorie didattiche?",
    answer: "Sì, diversi agriturismi nella zona di Eboli offrono fattorie didattiche per bambini con attività come la raccolta dei prodotti dell'orto, la visita agli animali e laboratori di cucina tradizionale.",
  },
  {
    question: "Come arrivare a Eboli?",
    answer: "Eboli è raggiungibile dall'autostrada A2 (uscita Eboli) e dalla stazione ferroviaria sulla linea Salerno-Potenza. Da Salerno dista circa 25 km, da Battipaglia 10 km.",
  },
  {
    question: "Cosa visitare a Eboli oltre ai ristoranti?",
    answer: "Eboli offre il centro storico medievale con il Castello Colonna, le chiese antiche, i frantoi storici, le campagne circostanti con percorsi naturalistici e la vicinanza all'Oasi WWF di Persano.",
  },
];

export default function EboliTerritoryPage() {
  const faqJsonLd = buildFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Territori", href: "/territori" },
          { name: "Eboli", href: "/territori/eboli" },
        ]}
      />

      <article className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Eboli — Porta del Cilento e dei Suoi Sapori
            </h1>
            <p className="text-stone-500 font-display text-lg leading-relaxed">
              Eboli segna il confine tra la Piana del Sele e il Cilento. È una
              città di tradizioni contadine profonde, dove agriturismi, frantoi,
              cantine e trattorie familiari custodiscono i sapori autentici
              della Campania rurale.
            </p>
          </header>

          {/* La Città */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              La Città e il Territorio
            </h2>
            <div className="prose prose-stone max-w-none font-display">
              <p>
                Resa celebre dal libro &quot;Cristo si è fermato a Eboli&quot;
                di Carlo Levi, Eboli è una città dalla forte identità
                territoriale. Il centro storico medievale, dominato dal Castello
                Colonna, si affaccia sulla piana sottostante, con una vista che
                spazia dai Monti Picentini al mare.
              </p>
              <p>
                La campagna circostante è un mosaico di uliveti, orti, vigneti e
                allevamenti. Qui la tradizione agricola non è un ricordo del
                passato ma una realtà viva, che alimenta agriturismi, mercati
                locali e una cucina genuina e senza compromessi.
              </p>
            </div>
          </section>

          {/* Dove Mangiare */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Dove Mangiare a Eboli
            </h2>
            <div className="prose prose-stone max-w-none font-display">
              <p>
                A Eboli si mangia la vera cucina contadina campana. I piatti
                forti sono la pasta fatta a mano (cavatelli, lagane e ceci),
                le carni alla brace, i formaggi locali, le zuppe di legumi e
                le verdure dell&apos;orto. Tutto accompagnato da olio
                extravergine locale e vini delle cantine del territorio.
              </p>
              <p>
                Gli agriturismi sono il cuore dell&apos;offerta gastronomica:
                menu fissi con prodotti a km zero, ambienti rurali e il ritmo
                lento della campagna. Ma non mancano trattorie in centro,
                pizzerie e locali più moderni.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/ristoranti/eboli"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">restaurant</span>
                Ristoranti a Eboli
              </Link>
              <Link
                href="/agriturismi/eboli"
                className="inline-flex items-center gap-2 bg-emerald-950 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-emerald-900 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">agriculture</span>
                Agriturismi a Eboli
              </Link>
            </div>
          </section>

          {/* Cosa Vedere */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Cosa Vedere e Fare
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: "castle",
                  title: "Centro Storico",
                  desc: "Il Castello Colonna, le chiese medievali e i vicoli del borgo antico",
                },
                {
                  icon: "agriculture",
                  title: "Agriturismi",
                  desc: "Pranzi contadini, fattorie didattiche e ospitalità rurale autentica",
                },
                {
                  icon: "forest",
                  title: "Oasi WWF di Persano",
                  desc: "Riserva naturale con lontre, aironi e percorsi nel verde lungo il Sele",
                },
                {
                  icon: "wine_bar",
                  title: "Cantine e Frantoi",
                  desc: "Degustazioni di vini locali e olio extravergine del territorio",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-xl border border-stone-200 p-6"
                >
                  <span className="material-symbols-outlined text-3xl text-primary mb-3 block">
                    {item.icon}
                  </span>
                  <h3 className="font-black text-lg mb-1">{item.title}</h3>
                  <p className="text-stone-500 font-display text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Come Arrivare */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Come Arrivare
            </h2>
            <div className="prose prose-stone max-w-none font-display">
              <ul>
                <li>
                  <strong>In auto:</strong> Autostrada A2 del Mediterraneo,
                  uscita Eboli. Da Salerno circa 25 minuti, da Battipaglia 10
                  minuti.
                </li>
                <li>
                  <strong>In treno:</strong> Stazione di Eboli sulla linea
                  Salerno-Potenza. Collegamento anche da Battipaglia con bus
                  locali.
                </li>
                <li>
                  <strong>Dall&apos;aeroporto:</strong> Napoli Capodichino dista
                  circa 90 km. Collegamento in auto via A2 o in treno via Salerno.
                </li>
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <FaqSection faqs={faqs} />

          {/* CTA */}
          <div className="mt-16 bg-emerald-950 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Scopri Eboli su Ristointour
            </h2>
            <p className="text-stone-300 font-display mb-6 max-w-lg mx-auto">
              Agriturismi, ristoranti, cantine e tutte le eccellenze
              gastronomiche di Eboli e dintorni.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/agriturismi/eboli"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors"
              >
                Agriturismi a Eboli
              </Link>
              <Link
                href="/ristoranti/eboli"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-white/20 transition-colors"
              >
                Ristoranti a Eboli
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
