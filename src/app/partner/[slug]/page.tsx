import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSponsorBySlug } from "@/lib/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sponsor = await getSponsorBySlug(slug);
  if (!sponsor) return { title: "Partner non trovato" };

  return {
    title: `${sponsor.name} — Partner`,
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
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Partner", href: "/partner" },
          { name: sponsor.name, href: `/partner/${sponsor.slug}` },
        ]}
      />

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
              <a
                href={`https://wa.me/393385940445?text=${encodeURIComponent(`Ciao! Vorrei informazioni su ${sponsor.name} trovato su ristointour.it`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 bg-[#25D366] text-white rounded-lg text-sm font-bold hover:bg-[#1fba59] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Scrivici su WhatsApp
              </a>
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
