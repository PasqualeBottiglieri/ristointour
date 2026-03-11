import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";
import { getAllArtists } from "@/lib/queries";
import { DeleteArtistButton } from "@/components/admin/DeleteArtistButton";

export default async function ArtistsPage() {
  const artists = await getAllArtists();

  return (
    <AdminShell>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black">Artisti</h1>
          <p className="text-stone-500 font-display mt-1">
            Gestisci musicisti, band, DJ e performer
          </p>
        </div>
        <Link
          href="/admin/artists/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Nuovo Artista
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
                Genere
              </th>
              <th className="text-left px-6 py-3 font-bold text-xs uppercase tracking-widest text-stone-500">
                Piano
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
            {artists.map((artist) => (
              <tr
                key={artist.id}
                className="border-b border-stone-100 hover:bg-stone-50"
              >
                <td className="px-6 py-4">
                  <div className="font-bold">{artist.name}</div>
                  <div className="text-stone-400 text-xs">{artist.location}</div>
                </td>
                <td className="px-6 py-4 capitalize text-stone-600">
                  {artist.artistType}
                </td>
                <td className="px-6 py-4 text-stone-600">{artist.genre}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase ${
                      artist.planType === "premium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {artist.planType}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block size-2.5 rounded-full ${
                      artist.status === "published"
                        ? "bg-green-500"
                        : "bg-stone-300"
                    }`}
                  />
                  <span className="ml-2 text-xs capitalize">{artist.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/artists/${artist.id}/edit`}
                      className="text-emerald-700 hover:text-emerald-900 font-medium text-xs"
                    >
                      Modifica
                    </Link>
                    <DeleteArtistButton id={artist.id} name={artist.name} />
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
