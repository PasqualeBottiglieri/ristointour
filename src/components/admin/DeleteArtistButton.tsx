"use client";

import { deleteArtist } from "@/app/admin/artists/actions";

export function DeleteArtistButton({ id, name }: { id: string; name: string }) {
  async function handleDelete() {
    if (!confirm(`Eliminare "${name}"?`)) return;
    await deleteArtist(id);
    window.location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 font-medium text-xs"
    >
      Elimina
    </button>
  );
}
