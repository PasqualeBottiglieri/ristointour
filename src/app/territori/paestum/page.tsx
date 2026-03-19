import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import FaqSection, { buildFaqJsonLd } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Paestum — Dove Mangiare e Cosa Fare tra i Templi",
  description:
    "Guida a Paestum: i migliori ristoranti, agriturismi e caseifici vicino ai Templi. Cucina cilentana, pesce fresco e mozzarella di bufala nel Patrimonio UNESCO.",
  alternates: { canonical: "/territori/paestum" },
};

const faqs = [
  {
    question: "Dove mangiare vicino ai Templi di Paestum?",
    answer: "Nei dintorni dei Templi ci sono ristoranti con cucina cilentana, agriturismi con prodotti a km zero e caseifici dove degustare mozzarella fresca. Consulta la nostra sezione ristoranti a Paestum per trovare il tavolo ideale.",
  },
  {
    question: "Paestum è adatta per una gita di un giorno?",
    answer: "Sì, Paestum è perfetta per una giornata: mattina ai Templi e al Museo Archeologico, pranzo in un ristorante o agriturismo locale, pomeriggio in spiaggia o a visitare un caseificio della zona.",
  },
  {
    question: "Qual è il periodo migliore per visitare Paestum?",
    answer: "Paestum è visitabile tutto l'anno. La primavera (aprile-giugno) è ideale per i Templi con temperature miti. L'estate offre spiagge e vita notturna. L'autunno è perfetto per le degustazioni. L'inverno è il periodo più tranquillo e meno affollato.",
  },
  {
    question: "Come arrivare a Paestum?",
    answer: "Paestum è raggiungibile in auto dall'autostrada A2 (uscita Battipaglia, poi SS18), in treno con la stazione Paestum sulla linea Salerno-Sapri, o in bus da Salerno. Dall'aeroporto di Napoli dista circa 100 km.",
  },
];

export default function PaestumTerritoryPage() {
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
          { name: "Paestum", href: "/territori/paestum" },
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
              <span className="text-stone-600">Paestum</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Paestum — Tra Templi Greci e Sapori della Piana del Sele
            </h1>
            <p className="text-stone-500 font-display text-lg leading-relaxed">
              Paestum è uno dei siti archeologici più importanti al mondo,
              Patrimonio UNESCO dal 1998. Ma è anche un territorio di eccellenze
              gastronomiche: ristoranti gourmet, agriturismi con vista, caseifici
              e spiagge dove il Cilento incontra la Piana del Sele.
            </p>
          </header>

          {/* Il Sito */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              I Templi e il Patrimonio UNESCO
            </h2>
            <div className="prose prose-stone max-w-none font-display">
              <p>
                L&apos;area archeologica di Paestum conserva tre templi dorici
                tra i meglio conservati al mondo: il Tempio di Hera, il Tempio
                di Nettuno e il Tempio di Atena. Fondata come colonia greca nel
                VII secolo a.C. con il nome di Poseidonia, la città racconta
                oltre 2.500 anni di storia.
              </p>
              <p>
                Il Museo Archeologico Nazionale ospita i celebri affreschi della
                Tomba del Tuffatore, unico esempio di pittura greca del periodo
                classico. Un luogo dove arte, storia e paesaggio si fondono in
                un&apos;esperienza unica.
              </p>
            </div>
          </section>

          {/* Dove Mangiare */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Dove Mangiare a Paestum
            </h2>
            <div className="prose prose-stone max-w-none font-display">
              <p>
                La zona di Paestum offre un&apos;ampia scelta gastronomica:
                ristoranti stellati con vista sui templi, trattorie di pesce sul
                litorale, agriturismi nelle campagne circostanti e caseifici dove
                acquistare mozzarella freschissima.
              </p>
              <p>
                La cucina locale è un mix di tradizione cilentana e mediterranea:
                piatti di pesce del Golfo di Salerno, pasta fatta in casa, carni
                alla brace e l&apos;immancabile mozzarella di bufala in tutte le
                sue varianti.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/ristoranti/paestum"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">restaurant</span>
                Ristoranti a Paestum
              </Link>
              <Link
                href="/agriturismi"
                className="inline-flex items-center gap-2 bg-emerald-950 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-emerald-900 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">agriculture</span>
                Agriturismi
              </Link>
            </div>
          </section>

          {/* Cosa Fare */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Cosa Fare a Paestum
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: "account_balance",
                  title: "Templi e Museo",
                  desc: "Visita i tre templi dorici e il Museo Archeologico con la Tomba del Tuffatore",
                },
                {
                  icon: "beach_access",
                  title: "Spiagge",
                  desc: "Lidi attrezzati e spiagge libere sul litorale con vista sui templi",
                },
                {
                  icon: "storefront",
                  title: "Tour dei Caseifici",
                  desc: "Visita la produzione della mozzarella e degusta prodotti freschi",
                },
                {
                  icon: "wine_bar",
                  title: "Degustazioni",
                  desc: "Vini locali, olio extravergine e prodotti tipici del Cilento",
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
                  <strong>In auto:</strong> A2 uscita Battipaglia, poi SS18
                  direzione sud. Da Salerno circa 40 minuti, da Napoli 90 minuti.
                </li>
                <li>
                  <strong>In treno:</strong> Stazione Paestum sulla linea
                  Salerno-Sapri, a 500 metri dall&apos;ingresso dei Templi.
                </li>
                <li>
                  <strong>In bus:</strong> Autolinee CSTP da Salerno con fermata
                  ai Templi.
                </li>
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <FaqSection faqs={faqs} />

          {/* CTA */}
          <div className="mt-16 bg-emerald-950 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Esplora Paestum su Ristointour
            </h2>
            <p className="text-stone-300 font-display mb-6 max-w-lg mx-auto">
              Ristoranti, esperienze e tutto il meglio della zona di Paestum.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/ristoranti/paestum"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors"
              >
                Ristoranti a Paestum
              </Link>
              <Link
                href="/esperienze"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-white/20 transition-colors"
              >
                Esperienze
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
