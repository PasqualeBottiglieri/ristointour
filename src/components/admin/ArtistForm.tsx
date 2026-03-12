"use client";

import { useState } from "react";
import type { Artist } from "@/generated/prisma/client";
import { parseGenres } from "@/lib/types";
import ImageUpload from "./ImageUpload";
import ArtistMediaManager from "./ArtistMediaManager";
import VideoEmbedsInput from "./VideoEmbedsInput";
import SocialLinksInput from "./SocialLinksInput";
import EventTypesInput from "./EventTypesInput";
import SelectOrCustom from "./SelectOrCustom";
import TagPickerInput from "./TagPickerInput";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ArtistFilterOptions {
  genres: string[];
  locations: string[];
  eventTypes: string[];
}

interface ArtistFormProps {
  artist?: Artist;
  action: (formData: FormData) => Promise<void>;
  filterOptions?: ArtistFilterOptions;
}

export default function ArtistForm({ artist, action, filterOptions }: ArtistFormProps) {
  const isEdit = !!artist;
  const [planType, setPlanType] = useState<"basic" | "premium">(
    (artist?.planType as "basic" | "premium") || "basic"
  );
  const isPremium = planType === "premium";

  return (
    <form action={action} className="space-y-8 max-w-4xl">
      {/* Hidden inputs driven by plan */}
      <input type="hidden" name="showOnHomepage" value="on" />
      <input type="hidden" name="hasDetailPage" value={isPremium ? "on" : ""} />
      <input type="hidden" name="featured" value={isPremium ? "on" : ""} />

      {/* Tipo Piano */}
      <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">
          Tipo Piano
        </legend>
        <div>
          <select
            name="planType"
            required
            value={planType}
            onChange={(e) => setPlanType(e.target.value as "basic" | "premium")}
            className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
          </select>
          <p className="text-xs text-stone-400 mt-1">
            {isPremium
              ? "Pagina dettaglio, homepage in evidenza, galleria, video, social, eventi"
              : "Card compatta nella listing, homepage, campi essenziali"}
          </p>
        </div>
      </fieldset>

      {/* Informazioni Base */}
      <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">
          Informazioni Base
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Nome *</label>
            <input name="name" required defaultValue={artist?.name} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Tipo Artista *</label>
            <select name="artistType" required defaultValue={artist?.artistType || "cantante"} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary">
              <option value="cantante">Cantante</option>
              <option value="band">Band</option>
              <option value="dj">DJ</option>
              <option value="musicista">Musicista</option>
              <option value="performer">Performer</option>
            </select>
          </div>
        </div>

        <TagPickerInput
          name="genre"
          label="Genere *"
          suggestions={filterOptions?.genres || []}
          defaultValue={parseGenres(artist?.genre)}
          placeholder="Aggiungi genere..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectOrCustom
            name="location"
            label="Località"
            required
            options={filterOptions?.locations || []}
            defaultValue={artist?.location}
            placeholder="Seleziona località..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Descrizione Breve *</label>
          <input name="shortDescription" required defaultValue={artist?.shortDescription} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
        </div>

        {isPremium && (
          <>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Biografia</label>
              <textarea name="biography" rows={4} defaultValue={artist?.biography || ""} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Stile Musicale</label>
              <textarea name="musicStyle" rows={2} defaultValue={artist?.musicStyle || ""} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
            </div>
          </>
        )}
      </fieldset>

      {/* Contatti */}
      <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">Contatti</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Telefono</label>
            <input name="phone" defaultValue={artist?.phone || ""} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Sito Web</label>
            <input name="website" defaultValue={artist?.website || ""} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
        </div>
      </fieldset>

      {/* Media */}
      <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">Media</legend>
        {isPremium ? (
          <>
            <ArtistMediaManager
              defaultMainImage={artist?.image}
              defaultGalleryImages={artist?.galleryImages as GalleryImage[] | undefined}
            />
            <VideoEmbedsInput
              defaultValue={artist?.videoEmbeds as { url: string; title: string }[] | undefined}
            />
            <SocialLinksInput
              defaultValue={artist?.socialLinks as { platform: string; url: string }[] | undefined}
            />
            <EventTypesInput
              defaultValue={artist?.eventTypes as string[] | undefined}
              suggestions={filterOptions?.eventTypes}
            />
          </>
        ) : (
          <ImageUpload
            name="image"
            label="Immagine Principale"
            required
            defaultValue={artist?.image}
          />
        )}
      </fieldset>

      {/* Visibilità */}
      <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">Visibilità</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Stato *</label>
            <select name="status" required defaultValue={artist?.status || "published"} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary">
              <option value="draft">Bozza</option>
              <option value="published">Pubblicato</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Priorità</label>
            <input name="displayPriority" type="number" defaultValue={artist?.displayPriority ?? 100} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
        </div>
      </fieldset>

      <div className="flex gap-4">
        <button type="submit" className="bg-emerald-900 text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-emerald-950 transition-colors">
          {isEdit ? "Salva Modifiche" : "Crea Artista"}
        </button>
        <a href="/admin/artists" className="px-8 py-3 rounded-lg font-bold text-sm border border-stone-300 hover:bg-stone-50 transition-colors">
          Annulla
        </a>
      </div>
    </form>
  );
}
