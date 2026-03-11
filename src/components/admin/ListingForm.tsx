"use client";

import type { Listing } from "@/generated/prisma/client";

interface ListingFormProps {
  listing?: Listing;
  action: (formData: FormData) => Promise<void>;
}

export default function ListingForm({ listing, action }: ListingFormProps) {
  const isEdit = !!listing;

  return (
    <form action={action} className="space-y-8 max-w-4xl">
      {/* Basic Info */}
      <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">
          Informazioni Base
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Nome *
            </label>
            <input
              name="name"
              required
              defaultValue={listing?.name}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Categoria *
            </label>
            <select
              name="category"
              required
              defaultValue={listing?.category || "ristorante"}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="ristorante">Ristorante</option>
              <option value="pizzeria">Pizzeria</option>
              <option value="agriturismo">Agriturismo</option>
              <option value="caseificio">Caseificio</option>
              <option value="cantina">Cantina</option>
              <option value="pasticceria">Pasticceria</option>
              <option value="altro">Altro</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Località *
            </label>
            <input
              name="location"
              required
              defaultValue={listing?.location}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Paestum, Campania"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Cucina / Tipologia
            </label>
            <input
              name="cuisine"
              defaultValue={listing?.cuisine || ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
            Descrizione Breve *
          </label>
          <input
            name="description"
            required
            defaultValue={listing?.description}
            className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
            Descrizione Completa (Filosofia)
          </label>
          <textarea
            name="philosophy"
            rows={4}
            defaultValue={listing?.philosophy || ""}
            className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      </fieldset>

      {/* Contact */}
      <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">
          Contatti
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Telefono
            </label>
            <input
              name="phone"
              defaultValue={listing?.phone || ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Sito Web
            </label>
            <input
              name="website"
              defaultValue={listing?.website || ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              defaultValue={listing?.email || ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Link Prenotazione
            </label>
            <input
              name="bookingLink"
              defaultValue={listing?.bookingLink || ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Link Menu
            </label>
            <input
              name="menuLink"
              defaultValue={listing?.menuLink || ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </fieldset>

      {/* Media */}
      <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">
          Immagini
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Immagine Card *
            </label>
            <input
              name="image"
              required
              defaultValue={listing?.image}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="URL immagine"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Immagine Hero (Premium)
            </label>
            <input
              name="heroImage"
              defaultValue={listing?.heroImage || ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
            Immagine Mappa
          </label>
          <input
            name="mapImage"
            defaultValue={listing?.mapImage || ""}
            className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
            Galleria Immagini (JSON)
          </label>
          <textarea
            name="galleryImages"
            rows={3}
            defaultValue={listing?.galleryImages ? JSON.stringify(listing.galleryImages, null, 2) : ""}
            className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-xs font-mono focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder='[{"src": "url", "alt": "desc", "layout": "square"}]'
          />
        </div>
      </fieldset>

      {/* Premium Details */}
      <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">
          Dettagli Premium
        </legend>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Valutazione
            </label>
            <input
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              defaultValue={listing?.rating ?? ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Numero Recensioni
            </label>
            <input
              name="reviewCount"
              type="number"
              defaultValue={listing?.reviewCount ?? ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Fascia Prezzo
            </label>
            <input
              name="priceRange"
              defaultValue={listing?.priceRange || ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="€€"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Etichetta Prezzo
            </label>
            <input
              name="priceLabel"
              defaultValue={listing?.priceLabel || ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Orario
            </label>
            <input
              name="openTime"
              defaultValue={listing?.openTime || ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Badge
            </label>
            <input
              name="badge"
              defaultValue={listing?.badge || ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Premium, Stella Michelin..."
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Badge Style
            </label>
            <input
              name="badgeStyle"
              defaultValue={listing?.badgeStyle || ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="bg-primary text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Piatti Signature (JSON)
            </label>
            <textarea
              name="dishes"
              rows={3}
              defaultValue={listing?.dishes ? JSON.stringify(listing.dishes, null, 2) : ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-xs font-mono focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder='[{"icon": "restaurant", "name": "...", "description": "..."}]'
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Servizi (JSON)
            </label>
            <textarea
              name="services"
              rows={3}
              defaultValue={listing?.services ? JSON.stringify(listing.services, null, 2) : ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-xs font-mono focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder='[{"icon": "wifi", "label": "WiFi Gratuito"}]'
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Orari Apertura (JSON)
            </label>
            <textarea
              name="hours"
              rows={3}
              defaultValue={listing?.hours ? JSON.stringify(listing.hours, null, 2) : ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-xs font-mono focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder='[{"day": "Lunedì", "time": "Chiuso"}]'
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Recensioni (JSON)
            </label>
            <textarea
              name="reviews"
              rows={3}
              defaultValue={listing?.reviews ? JSON.stringify(listing.reviews, null, 2) : ""}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-xs font-mono focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </fieldset>

      {/* Plan & Visibility */}
      <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">
          Piano e Visibilità
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Tipo Piano *
            </label>
            <select
              name="planType"
              required
              defaultValue={listing?.planType || "basic"}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="sponsor">Sponsor</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Stato *
            </label>
            <select
              name="status"
              required
              defaultValue={listing?.status || "published"}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="draft">Bozza</option>
              <option value="published">Pubblicato</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Priorità
            </label>
            <input
              name="displayPriority"
              type="number"
              defaultValue={listing?.displayPriority ?? 100}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="flex gap-8 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="showOnHomepage"
              defaultChecked={listing?.showOnHomepage}
              className="rounded border-stone-300 text-primary focus:ring-primary"
            />
            <span className="text-sm">Mostra in Homepage</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="hasDetailPage"
              defaultChecked={listing?.hasDetailPage}
              className="rounded border-stone-300 text-primary focus:ring-primary"
            />
            <span className="text-sm">Pagina Dettaglio</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={listing?.featured}
              className="rounded border-stone-300 text-primary focus:ring-primary"
            />
            <span className="text-sm">In Evidenza</span>
          </label>
        </div>
      </fieldset>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-emerald-900 text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-emerald-950 transition-colors"
        >
          {isEdit ? "Salva Modifiche" : "Crea Attività"}
        </button>
        <a
          href="/admin/activities"
          className="px-8 py-3 rounded-lg font-bold text-sm border border-stone-300 hover:bg-stone-50 transition-colors"
        >
          Annulla
        </a>
      </div>
    </form>
  );
}
