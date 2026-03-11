import AdminShell from "@/components/admin/AdminShell";
import ArtistForm from "@/components/admin/ArtistForm";
import { createArtist } from "../actions";

export default function NewArtistPage() {
  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Nuovo Artista</h1>
        <p className="text-stone-500 font-display mt-1">
          Aggiungi un nuovo musicista, band o performer
        </p>
      </div>
      <ArtistForm action={createArtist} />
    </AdminShell>
  );
}
