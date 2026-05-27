"use client";

import { useState } from "react";
import { deleteArtist } from "@/app/admin/artists/actions";

export function DeleteArtistButton({ id, name }: { id: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleConfirm() {
    setDeleting(true);
    await deleteArtist(id);
    window.location.reload();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-red-500 hover:text-red-700 font-medium text-xs"
      >
        Elimina
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => !deleting && setOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-600">delete</span>
              </div>
              <h3 className="text-lg font-bold text-stone-900">Conferma eliminazione</h3>
            </div>
            <p className="text-sm text-stone-600 mb-6">
              Sei sicuro di voler eliminare <strong>&ldquo;{name}&rdquo;</strong>? Questa azione è irreversibile.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={deleting}
                className="px-5 py-2.5 rounded-lg text-sm font-bold border border-stone-300 hover:bg-stone-50 transition-colors disabled:opacity-50"
              >
                Annulla
              </button>
              <button
                onClick={handleConfirm}
                disabled={deleting}
                className="px-5 py-2.5 rounded-lg text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                    Eliminando...
                  </>
                ) : (
                  "Elimina"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
