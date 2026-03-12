import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { getAllSponsors } from "@/lib/queries";
import { DeleteSponsorButton } from "@/components/admin/DeleteSponsorButton";

const TYPE_LABELS: Record<string, string> = {
  main_sponsor: "Main Sponsor",
  media_partner: "Media Partner",
  technical_partner: "Partner Tecnico",
  food_partner: "Partner Food",
  territorial_partner: "Partner Territoriale",
  partner: "Partner",
};

export default async function SponsorsPage() {
  const sponsors = await getAllSponsors();

  return (
    <AdminShell>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black">Sponsor</h1>
          <p className="text-stone-500 font-display mt-1">
            Gestisci sponsor e partner del progetto
          </p>
        </div>
        <Link
          href="/admin/sponsors/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Nuovo Sponsor
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50">
              <th className="text-left px-6 py-3 font-bold text-xs uppercase tracking-widest text-stone-500">
                Nome
              </th>
              <th className="text-left px-6 py-3 font-bold text-xs uppercase tracking-widest text-stone-500">
                Tipo
              </th>
              <th className="text-left px-6 py-3 font-bold text-xs uppercase tracking-widest text-stone-500">
                In Evidenza
              </th>
              <th className="text-left px-6 py-3 font-bold text-xs uppercase tracking-widest text-stone-500">
                Homepage
              </th>
              <th className="text-left px-6 py-3 font-bold text-xs uppercase tracking-widest text-stone-500">
                Stato
              </th>
              <th className="text-right px-6 py-3 font-bold text-xs uppercase tracking-widest text-stone-500">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody>
            {sponsors.map((sponsor) => (
              <tr
                key={sponsor.id}
                className="border-b border-stone-100 hover:bg-stone-50"
              >
                <td className="px-6 py-4">
                  <div className="font-bold">{sponsor.name}</div>
                  <div className="text-stone-400 text-xs">{sponsor.shortDescription}</div>
                </td>
                <td className="px-6 py-4 text-stone-600">
                  {TYPE_LABELS[sponsor.sponsorType] || sponsor.sponsorType}
                </td>
                <td className="px-6 py-4">
                  {sponsor.featured && (
                    <span className="material-symbols-outlined text-orange-500 text-lg">star</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {sponsor.showOnHomepage && (
                    <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block size-2.5 rounded-full ${
                      sponsor.status === "published"
                        ? "bg-green-500"
                        : "bg-stone-300"
                    }`}
                  />
                  <span className="ml-2 text-xs capitalize">{sponsor.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/sponsors/${sponsor.id}/edit`}
                      className="text-emerald-700 hover:text-emerald-900 font-medium text-xs"
                    >
                      Modifica
                    </Link>
                    <DeleteSponsorButton id={sponsor.id} name={sponsor.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
