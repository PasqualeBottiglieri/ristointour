import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RestaurantCard from "@/components/RestaurantCard";
import BusinessCardBasic from "@/components/BusinessCardBasic";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getPublishedListings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title:
    "Dove Mangiare la Migliore Mozzarella di Bufala nella Piana del Sele",
  description:
    "Guida ai migliori caseifici e ristoranti dove mangiare mozzarella di bufala campana DOP fresca nella Piana del Sele: Battipaglia, Paestum, Eboli e Capaccio.",
  alternates: { canonical: "/blog/mozzarella-bufala-dove-mangiare" },
};

export default async function MozzarellaBufalaDoveMangiare() {
  const caseifici = await getPublishedListings(["caseificio"]);
  const ristoranti = await getPublishedListings(["ristorante"]);

  const premiumCaseifici = caseifici.filter((l) => l.hasDetailPage);
  const basicCaseifici = caseifici.filter((l) => !l.hasDetailPage);
  const premiumRistoranti = ristoranti.filter((l) => l.hasDetailPage);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Dove Mangiare la Migliore Mozzarella di Bufala nella Piana del Sele",
    description:
      "Guida ai migliori caseifici e ristoranti dove mangiare mozzarella di bufala fresca nella Piana del Sele.",
    author: {
      "@type": "Organization",
      name: "Ristointour",
    },
    publisher: {
      "@type": "Organization",
      name: "Ristointour",
      url: "https://www.ristointour.com",
    },
    datePublished: "2026-03-01",
    dateModified: new Date().toISOString().split("T")[0],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog/mozzarella-bufala-dove-mangiare" },
          {
            name: "Mozzarella di Bufala",
            href: "/blog/mozzarella-bufala-dove-mangiare",
          },
        ]}
      />
      <Header />

      <article className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <header className="mb-16">
            <nav className="text-sm text-stone-400 font-display mb-4">
              <Link
                href="/"
                className="hover:text-primary transition-colors"
              >
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-stone-600">Guida</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Dove Mangiare la Migliore Mozzarella di Bufala nella Piana del
              Sele
            </h1>
            <p className="text-stone-500 font-display text-lg leading-relaxed">
              La Piana del Sele è il cuore della produzione della Mozzarella di
              Bufala Campana DOP. Tra Battipaglia, Paestum, Eboli e Capaccio si
              concentrano i caseifici più rinomati d&apos;Italia. Ecco dove
              assaggiare la mozzarella più fresca e autentica.
            </p>
          </header>

          {/* What makes it special */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Cos&apos;è la Mozzarella di Bufala Campana DOP
            </h2>
            <div className="prose prose-stone max-w-none font-display">
              <p>
                La Mozzarella di Bufala Campana DOP è un formaggio a pasta filata
                prodotto esclusivamente con latte di bufala d&apos;acqua
                mediterranea. Il marchio DOP (Denominazione di Origine Protetta)
                garantisce che ogni passaggio — dall&apos;allevamento delle bufale
                alla caseificazione — avvenga secondo disciplinari rigorosi nel
                territorio riconosciuto.
              </p>
              <p>
                La Piana del Sele è il territorio con la maggiore concentrazione
                di allevamenti bufalini e caseifici in Italia. Qui la mozzarella
                viene prodotta ogni giorno e può essere consumata a poche ore
                dalla lavorazione: un&apos;esperienza di gusto impossibile da
                replicare altrove.
              </p>
            </div>
          </section>

          {/* Caseifici */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-2">
              I Caseifici da Visitare
            </h2>
            <p className="text-stone-500 font-display mb-8">
              Acquista mozzarella freschissima direttamente dal produttore.
              Molti caseifici offrono visite guidate alla lavorazione e
              degustazioni.
            </p>

            {premiumCaseifici.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                {premiumCaseifici.map((c) => (
                  <RestaurantCard key={c.slug} restaurant={c} />
                ))}
              </div>
            )}

            {basicCaseifici.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {basicCaseifici.map((c) => (
                  <BusinessCardBasic key={c.slug} business={c} />
                ))}
              </div>
            )}

            <div className="mt-8">
              <Link
                href="/caseifici"
                className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-orange-600 transition-colors"
              >
                Vedi tutti i Caseifici
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </Link>
            </div>
          </section>

          {/* How to taste */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Come Degustare la Mozzarella al Meglio
            </h2>
            <div className="prose prose-stone max-w-none font-display">
              <ul>
                <li>
                  <strong>Temperatura:</strong> toglila dal frigorifero almeno
                  30 minuti prima. La mozzarella esprime il meglio a temperatura
                  ambiente.
                </li>
                <li>
                  <strong>Freschezza:</strong> la mozzarella di bufala è un
                  prodotto fresco. Il giorno stesso della produzione è il momento
                  ideale per gustarla.
                </li>
                <li>
                  <strong>Abbinamenti:</strong> pomodorini del Vesuvio, basilico
                  fresco, un filo d&apos;olio extravergine del Cilento. Semplice
                  è meglio.
                </li>
                <li>
                  <strong>Varianti:</strong> oltre alla classica, prova la
                  burrata (cuore di stracciatella), la treccia e l&apos;affumicata.
                </li>
              </ul>
            </div>
          </section>

          {/* Restaurants */}
          {premiumRistoranti.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-black mb-2">
                Ristoranti con Specialità di Bufala
              </h2>
              <p className="text-stone-500 font-display mb-8">
                Non solo mozzarella fresca: questi ristoranti propongono piatti
                creativi a base di bufala — dalla tartare alla parmigiana,
                dalla pizza ai primi piatti.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {premiumRistoranti.slice(0, 4).map((r) => (
                  <RestaurantCard key={r.slug} restaurant={r} />
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="/ristoranti"
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:text-orange-600 transition-colors"
                >
                  Vedi tutti i Ristoranti
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </section>
          )}

          {/* Territory links */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Dove Trovarla: Le Città della Mozzarella
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  name: "Battipaglia",
                  desc: "La capitale mondiale della mozzarella di bufala",
                  href: "/caseifici/battipaglia",
                },
                {
                  name: "Paestum",
                  desc: "Caseifici tra i templi e il mare",
                  href: "/ristoranti/paestum",
                },
                {
                  name: "Eboli",
                  desc: "Tradizione casearia e agriturismi",
                  href: "/agriturismi/eboli",
                },
                {
                  name: "Capaccio",
                  desc: "Il Cilento e le sue eccellenze",
                  href: "/ristoranti",
                },
              ].map((city) => (
                <Link
                  key={city.name}
                  href={city.href}
                  className="bg-white rounded-xl border border-stone-200 p-5 hover:border-primary hover:shadow-md transition-all group"
                >
                  <h3 className="font-black text-lg group-hover:text-primary transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-stone-500 font-display text-sm mt-1">
                    {city.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-6">
              Domande Frequenti
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Qual è il periodo migliore per mangiare la mozzarella di bufala?",
                  a: "La mozzarella di bufala è disponibile tutto l'anno, ma la produzione aumenta in primavera e estate quando le bufale producono più latte. Il periodo da aprile a ottobre è considerato il migliore.",
                },
                {
                  q: "Posso visitare i caseifici e vedere la produzione?",
                  a: "Sì, molti caseifici della Piana del Sele offrono visite guidate alla produzione, solitamente nelle ore mattutine quando avviene la lavorazione. Si consiglia di prenotare in anticipo.",
                },
                {
                  q: "Qual è la differenza tra mozzarella di bufala e fior di latte?",
                  a: "La mozzarella di bufala è prodotta con latte di bufala d'acqua e ha un sapore più intenso, una consistenza più morbida e un colore più bianco. Il fior di latte è fatto con latte vaccino ed è più delicato.",
                },
                {
                  q: "Come conservare la mozzarella di bufala acquistata al caseificio?",
                  a: "Conservala nel suo liquido di governo in frigorifero. Consumala entro 2-3 giorni dall'acquisto per gustarla al meglio. Toglila dal frigo 30 minuti prima di servirla.",
                },
              ].map((faq) => (
                <details
                  key={faq.q}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden group"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-emerald-900 hover:text-primary transition-colors">
                    {faq.q}
                    <span className="material-symbols-outlined text-stone-400 group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-stone-600 font-display leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-emerald-950 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Scopri Tutte le Eccellenze
            </h2>
            <p className="text-stone-300 font-display mb-6 max-w-lg mx-auto">
              Ristoranti, caseifici, agriturismi e molto altro nella Piana del
              Sele.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/caseifici"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors"
              >
                Caseifici
              </Link>
              <Link
                href="/ristoranti"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-white/20 transition-colors"
              >
                Ristoranti
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
