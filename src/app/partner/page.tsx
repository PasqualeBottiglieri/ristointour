import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SponsorCard from "@/components/SponsorCard";
import { getPublishedSponsors } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "I Nostri Partner | Ristointour",
  description:
    "Scopri i partner e sponsor che rendono possibile il progetto Ristointour nella Piana del Sele.",
};

const TYPE_LABELS: Record<string, string> = {
  main_sponsor: "Main Sponsor",
  media_partner: "Media Partner",
  technical_partner: "Partner Tecnici",
  food_partner: "Partner Food",
  territorial_partner: "Partner Territoriali",
  partner: "Partner",
};

const TYPE_ORDER = [
  "main_sponsor",
  "media_partner",
  "technical_partner",
  "food_partner",
  "territorial_partner",
  "partner",
];

export default async function PartnerPage() {
  const sponsors = await getPublishedSponsors();
  const featured = sponsors.filter((s) => s.featured);
  const others = sponsors.filter((s) => !s.featured);

  // Group non-featured by sponsorType
  const grouped = new Map<string, typeof others>();
  for (const s of others) {
    const list = grouped.get(s.sponsorType) || [];
    list.push(s);
    grouped.set(s.sponsorType, list);
  }
  const sortedGroups = TYPE_ORDER.filter((t) => grouped.has(t)).map((t) => ({
    type: t,
    label: TYPE_LABELS[t] || t,
    sponsors: grouped.get(t)!,
  }));

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-emerald-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            I Nostri Partner
          </h1>
          <p className="text-stone-300 font-display text-lg max-w-2xl">
            Insieme ai nostri partner valorizziamo il territorio della Piana del Sele,
            promuovendo eccellenze enogastronomiche, culturali e artistiche.
          </p>
        </div>
      </section>

      {/* Featured Partners */}
      {featured.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-black mb-8">Partner in Evidenza</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((s) => (
                <SponsorCard key={s.id} sponsor={s} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Partners grouped by type */}
      {sortedGroups.length > 0 && (
        <section className="py-16 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 space-y-12">
            {sortedGroups.map((group) => (
              <div key={group.type}>
                <h3 className="text-lg font-black uppercase tracking-wider text-stone-500 mb-4">
                  {group.label}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.sponsors.map((s) => (
                    <SponsorCard key={s.id} sponsor={s} variant="compact" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Diventa Partner */}
      <section className="py-20 bg-emerald-950 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Diventa Partner
          </h2>
          <p className="text-stone-300 font-display text-lg mb-8">
            Vuoi far parte del progetto Ristointour? Contattaci per scoprire
            le opportunità di partnership e sponsorizzazione.
          </p>
          <Link
            href="/contatti"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors"
          >
            Contattaci
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
