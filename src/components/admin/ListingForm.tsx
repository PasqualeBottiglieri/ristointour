"use client";

import { useState, useRef } from "react";
import type { Listing } from "@/generated/prisma/client";
import type {
  GooglePlaceDetails,
  GooglePlacePhoto,
} from "@/lib/google-places";
import ImageUpload from "./ImageUpload";
import GooglePlacesSearch from "./GooglePlacesSearch";
import ListingMediaManager, {
  type ListingMediaManagerHandle,
} from "./ListingMediaManager";

interface GalleryImage {
  src: string;
  alt: string;
  layout?: string;
}

interface ListingFormProps {
  listing?: Listing;
  action: (formData: FormData) => Promise<void>;
}

export default function ListingForm({ listing, action }: ListingFormProps) {
  const isEdit = !!listing;
  const [googleData, setGoogleData] = useState<GooglePlaceDetails | null>(
    null
  );
  const [formKey, setFormKey] = useState(0);
  const [imported, setImported] = useState(false);
  const [planType, setPlanType] = useState<"basic" | "premium">(
    (listing?.planType as "basic" | "premium") || "basic"
  );
  const [basicCardKey, setBasicCardKey] = useState(0);
  const [basicCardImage, setBasicCardImage] = useState<string | undefined>(
    undefined
  );
  const [usedPhotos, setUsedPhotos] = useState<Record<string, string[]>>({});
  const mediaRef = useRef<ListingMediaManagerHandle>(null);

  const isPremium = planType === "premium";

  function handlePlaceSelected(details: GooglePlaceDetails) {
    setGoogleData(details);
    setImported(true);
    setFormKey((k) => k + 1);
    setUsedPhotos({});
  }

  // Helper: google data takes priority over listing data for autofill
  const gd = googleData;

  // Extract "Battipaglia SA, Italy" from full address
  function extractLocation(address?: string): string {
    if (!address) return "";
    const match = address.match(/\d{5}\s+(.+)/);
    if (match) return match[1];
    const parts = address.split(",").map((p) => p.trim());
    return parts.length >= 2 ? parts.slice(-2).join(", ") : address;
  }

  // Google Photos — available after import
  const googlePhotos: GooglePlacePhoto[] = gd?.photos || [];

  function handleGooglePhotoAction(
    url: string,
    target: "card" | "hero" | "gallery"
  ) {
    if (isPremium) {
      if (mediaRef.current) {
        if (target === "card") mediaRef.current.setCardImage(url);
        else if (target === "hero") mediaRef.current.setHeroImage(url);
        else mediaRef.current.addGalleryImage(url);
      }
    } else {
      // Basic mode: update card image via key reset
      setBasicCardImage(url);
      setBasicCardKey((k) => k + 1);
    }
    setUsedPhotos((prev) => {
      const existing = prev[url] || [];
      if (existing.includes(target)) return prev;
      return { ...prev, [url]: [...existing, target] };
    });
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary";

  return (
    <div className="space-y-6 max-w-4xl">
      <GooglePlacesSearch
        onPlaceSelected={handlePlaceSelected}
        existingPlaceId={listing?.googlePlaceId}
      />

      {imported && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-600 text-lg">
            check_circle
          </span>
          <span className="text-sm text-emerald-800 font-medium">
            Dati importati da Google Places! Verifica e completa i campi
            sottostanti.
          </span>
        </div>
      )}

      {/* ── Google Photos Preview (outside form) ────────────────── */}
      {googlePhotos.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-lg">
              photo_library
            </span>
            <span className="text-sm font-bold text-blue-800">
              Immagini da Google
            </span>
            <span className="text-xs text-blue-500">
              Clicca i pulsanti sotto ogni foto per assegnarla
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {googlePhotos.map((photo, i) => {
              const usedTargets = usedPhotos[photo.url] || [];
              return (
                <div
                  key={i}
                  className={`rounded-lg border-2 overflow-hidden transition-all ${
                    usedTargets.length > 0
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-blue-200 bg-white"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={`Google foto ${i + 1}`}
                    className="w-full h-24 object-cover"
                  />
                  {usedTargets.length > 0 && (
                    <div className="px-2 py-1 bg-emerald-100 flex justify-center gap-1 flex-wrap">
                      {usedTargets.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-bold text-emerald-700 uppercase"
                        >
                          {t === "card"
                            ? "Card"
                            : t === "hero"
                              ? "Hero"
                              : "Galleria"}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-1 p-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        handleGooglePhotoAction(photo.url, "card")
                      }
                      className="flex-1 px-1 py-1.5 rounded text-[11px] font-bold bg-stone-100 text-stone-700 hover:bg-[#f86d16] hover:text-white transition-colors"
                    >
                      Card
                    </button>
                    {isPremium && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            handleGooglePhotoAction(photo.url, "hero")
                          }
                          className="flex-1 px-1 py-1.5 rounded text-[11px] font-bold bg-stone-100 text-stone-700 hover:bg-[#f86d16] hover:text-white transition-colors"
                        >
                          Hero
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleGooglePhotoAction(photo.url, "gallery")
                          }
                          className="flex-1 px-1 py-1.5 rounded text-[11px] font-bold bg-stone-100 text-stone-700 hover:bg-emerald-600 hover:text-white transition-colors"
                        >
                          +Gall.
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-blue-500">
            Le immagini Google vengono utilizzate come URL esterno. Per contenuti
            ufficiali, carica immagini proprietarie.
          </p>
        </div>
      )}

      {/* ── Main Form ───────────────────────────────────────────── */}
      <form key={formKey} action={action} className="space-y-8">
        {/* Hidden Google Places metadata */}
        <input
          type="hidden"
          name="googlePlaceId"
          value={gd?.placeId ?? listing?.googlePlaceId ?? ""}
        />
        <input
          type="hidden"
          name="latitude"
          value={gd?.latitude ?? listing?.latitude ?? ""}
        />
        <input
          type="hidden"
          name="longitude"
          value={gd?.longitude ?? listing?.longitude ?? ""}
        />
        <input
          type="hidden"
          name="googleMapsUrl"
          value={gd?.googleMapsUrl ?? listing?.googleMapsUrl ?? ""}
        />
        <input
          type="hidden"
          name="sourceProvider"
          value={gd ? "google" : (listing?.sourceProvider ?? "manual")}
        />

        {/* Hidden plan-derived visibility flags */}
        <input type="hidden" name="showOnHomepage" value="on" />
        <input type="hidden" name="hasDetailPage" value={isPremium ? "on" : ""} />
        <input type="hidden" name="featured" value={isPremium ? "on" : ""} />

        {/* ── Plan Selector ─────────────────────────────────────── */}
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
              className={inputClass}
            >
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
            </select>
            <p className="text-xs text-stone-400 mt-1">
              {isPremium
                ? "Card grande in homepage, pagina dettaglio, hero, galleria, recensioni, piatti"
                : "Card compatta nella listing, campi essenziali"}
            </p>
          </div>
        </fieldset>

        {/* ── Basic Info ────────────────────────────────────────── */}
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
                defaultValue={gd?.name ?? listing?.name ?? ""}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                Categoria *
              </label>
              <select
                name="category"
                required
                defaultValue={
                  gd?.category ?? listing?.category ?? "ristorante"
                }
                className={inputClass}
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
                defaultValue={
                  extractLocation(gd?.address) || listing?.location || ""
                }
                className={inputClass}
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
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Indirizzo
            </label>
            <input
              name="address"
              defaultValue={gd?.address ?? listing?.address ?? ""}
              className={inputClass}
              placeholder="Via Roma 15, 84047 Paestum (SA)"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Descrizione Breve *
            </label>
            <input
              name="description"
              required
              defaultValue={gd?.description ?? listing?.description ?? ""}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                Fascia Prezzo
              </label>
              <select
                name="priceRange"
                defaultValue={gd?.priceRange ?? listing?.priceRange ?? ""}
                className={inputClass}
              >
                <option value="">— non indicata —</option>
                <option value="€">€ — Economico</option>
                <option value="€€">€€ — Moderato</option>
                <option value="€€€">€€€ — Costoso</option>
                <option value="€€€€">€€€€ — Molto costoso</option>
              </select>
            </div>
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
                defaultValue={gd?.rating ?? listing?.rating ?? ""}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                N. Recensioni
              </label>
              <input
                name="reviewCount"
                type="number"
                defaultValue={gd?.reviewCount ?? listing?.reviewCount ?? ""}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                Orario
              </label>
              <input
                name="openTime"
                defaultValue={gd?.openTime ?? listing?.openTime ?? ""}
                className={inputClass}
                placeholder="12:00–15:00, 19:00–23:00"
              />
            </div>
          </div>

          {isPremium && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                Descrizione Completa (Filosofia)
              </label>
              <textarea
                name="philosophy"
                rows={4}
                defaultValue={listing?.philosophy || ""}
                className={inputClass}
              />
            </div>
          )}
        </fieldset>

        {/* ── Contacts ──────────────────────────────────────────── */}
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
                defaultValue={gd?.phone ?? listing?.phone ?? ""}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                Sito Web
              </label>
              <input
                name="website"
                defaultValue={gd?.website ?? listing?.website ?? ""}
                className={inputClass}
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
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              Link Menu
            </label>
            <input
              name="menuLink"
              defaultValue={listing?.menuLink || ""}
              className={inputClass}
            />
          </div>
        </fieldset>

        {/* ── Media ─────────────────────────────────────────────── */}
        <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
          <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">
            Immagini
          </legend>

          {isPremium ? (
            <>
              <ListingMediaManager
                ref={mediaRef}
                defaultCardImage={
                  gd?.photos?.[0]?.url ?? listing?.image
                }
                defaultHeroImage={listing?.heroImage || ""}
                defaultGalleryImages={
                  listing?.galleryImages as GalleryImage[] | undefined
                }
              />

              <ImageUpload
                name="mapImage"
                label="Immagine Mappa"
                defaultValue={listing?.mapImage || ""}
              />
            </>
          ) : (
            <ImageUpload
              key={`card-${basicCardKey}`}
              name="image"
              label="Immagine Card"
              required
              defaultValue={
                basicCardImage ?? gd?.photos?.[0]?.url ?? listing?.image
              }
            />
          )}
        </fieldset>

        {/* ── Premium Details ───────────────────────────────────── */}
        {isPremium && (
          <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
            <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">
              Dettagli Premium
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Etichetta Prezzo
                </label>
                <input
                  name="priceLabel"
                  defaultValue={listing?.priceLabel || ""}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Badge
                </label>
                <input
                  name="badge"
                  defaultValue={listing?.badge || ""}
                  className={inputClass}
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
                  className={inputClass}
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
                  defaultValue={
                    listing?.dishes
                      ? JSON.stringify(listing.dishes, null, 2)
                      : ""
                  }
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
                  defaultValue={
                    listing?.services
                      ? JSON.stringify(listing.services, null, 2)
                      : ""
                  }
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
                  defaultValue={
                    gd?.hours?.length
                      ? JSON.stringify(gd.hours, null, 2)
                      : listing?.hours
                        ? JSON.stringify(listing.hours, null, 2)
                        : ""
                  }
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
                  defaultValue={
                    listing?.reviews
                      ? JSON.stringify(listing.reviews, null, 2)
                      : ""
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-xs font-mono focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </fieldset>
        )}

        {/* ── Visibility ────────────────────────────────────────── */}
        <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
          <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">
            Visibilità
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                Stato *
              </label>
              <select
                name="status"
                required
                defaultValue={listing?.status || "published"}
                className={inputClass}
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
                className={inputClass}
              />
            </div>
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
    </div>
  );
}
