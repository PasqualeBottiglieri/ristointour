"use client";

import { deleteSponsor } from "@/app/admin/sponsors/actions";

export function DeleteSponsorButton({ id, name }: { id: string; name: string }) {
  async function handleDelete() {
    if (!confirm(`Eliminare "${name}"?`)) return;
    await deleteSponsor(id);
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
