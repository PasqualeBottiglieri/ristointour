import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import FaqSection, { buildFaqJsonLd } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Piana del Sele — Eccellenze Gastronomiche e Territorio",
  description:
    "Scopri la Piana del Sele: terra di mozzarella di bufala DOP, agriturismi, ristoranti e tradizioni gastronomiche. Guida completa a Battipaglia, Eboli, Paestum e Capaccio.",
  alternates: { canonical: "/territori/piana-del-sele" },
};

const faqs = [
  {
    question: "Dove si trova la Piana del Sele?",
    answer: "La Piana del Sele si trova nella provincia di Salerno, in Campania. È delimitata dai Monti Picentini a nord, dal Cilento a sud, dal mare Tirreno a ovest e dalle colline interne a est. Le città principali sono Battipaglia, Eboli, Capaccio e Paestum.",
  },
  {
    question: "Per cosa è famosa la Piana del Sele?",
    answer: "La Piana del Sele è famosa soprattutto per la produzione della Mozzarella di Bufala Campana DOP, per i Templi di Paestum (Patrimonio UNESCO), per la cucina tradizionale cilentana e per una ricca tradizione agricola.",
  },
  {
    question: "Come arrivare nella Piana del Sele?",
    answer: "La Piana del Sele è raggiungibile in auto dall'autostrada A2 (uscite Battipaglia o Eboli), in treno con la linea Napoli-Salerno-Reggio Calabria (stazione di Battipaglia), o dall'aeroporto di Napoli Capodichino (circa 90 km).",
  },
  {
    question: "Qual è il periodo migliore per visitare la Piana del Sele?",
    answer: "La Piana del Sele è bella tutto l'anno. La primavera (aprile-giugno) è ideale per i caseifici e gli agriturismi, l'estate per le spiagge di Paestum, l'autunno per la vendemmia e le sagre, l'inverno per le trattorie e la cucina contadina.",
  },
];

const cities = [
  {
    name: "Battipaglia",
    description: "Capitale mondiale della mozzarella di bufala. Caseifici storici, ristoranti di qualità e una tradizione casearia senza pari.",
    links: [
      { label: "Ristoranti", href: "/ristoranti/battipaglia" },
      { label: "Caseifici", href: "/caseifici/battipaglia" },
    ],
  },
  {
    name: "Paestum",
    description: "Patrimonio UNESCO con i templi greci meglio conservati al mondo. Ristoranti gourmet, agriturismi e spiagge a due passi dall'archeologia.",
    links: [
      { label: "Ristoranti", href: "/ristoranti/paestum" },
    ],
  },
  {
    name: "Eboli",
    description: "Porta d'ingresso del Cilento. Agriturismi immersi nella campagna, trattorie familiari, cantine e frantoi con olio extravergine.",
    links: [
      { label: "Ristoranti", href: "/ristoranti/eboli" },
      { label: "Agriturismi", href: "/agriturismi/eboli" },
    ],
  },
  {
    name: "Capaccio",
    description: "Il comune che abbraccia Paestum, tra colline, uliveti e aziende agricole. Cucina di terra e di mare con vista sul Cilento.",
    links: [
      { label: "Ristoranti", href: "/ristoranti" },
    ],
  },
];

