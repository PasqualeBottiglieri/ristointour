import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSponsorBySlug } from "@/lib/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sponsor = await getSponsorBySlug(slug);
  if (!sponsor) return { title: "Partner non trovato | Ristointour" };

  return {
    title: `${sponsor.name} | Partner Ristointour`,
    description: sponsor.shortDescription,
  };
}

export default async function SponsorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const sponsor = await getSponsorBySlug(slug);

  if (!sponsor) notFound();

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative bg-emerald-950 text-white">
        {sponsor.coverImage && (
          <div className="absolute inset-0">
            <Image
              src={sponsor.coverImage}
              alt={sponsor.name}
              fill
              unoptimized
              className="object-cover opacity-30"
              priority
            />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="flex items-center gap-6">
            <div className="relative size-24 md:size-32 rounded-2xl overflow-hidden border-2 border-white/20 bg-white shrink-0">
              <Image
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                fill
                unoptimized
                className="object-contain p-3"
              />
            </div>
            <div>
              {sponsor.badge && (
                <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {sponsor.badge}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-black">{sponsor.name}</h1>
              <p className="text-stone-300 font-display text-lg mt-2">
                {sponsor.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          {sponsor.fullDescription && (
            <div className="prose prose-stone max-w-none mb-12">
              {sponsor.fullDescription.split("\n").map((p, i) =>
                p.trim() ? <p key={i}>{p}</p> : null
              )}
            </div>
          )}

          {/* Contacts */}
          {(sponsor.website || sponsor.email || sponsor.phone) && (
            <div className="bg-stone-50 rounded-xl p-6 space-y-3 mb-12">
              <h3 className="font-black text-lg">Contatti</h3>
              {sponsor.website && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-lg text-stone-400">language</span>
                  <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {sponsor.website}
                  </a>
                </div>
              )}
              {sponsor.email && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-lg text-stone-400">mail</span>
                  <a href={`mailto:${sponsor.email}`} className="text-primary hover:underline">
                    {sponsor.email}
                  </a>
                </div>
              )}
              {sponsor.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-lg text-stone-400">phone</span>
                  <a href={`tel:${sponsor.phone}`} className="text-primary hover:underline">
                    {sponsor.phone}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          {sponsor.ctaLabel && sponsor.ctaUrl && (
            <div className="text-center mb-12">
              <a
                href={sponsor.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors"
              >
                {sponsor.ctaLabel}
                <span className="material-symbols-outlined text-lg">open_in_new</span>
              </a>
            </div>
          )}

          <Link
            href="/partner"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Torna ai Partner
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
