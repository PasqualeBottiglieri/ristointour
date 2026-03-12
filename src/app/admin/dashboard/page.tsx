import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [listingCount, artistCount, sponsorCount, publishedListings, publishedArtists, publishedSponsors] =
    await Promise.all([
      prisma.listing.count(),
      prisma.artist.count(),
      prisma.sponsor.count(),
      prisma.listing.count({ where: { status: "published" } }),
      prisma.artist.count({ where: { status: "published" } }),
      prisma.sponsor.count({ where: { status: "published" } }),
    ]);

  const stats = [
    {
      label: "Attività Totali",
      value: listingCount,
      icon: "store",
      href: "/admin/activities",
    },
    {
      label: "Attività Pubblicate",
      value: publishedListings,
      icon: "check_circle",
      href: "/admin/activities",
    },
    {
      label: "Artisti Totali",
      value: artistCount,
      icon: "music_note",
      href: "/admin/artists",
    },
    {
      label: "Artisti Pubblicati",
      value: publishedArtists,
      icon: "check_circle",
      href: "/admin/artists",
    },
    {
      label: "Sponsor Totali",
      value: sponsorCount,
      icon: "handshake",
      href: "/admin/sponsors",
    },
    {
      label: "Sponsor Pubblicati",
      value: publishedSponsors,
      icon: "check_circle",
      href: "/admin/sponsors",
    },
  ];

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Dashboard</h1>
        <p className="text-stone-500 font-display mt-1">
          Panoramica del portale Ristointour
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-2xl text-emerald-700">
                {stat.icon}
              </span>
            </div>
            <div className="text-3xl font-black">{stat.value}</div>
            <div className="text-sm text-stone-500 font-display mt-1">
              {stat.label}
            </div>
          </Link>
        ))}
      </div>

      <div className="flex gap-4">
        <Link
          href="/admin/activities/new"
          className="inline-flex items-center gap-2 bg-emerald-900 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-emerald-950 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Nuova Attività
        </Link>
        <Link
          href="/admin/artists/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Nuovo Artista
        </Link>
        <Link
          href="/admin/sponsors/new"
          className="inline-flex items-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-emerald-800 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Nuovo Sponsor
        </Link>
      </div>
    </AdminShell>
  );
}
