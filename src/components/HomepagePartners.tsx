import Image from "next/image";
import Link from "next/link";
import { getHomepageSponsors } from "@/lib/queries";

export default async function HomepagePartners() {
  const sponsors = await getHomepageSponsors();
  if (sponsors.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400">
            I Nostri Partner
          </h3>
          <Link
            href="/partner"
            className="text-xs font-bold text-primary hover:text-orange-700 transition-colors"
          >
            Scopri tutti i partner →
          </Link>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14">
          {sponsors.map((s) => {
            const logo = (
              <div
                key={s.id}
                className="relative h-10 w-24 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500"
              >
                <Image
                  src={s.logo}
                  alt={s.name}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            );
            if (s.hasDetailPage) {
              return (
                <Link key={s.id} href={`/partner/${s.slug}`}>
                  {logo}
                </Link>
              );
            }
            if (s.website) {
              return (
                <a key={s.id} href={s.website} target="_blank" rel="noopener noreferrer">
                  {logo}
                </a>
              );
            }
            return <div key={s.id}>{logo}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
