"use client";

import { useState, useMemo } from "react";
import { artists } from "@/data/artists";
import ArtistCard from "./ArtistCard";
import ArtistCardBasic from "./ArtistCardBasic";
import ArtistFilterBar from "./ArtistFilterBar";

export default function ArtistGrid() {
  const [genre, setGenre] = useState("");
  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("");

  const filtered = useMemo(() => {
    return artists.filter((a) => {
      if (genre && a.genre !== genre) return false;
      if (location && a.location !== location) return false;
      if (eventType && !a.eventTypes.includes(eventType)) return false;
      return true;
    });
  }, [genre, location, eventType]);

  const premiumArtists = filtered.filter((a) => a.hasDetailPage);
  const basicArtists = filtered.filter((a) => !a.hasDetailPage);

  return (
    <div>
      <ArtistFilterBar
        genre={genre}
        location={location}
        eventType={eventType}
        onGenreChange={setGenre}
        onLocationChange={setLocation}
        onEventTypeChange={setEventType}
      />

      {filtered.length > 0 ? (
        <>
          {premiumArtists.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {premiumArtists.map((artist) => (
                <ArtistCard key={artist.slug} artist={artist} />
              ))}
            </div>
          )}

          {basicArtists.length > 0 && (
            <div className="mt-12">
              <div className="mb-6">
                <h2 className="text-2xl font-black mb-1">Altri Artisti</h2>
                <p className="text-stone-500 font-display text-sm">
                  Contattali direttamente per il tuo evento
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {basicArtists.map((artist) => (
                  <ArtistCardBasic key={artist.slug} artist={artist} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-6xl text-stone-300 mb-4 block">
            music_off
          </span>
          <h3 className="text-xl font-bold mb-2">Nessun artista trovato</h3>
          <p className="text-stone-500 font-display">
            Prova a modificare i filtri per trovare l&apos;artista perfetto per il tuo evento.
          </p>
        </div>
      )}
    </div>
  );
}
