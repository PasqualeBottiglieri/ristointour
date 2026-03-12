import Image from "next/image";
import Link from "next/link";
import type { Sponsor } from "@/generated/prisma/client";

const TYPE_LABELS: Record<string, string> = {
  main_sponsor: "Main Sponsor",
  media_partner: "Media Partner",
  technical_partner: "Partner Tecnico",
  food_partner: "Partner Food",
  territorial_partner: "Partner Territoriale",
  partner: "Partner",
};

function FeaturedCard({ sponsor }: { sponsor: Sponsor }) {
  const content = (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow">
      {sponsor.coverImage && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={sponsor.coverImage}
            alt={sponsor.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {sponsor.badge && (
            <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
              {sponsor.badge}
            </span>
          )}
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative size-16 rounded-xl overflow-hidden border border-stone-200 shrink-0 bg-white">
            <Image
              src={sponsor.logo}
              alt={`${sponsor.name} logo`}
              fill
              className="object-contain p-2"
            />
          </div>
          <div>
            <h3 className="text-lg font-black">{sponsor.name}</h3>
            <span className="text-xs text-stone-500 font-medium uppercase tracking-wider">
              {TYPE_LABELS[sponsor.sponsorType] || sponsor.sponsorType}
            </span>
          </div>
        </div>
        <p className="text-sm text-stone-600 leading-relaxed">{sponsor.shortDescription}</p>
        {sponsor.ctaLabel && sponsor.ctaUrl && (
          <div className="mt-4">
            <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
              {sponsor.ctaLabel}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (sponsor.hasDetailPage) {
    return <Link href={`/partner/${sponsor.slug}`}>{content}</Link>;
  }
  if (sponsor.ctaUrl) {
    return <a href={sponsor.ctaUrl} target="_blank" rel="noopener noreferrer">{content}</a>;
  }
  return content;
}

function CompactCard({ sponsor }: { sponsor: Sponsor }) {
  const content = (
    <div className="group flex items-center gap-4 bg-white rounded-xl p-4 border border-stone-200 hover:shadow-md transition-shadow">
      <div className="relative size-14 rounded-lg overflow-hidden border border-stone-100 shrink-0 bg-white">
        <Image
          src={sponsor.logo}
          alt={`${sponsor.name} logo`}
          fill
          className="object-contain p-2"
        />
      </div>
      <div className="min-w-0">
        <h4 className="font-bold text-sm truncate">{sponsor.name}</h4>
        <p className="text-xs text-stone-500 line-clamp-1">{sponsor.shortDescription}</p>
      </div>
    </div>
  );

  if (sponsor.hasDetailPage) {
    return <Link href={`/partner/${sponsor.slug}`}>{content}</Link>;
  }
  if (sponsor.ctaUrl) {
    return <a href={sponsor.ctaUrl} target="_blank" rel="noopener noreferrer">{content}</a>;
  }
  return content;
}

export default function SponsorCard({
  sponsor,
  variant = "compact",
}: {
  sponsor: Sponsor;
  variant?: "featured" | "compact";
}) {
  return variant === "featured" ? (
    <FeaturedCard sponsor={sponsor} />
  ) : (
    <CompactCard sponsor={sponsor} />
  );
}