export default function PianaDelSelePage() {
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
          { name: "Piana del Sele", href: "/territori/piana-del-sele" },
        ]}
      />

      <article className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Piana del Sele — Terra di Eccellenze Gastronomiche
            </h1>
            <p className="text-stone-500 font-display text-lg leading-relaxed">
              La Piana del Sele è il cuore agricolo e gastronomico della
              provincia di Salerno. Tra Battipaglia, Eboli, Paestum e Capaccio
              si concentrano le migliori produzioni della Campania: dalla
              mozzarella di bufala DOP ai vini del Cilento, dall&apos;olio
              extravergine ai prodotti dell&apos;orto.
            </p>
          </header>

          {/* Il Territorio */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Il Territorio
            </h2>
            <div className="prose prose-stone max-w-none font-display">
              <p>
                La Piana del Sele prende il nome dal fiume Sele che la attraversa.
                È una vasta pianura costiera che si estende dal Golfo di Salerno
                fino alle prime propaggini del Cilento. Storicamente terra di
                pastorizia e agricoltura, oggi è il distretto più importante
                d&apos;Italia per la produzione di mozzarella di bufala.
              </p>
              <p>
                Il paesaggio è dominato da campi coltivati, allevamenti bufalini,
                uliveti e vigneti. La vicinanza al mare e la protezione dei monti
                creano un microclima ideale per l&apos;agricoltura e per un
                turismo enogastronomico che sta crescendo rapidamente.
              </p>
            </div>
          </section>

          {/* Cosa Mangiare */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Cosa Mangiare nella Piana del Sele
            </h2>
            <div className="prose prose-stone max-w-none font-display">
              <p>
                La gastronomia della Piana del Sele riflette la ricchezza del
                territorio. I prodotti simbolo sono:
              </p>
              <ul>
                <li>
                  <strong>Mozzarella di Bufala Campana DOP</strong> — il prodotto
                  iconico, prodotto fresco ogni giorno nei caseifici locali
                </li>
                <li>
                  <strong>Cucina cilentana</strong> — piatti di terra con
                  ingredienti semplici e genuini, dalla pasta e fagioli ai
                  caciocavallo alla brace
                </li>
                <li>
                  <strong>Pesce del Golfo</strong> — alici, totani, gamberi
                  rossi e pesce azzurro del Tirreno
                </li>
                <li>
                  <strong>Olio extravergine</strong> — dalle cultivar Rotondella
                  e Frantoio, con note fruttate intense
                </li>
                <li>
                  <strong>Vini locali</strong> — Aglianico, Fiano e Greco dai
                  vigneti collinari
                </li>
              </ul>
            </div>
          </section>

          {/* Cities Grid */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-6">
              Le Città della Piana del Sele
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cities.map((city) => (
                <div
                  key={city.name}
                  className="bg-white rounded-xl border border-stone-200 p-6"
                >
                  <h3 className="text-xl font-black mb-2">{city.name}</h3>
                  <p className="text-stone-500 font-display text-sm mb-4 leading-relaxed">
                    {city.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {city.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-orange-50 px-3 py-1.5 rounded-full hover:bg-orange-100 transition-colors"
                      >
                        {link.label}
                        <span className="material-symbols-outlined text-sm">
                          arrow_forward
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Esperienze */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Esperienze da Non Perdere
            </h2>
            <div className="prose prose-stone max-w-none font-display">
              <ul>
                <li>
                  <strong>Tour dei caseifici</strong> — visita la produzione
                  della mozzarella e degusta prodotti freschi
                </li>
                <li>
                  <strong>Pranzo in agriturismo</strong> — cucina contadina con
                  prodotti dell&apos;orto e vista sulla campagna
                </li>
                <li>
                  <strong>Visita ai Templi di Paestum</strong> — archeologia e
                  gastronomia in un&apos;unica giornata
                </li>
                <li>
                  <strong>Degustazione in cantina</strong> — scopri i vini
                  autoctoni del territorio
                </li>
                <li>
                  <strong>Spiagge di Paestum</strong> — lidi e spiagge libere
                  con vista sui templi
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Link
                href="/esperienze"
                className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-orange-600 transition-colors"
              >
                Scopri tutte le Esperienze
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <FaqSection faqs={faqs} />

          {/* CTA */}
          <div className="mt-16 bg-emerald-950 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Esplora la Piana del Sele
            </h2>
            <p className="text-stone-300 font-display mb-6 max-w-lg mx-auto">
              Ristoranti, caseifici, agriturismi, cantine e artisti: tutto il
              meglio del territorio in un unico portale.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/ristoranti"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors"
              >
                Ristoranti
              </Link>
              <Link
                href="/caseifici"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-white/20 transition-colors"
              >
                Caseifici
              </Link>
              <Link
                href="/agriturismi"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-white/20 transition-colors"
              >
                Agriturismi
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
