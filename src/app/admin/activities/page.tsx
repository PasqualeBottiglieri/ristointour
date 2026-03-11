import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { getAllListings } from "@/lib/queries";
import { DeleteListingButton } from "@/components/admin/DeleteListingButton";

export default async function ActivitiesPage() {
  const listings = await getAllListings();

  return (
    <AdminShell>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black">Attività</h1>
          <p className="text-stone-500 font-display mt-1">
            Gestisci ristoranti, caseifici, agriturismi e altre attività
          </p>
        </div>
        <Link
          href="/admin/activities/new"
          className="inline-flex items-center gap-2 bg-emerald-900 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-emerald-950 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Nuova Attività
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
                Categoria
              </th>
              <th className="text-left px-6 py-3 font-bold text-xs uppercase tracking-widest text-stone-500">
                Piano
              </th>
              <th className="text-left px-6 py-3 font-bold text-xs uppercase tracking-widest text-stone-500">
                Stato
              </th>
              <th className="text-left px-6 py-3 font-bold text-xs uppercase tracking-widest text-stone-500">
                Priorità
              </th>
              <th className="text-right px-6 py-3 font-bold text-xs uppercase tracking-widest text-stone-500">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr
                key={listing.id}
                className="border-b border-stone-100 hover:bg-stone-50"
              >
                <td className="px-6 py-4">
                  <div className="font-bold">{listing.name}</div>
                  <div className="text-stone-400 text-xs">{listing.location}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2 py-1 bg-stone-100 text-stone-600 rounded text-xs font-medium capitalize">
                    {listing.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase ${
                      listing.planType === "premium"
                        ? "bg-orange-100 text-orange-700"
                        : listing.planType === "sponsor"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {listing.planType}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block size-2.5 rounded-full ${
                      listing.status === "published"
                        ? "bg-green-500"
                        : "bg-stone-300"
                    }`}
                  />
                  <span className="ml-2 text-xs capitalize">
                    {listing.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-stone-500">
                  {listing.displayPriority}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/activities/${listing.id}/edit`}
                      className="text-emerald-700 hover:text-emerald-900 font-medium text-xs"
                    >
                      Modifica
                    </Link>
                    <DeleteListingButton id={listing.id} name={listing.name} />
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
