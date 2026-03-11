"use client";

import { deleteListing } from "@/app/admin/activities/actions";

export function DeleteListingButton({ id, name }: { id: string; name: string }) {
  async function handleDelete() {
    if (!confirm(`Eliminare "${name}"?`)) return;
    await deleteListing(id);
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
