import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ArtistForm from "@/components/admin/ArtistForm";
import { getArtistById, getAllArtistFilterOptions } from "@/lib/queries";
import { updateArtist } from "../../actions";

export default async function EditArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [artist, filterOptions] = await Promise.all([
    getArtistById(id),
    getAllArtistFilterOptions(),
  ]);
  if (!artist) notFound();

  const updateWithId = updateArtist.bind(null, id);

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Modifica Artista</h1>
        <p className="text-stone-500 font-display mt-1">{artist.name}</p>
      </div>
      <ArtistForm artist={artist} action={updateWithId} filterOptions={filterOptions} />
    </AdminShell>
  );
}
