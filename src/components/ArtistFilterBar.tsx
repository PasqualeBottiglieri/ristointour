"use client";

import { artistGenres, artistLocations, artistEventTypes } from "@/data/content";

interface ArtistFilterBarProps {
  genre: string;
  location: string;
  eventType: string;
  onGenreChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onEventTypeChange: (value: string) => void;
}

export default function ArtistFilterBar({
  genre,
  location,
  eventType,
  onGenreChange,
  onLocationChange,
  onEventTypeChange,
}: ArtistFilterBarProps) {
  const selectClass =
    "w-full md:w-auto bg-white border border-stone-200 rounded-lg px-4 py-3 text-sm font-display font-bold text-emerald-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none appearance-none cursor-pointer";

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-10">
      <select
        className={selectClass}
        value={genre}
        onChange={(e) => onGenreChange(e.target.value)}
      >
        <option value="">Tutti i Generi</option>
        {artistGenres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
      >
        <option value="">Tutte le Zone</option>
        {artistLocations.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={eventType}
        onChange={(e) => onEventTypeChange(e.target.value)}
      >
        <option value="">Tutti gli Eventi</option>
        {artistEventTypes.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </div>
  );
}
