import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import FaqSection, { buildFaqJsonLd } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Battipaglia — Capitale della Mozzarella di Bufala",
  description:
    "Guida gastronomica a Battipaglia: caseifici, ristoranti, pizzerie e dove mangiare la migliore mozzarella di bufala DOP nella Piana del Sele.",
  alternates: { canonical: "/territori/battipaglia" },
};

const faqs = [
  {
    question: "Perché Battipaglia è la capitale della mozzarella di bufala?",
    answer: "Battipaglia ospita la più alta concentrazione di caseifici bufalini d'Italia. La vicinanza agli allevamenti della Piana del Sele permette di lavorare il latte freschissimo, producendo mozzarella di qualità superiore ogni giorno.",
  },
  {
    question: "Quali sono i piatti tipici di Battipaglia?",
    answer: "Oltre alla mozzarella fresca, a Battipaglia si gustano piatti a base di bufala (tartare, parmigiana), pizza con mozzarella DOP, pasta e fagioli, fritture di pesce del Golfo e dolci della tradizione campana.",
  },
  {
    question: "Come arrivare a Battipaglia?",
    answer: "Battipaglia è sull'autostrada A2 (uscita Battipaglia) e sulla linea ferroviaria principale Napoli-Salerno-Reggio Calabria. La stazione è servita da treni regionali, intercity e alcuni Frecce. Dall'aeroporto di Napoli dista circa 80 km.",
  },
];

const categories = [
  {
    icon: "storefront",
    title: "Caseifici",
    description: "Mozzarella di bufala fresca, burrata, ricotta e formaggi artigianali",
    href: "/caseifici/battipaglia",
  },
  {
    icon: "restaurant",
    title: "Ristoranti",
    description: "Cucina tradizionale, pesce, specialità bufaline e fine dining",
    href: "/ristoranti/battipaglia",
  },
  {
    icon: "local_pizza",
    title: "Pizzerie",
    description: "Pizza napoletana con mozzarella di bufala DOP a km zero",
    href: "/ristoranti/battipaglia",
  },
  {
    icon: "bakery_dining",
    title: "Pasticcerie",
    description: "Sfogliatelle, pastiere e dolci della tradizione campana",
    href: "/pasticcerie",
  },
];

export default function BattipagliaTerritoryPage() {
  const faqJsonLd = buildFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Territori", href: "/territori" },
          { name: "Battipaglia", href: "/territori/battipaglia" },
        ]}
      />
      <Header />

      <article className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <header className="mb-16">
            <nav className="text-sm text-stone-400 font-display mb-4">
              <Link href="/territori" className="hover:text-primary transition-colors">
                Territori
              </Link>
              <span className="mx-2">/</span>
              <span className="text-stone-600">Battipaglia</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Battipaglia — Capitale della Mozzarella di Bufala
            </h1>
            <p className="text-stone-500 font-display text-lg leading-relaxed">
              Battipaglia è il punto di riferimento mondiale per la produzione
              della Mozzarella di Bufala Campana DOP. Ma la sua offerta
              gastronomica va ben oltre: ristoranti, pizzerie, pasticcerie e
              una vivace scena culinaria nel cuore della Piana del Sele.
            </p>
          </header>

          {/* La Città */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              La Città e il Suo Territorio
            </h2>
            <div className="prose prose-stone max-w-none font-display">
              <p>
                Situata al centro della Piana del Sele, Battipaglia è una città
                dinamica di circa 50.000 abitanti nella provincia di Salerno.
                Nodo strategico tra Napoli e il Cilento, è il centro economico
                della piana e il cuore del distretto bufalino più importante
                d&apos;Italia.
              </p>
              <p>
                La tradizione casearia battipagliese risale a secoli fa, quando
                le prime bufale d&apos;acqua mediterranea furono introdotte nella
                piana. Oggi decine di caseifici producono quotidianamente
                mozzarella, burrata, trecce e ricotta di bufala, esportati in
                tutto il mondo.
              </p>
            </div>
          </section>

          {/* Dove Mangiare */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-6">
              Dove Mangiare a Battipaglia
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="bg-white rounded-xl border border-stone-200 p-6 hover:border-primary hover:shadow-md transition-all group"
                >
                  <span className="material-symbols-outlined text-3xl text-primary mb-3 block">
                    {cat.icon}
                  </span>
                  <h3 className="font-black text-lg group-hover:text-primary transition-colors mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-stone-500 font-display text-sm leading-relaxed">
                    {cat.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* La Mozzarella */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              La Mozzarella di Bufala di Battipaglia
            </h2>
            <div className="prose prose-stone max-w-none font-display">
              <p>
                Battipaglia è riconosciuta come la capitale mondiale della
                mozzarella di bufala. I caseifici locali lavorano latte
                freschissimo proveniente dagli allevamenti della piana,
                producendo mozzarella che raggiunge i consumatori a poche ore
                dalla caseificazione.
              </p>
              <p>
                Molti caseifici offrono <strong>visite guidate</strong> alla
                produzione e <strong>degustazioni</strong> con taglieri di
                prodotti freschi. Un&apos;esperienza imperdibile che solo a
                Battipaglia puoi vivere con questa autenticità.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/caseifici/battipaglia"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">storefront</span>
                Caseifici a Battipaglia
              </Link>
              <Link
                href="/blog/mozzarella-bufala-dove-mangiare"
                className="inline-flex items-center gap-2 bg-emerald-950 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-emerald-900 transition-colors"
              >
                Guida alla Mozzarella
              </Link>
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
                  uscita Battipaglia. Da Napoli circa 70 minuti, da Salerno 30
                  minuti.
                </li>
                <li>
                  <strong>In treno:</strong> Stazione di Battipaglia sulla linea
                  principale Napoli-Salerno-Reggio Calabria. Treni regionali
                  ogni 30 minuti da Salerno.
                </li>
                <li>
                  <strong>Dall&apos;aeroporto:</strong> Napoli Capodichino
                  dista circa 80 km. Collegamento diretto in auto o treno via
                  Napoli Centrale.
                </li>
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <FaqSection faqs={faqs} />

          {/* CTA */}
          <div className="mt-16 bg-emerald-950 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Scopri Battipaglia su Ristointour
            </h2>
            <p className="text-stone-300 font-display mb-6 max-w-lg mx-auto">
              Trova ristoranti, caseifici e tutte le eccellenze gastronomiche
              di Battipaglia.
            </p>
            <Link
              href="/blog/dove-mangiare-a-battipaglia"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors"
            >
              Guida: Dove Mangiare a Battipaglia
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
