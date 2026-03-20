import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RestaurantCard from "@/components/RestaurantCard";
import BusinessCardBasic from "@/components/BusinessCardBasic";
import Breadcrumb from "@/components/Breadcrumb";
import { getPublishedListings } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Dove Mangiare a Battipaglia — Guida Completa 2026",
  description:
    "La guida definitiva su dove mangiare a Battipaglia nel 2026: i migliori ristoranti, pizzerie, caseifici e street food nella capitale della mozzarella di bufala.",
  alternates: { canonical: "/blog/dove-mangiare-a-battipaglia" },
};

export default async function DoveMangiareBattipaglia() {
  const listings = await getPublishedListings(
    ["ristorante", "pizzeria", "caseificio", "pasticceria"],
    "Battipaglia"
  );

  const premium = listings.filter((l) => l.hasDetailPage);
  const basic = listings.filter((l) => !l.hasDetailPage);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Dove Mangiare a Battipaglia — Guida Completa 2026",
    description:
      "La guida definitiva su dove mangiare a Battipaglia: ristoranti, pizzerie, caseifici e street food.",
    author: {
      "@type": "Organization",
      name: "Ristointour",
    },
    publisher: {
      "@type": "Organization",
      name: "Ristointour",
      url: "https://www.ristointour.it",
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
      <Header />
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog/dove-mangiare-a-battipaglia" },
          {
            name: "Dove Mangiare a Battipaglia",
            href: "/blog/dove-mangiare-a-battipaglia",
          },
        ]}
      />

      <article className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Dove Mangiare a Battipaglia: La Guida Definitiva 2026
            </h1>
            <p className="text-stone-500 font-display text-lg leading-relaxed">
              Battipaglia non è solo la capitale mondiale della mozzarella di
              bufala. È una città dove la tradizione gastronomica campana incontra
              l&apos;innovazione, dove ogni pasto racconta una storia di terra,
              passione e sapori autentici. Ecco la nostra selezione dei migliori
              posti dove mangiare.
            </p>
          </header>

          {/* Intro Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Perché Mangiare a Battipaglia
            </h2>
            <div className="prose prose-stone max-w-none font-display">
              <p>
                Situata nel cuore della Piana del Sele, Battipaglia è il punto di
                riferimento gastronomico della provincia di Salerno. La città è
                famosa in tutto il mondo per la produzione della{" "}
                <strong>Mozzarella di Bufala Campana DOP</strong>, ma la sua
                offerta culinaria va ben oltre: ristoranti di pesce, pizzerie
                napoletane, trattorie familiari e pasticcerie artigianali.
              </p>
              <p>
                Che tu sia un turista di passaggio verso Paestum o il Cilento, o
                un locale alla ricerca di nuove esperienze, questa guida ti aiuta
                a trovare il tavolo perfetto per ogni occasione e budget.
              </p>
            </div>
          </section>

          {/* Premium Restaurants */}
          {premium.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-black mb-2">
                I Migliori Ristoranti a Battipaglia
              </h2>
              <p className="text-stone-500 font-display mb-8">
                Le nostre scelte top: ristoranti selezionati per qualità,
                ambiente e autenticità.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {premium.map((r) => (
                  <RestaurantCard key={r.slug} restaurant={r} />
                ))}
              </div>
            </section>
          )}

          {/* Mozzarella Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Dove Mangiare la Mozzarella di Bufala Fresca
            </h2>
            <div className="prose prose-stone max-w-none font-display">
              <p>
                Non puoi visitare Battipaglia senza assaggiare la mozzarella di
                bufala appena fatta. La città ospita decine di caseifici dove puoi
                acquistare e degustare mozzarella, burrata, ricotta di bufala e
                trecce ancora calde.
              </p>
              <p>
                Molti caseifici offrono <strong>visite guidate</strong> alla
                produzione e <strong>degustazioni</strong> con taglieri di
                prodotti freschi. Un&apos;esperienza imperdibile per gli amanti del
                buon cibo.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/caseifici/battipaglia"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  storefront
                </span>
                Vedi tutti i Caseifici a Battipaglia
              </Link>
            </div>
          </section>

          {/* Pizza Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Le Migliori Pizzerie
            </h2>
            <div className="prose prose-stone max-w-none font-display">
              <p>
                La tradizione della pizza napoletana è fortissima a Battipaglia.
                Dalle pizzerie storiche aperte dagli anni &apos;80 ai locali
                gourmet con impasti a lunga lievitazione e ingredienti DOP: qui la
                pizza è una cosa seria.
              </p>
              <p>
                Da provare: la pizza con <strong>mozzarella di bufala</strong>{" "}
                fresca locale — un&apos;esperienza che solo a Battipaglia puoi
                vivere con questa qualità di ingredienti a km zero.
              </p>
            </div>
          </section>

          {/* Other Restaurants */}
          {basic.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-black mb-2">
                Altre Attività dove Mangiare
              </h2>
              <p className="text-stone-500 font-display mb-6">
                Trattorie, pizzerie e locali da contattare direttamente.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {basic.map((r) => (
                  <BusinessCardBasic key={r.slug} business={r} />
                ))}
              </div>
            </section>
          )}

          {/* Practical Tips */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Consigli Pratici
            </h2>
            <div className="prose prose-stone max-w-none font-display">
              <ul>
                <li>
                  <strong>Prenotare:</strong> nei weekend e in estate è consigliato
                  prenotare, soprattutto nei ristoranti premium.
                </li>
                <li>
                  <strong>Orari:</strong> molti ristoranti chiudono il lunedì.
                  I caseifici sono aperti dalla mattina presto.
                </li>
                <li>
                  <strong>Budget:</strong> si mangia bene a Battipaglia con ogni
                  budget, dalle trattorie a 15-20€ ai ristoranti gourmet.
                </li>
                <li>
                  <strong>Come arrivare:</strong> Battipaglia è sulla linea
                  ferroviaria Napoli-Salerno-Reggio Calabria e sull&apos;autostrada
                  A2 (uscita Battipaglia).
                </li>
              </ul>
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
                  q: "Quali sono i migliori ristoranti a Battipaglia?",
                  a: "Battipaglia offre un'ampia scelta: dai ristoranti con specialità di bufala ai locali di pesce, dalle trattorie familiari alle pizzerie storiche. Consulta la nostra selezione aggiornata in questa guida.",
                },
                {
                  q: "Dove mangiare mozzarella di bufala fresca a Battipaglia?",
                  a: "I caseifici di Battipaglia producono mozzarella fresca ogni giorno. Molti offrono degustazioni sul posto e vendita diretta. Visita la nostra sezione caseifici per trovarli.",
                },
                {
                  q: "Si spende molto per mangiare bene a Battipaglia?",
                  a: "No, Battipaglia offre ottime opzioni per tutti i budget. Le trattorie e pizzerie partono da 15-20€ a persona, mentre i ristoranti gourmet possono arrivare a 50-70€.",
                },
                {
                  q: "Battipaglia è raggiungibile in treno?",
                  a: "Sì, la stazione di Battipaglia è sulla linea principale Napoli-Salerno-Reggio Calabria, ben collegata con treni regionali e intercity.",
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
              Esplora tutti i Ristoranti
            </h2>
            <p className="text-stone-300 font-display mb-6 max-w-lg mx-auto">
              Scopri l&apos;intera directory di ristoranti, pizzerie e
              agriturismi della Piana del Sele.
            </p>
            <Link
              href="/ristoranti"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors"
            >
              Vedi tutti i Ristoranti
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}
