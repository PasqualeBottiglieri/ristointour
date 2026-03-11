"use client";

import type { Artist } from "@/generated/prisma/client";

interface ArtistFormProps {
  artist?: Artist;
  action: (formData: FormData) => Promise<void>;
}

export default function ArtistForm({ artist, action }: ArtistFormProps) {
  const isEdit = !!artist;

  return (
    <form action={action} className="space-y-8 max-w-4xl">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Genere *</label>
            <input name="genre" required defaultValue={artist?.genre} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Jazz & Soul" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Località *</label>
            <input name="location" required defaultValue={artist?.location} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Paestum" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Descrizione Breve *</label>
          <input name="shortDescription" required defaultValue={artist?.shortDescription} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Biografia (Premium)</label>
          <textarea name="biography" rows={4} defaultValue={artist?.biography || ""} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Stile Musicale (Premium)</label>
          <textarea name="musicStyle" rows={2} defaultValue={artist?.musicStyle || ""} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
        </div>
      </fieldset>

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

      <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">Media</legend>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Immagine *</label>
          <input name="image" required defaultValue={artist?.image} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Galleria (JSON)</label>
          <textarea name="galleryImages" rows={3} defaultValue={artist?.galleryImages ? JSON.stringify(artist.galleryImages, null, 2) : ""} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-xs font-mono focus:ring-2 focus:ring-primary focus:border-primary" placeholder='[{"src": "url", "alt": "desc"}]' />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Video Embed (JSON)</label>
          <textarea name="videoEmbeds" rows={3} defaultValue={artist?.videoEmbeds ? JSON.stringify(artist.videoEmbeds, null, 2) : ""} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-xs font-mono focus:ring-2 focus:ring-primary focus:border-primary" placeholder='[{"url": "youtube-embed-url", "title": "..."}]' />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Social Links (JSON)</label>
          <textarea name="socialLinks" rows={3} defaultValue={artist?.socialLinks ? JSON.stringify(artist.socialLinks, null, 2) : ""} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-xs font-mono focus:ring-2 focus:ring-primary focus:border-primary" placeholder='[{"platform": "instagram", "url": "..."}]' />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Tipi Evento (JSON)</label>
          <textarea name="eventTypes" rows={2} defaultValue={artist?.eventTypes ? JSON.stringify(artist.eventTypes, null, 2) : ""} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-xs font-mono focus:ring-2 focus:ring-primary focus:border-primary" placeholder='["Matrimoni", "Cene Private"]' />
        </div>
      </fieldset>

      <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">Piano e Visibilità</legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Tipo Piano *</label>
            <select name="planType" required defaultValue={artist?.planType || "basic"} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary">
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="sponsor">Sponsor</option>
            </select>
          </div>
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
        <div className="flex gap-8 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="showOnHomepage" defaultChecked={artist?.showOnHomepage} className="rounded border-stone-300 text-primary focus:ring-primary" />
            <span className="text-sm">Mostra in Homepage</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="hasDetailPage" defaultChecked={artist?.hasDetailPage} className="rounded border-stone-300 text-primary focus:ring-primary" />
            <span className="text-sm">Pagina Dettaglio</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" defaultChecked={artist?.featured} className="rounded border-stone-300 text-primary focus:ring-primary" />
            <span className="text-sm">In Evidenza</span>
          </label>
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
