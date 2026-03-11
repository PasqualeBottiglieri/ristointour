"use client";

import { useState } from "react";
import type {
  GooglePlaceSearchResult,
  GooglePlaceDetails,
} from "@/lib/google-places";

interface GooglePlacesSearchProps {
  onPlaceSelected: (details: GooglePlaceDetails) => void;
  existingPlaceId?: string | null;
}

export default function GooglePlacesSearch({
  onPlaceSelected,
  existingPlaceId,
}: GooglePlacesSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GooglePlaceSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [loadingDetailsId, setLoadingDetailsId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    if (!query.trim()) return;
    setSearching(true);
    setError(null);
    setResults([]);
    try {
      const res = await fetch("/api/admin/google-places/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Errore nella ricerca");
        return;
      }
      if (data.places.length === 0) {
        setError("Nessun risultato trovato. Prova con un nome diverso.");
        return;
      }
      setResults(data.places);
    } catch {
      setError("Errore di rete. Riprova.");
    } finally {
      setSearching(false);
    }
  }

  async function handleSelect(place: GooglePlaceSearchResult) {
    setLoadingDetailsId(place.id);
    setError(null);
    try {
      const res = await fetch("/api/admin/google-places/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeId: place.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Errore nel recupero dettagli");
        return;
      }
      onPlaceSelected(data.details);
      setOpen(false);
      setResults([]);
      setQuery("");
    } catch {
      setError("Errore di rete. Riprova.");
    } finally {
      setLoadingDetailsId(null);
    }
  }

  function renderStars(rating?: number) {
    if (!rating) return null;
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    return (
      <span className="inline-flex items-center gap-0.5 text-amber-500 text-xs">
        {Array.from({ length: full }, (_, i) => (
          <span key={i} className="material-symbols-outlined text-xs">
            star
          </span>
        ))}
        {half && (
          <span className="material-symbols-outlined text-xs">star_half</span>
        )}
        <span className="text-stone-500 ml-1">{rating.toFixed(1)}</span>
      </span>
    );
  }

  if (existingPlaceId && !open) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-600 text-lg">
            check_circle
          </span>
          <span className="text-sm text-emerald-800 font-medium">
            Collegato a Google Places
          </span>
          <span className="text-xs text-emerald-600 font-mono">
            {existingPlaceId}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-xs text-emerald-700 underline hover:no-underline"
        >
          Cerca un altro
        </button>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-stone-400 text-lg">
            travel_explore
          </span>
          <span className="text-sm font-bold text-stone-700">
            Importa da Google Places
          </span>
          <span className="text-xs text-stone-400">(opzionale)</span>
        </div>
        <span className="material-symbols-outlined text-stone-400 text-sm">
          {open ? "expand_less" : "expand_more"}
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              placeholder='Cerca attività... es. "Ristorante Le Trabe Paestum"'
              className="flex-1 px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <button
              type="button"
              onClick={handleSearch}
              disabled={searching || !query.trim()}
              className="bg-emerald-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-emerald-950 transition-colors disabled:opacity-50"
            >
              {searching ? (
                <span className="material-symbols-outlined text-sm animate-spin">
                  progress_activity
                </span>
              ) : (
                "Cerca"
              )}
            </button>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {results.map((place) => (
                <div
                  key={place.id}
                  className="bg-white border border-stone-200 rounded-lg p-3 flex items-start justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-stone-900 truncate">
                      {place.displayName}
                    </p>
                    <p className="text-xs text-stone-500 truncate">
                      {place.formattedAddress}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      {renderStars(place.rating)}
                      {place.userRatingCount && (
                        <span className="text-xs text-stone-400">
                          ({place.userRatingCount} recensioni)
                        </span>
                      )}
                      {place.primaryTypeDisplayName && (
                        <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                          {place.primaryTypeDisplayName}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelect(place)}
                    disabled={loadingDetailsId === place.id}
                    className="shrink-0 bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors disabled:opacity-50"
                  >
                    {loadingDetailsId === place.id ? (
                      <span className="material-symbols-outlined text-xs animate-spin">
                        progress_activity
                      </span>
                    ) : (
                      "Usa questo"
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
