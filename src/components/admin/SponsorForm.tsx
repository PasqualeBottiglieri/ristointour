"use client";

import { useState } from "react";
import type { Sponsor } from "@/generated/prisma/client";
import ImageUpload from "./ImageUpload";

const SPONSOR_TYPES = [
  { value: "main_sponsor", label: "Main Sponsor" },
  { value: "media_partner", label: "Media Partner" },
  { value: "technical_partner", label: "Partner Tecnico" },
  { value: "food_partner", label: "Partner Food" },
  { value: "territorial_partner", label: "Partner Territoriale" },
  { value: "partner", label: "Partner" },
];

interface SponsorFormProps {
  sponsor?: Sponsor;
  action: (formData: FormData) => Promise<void>;
}

export default function SponsorForm({ sponsor, action }: SponsorFormProps) {
  const isEdit = !!sponsor;
  const [hasDetailPage, setHasDetailPage] = useState(sponsor?.hasDetailPage ?? false);

  return (
    <form action={action} className="space-y-8 max-w-4xl">
      {/* Info Base */}
      <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">
          Informazioni Base
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Nome *</label>
            <input name="name" required defaultValue={sponsor?.name} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Tipo Sponsor *</label>
            <select name="sponsorType" required defaultValue={sponsor?.sponsorType || "partner"} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary">
              {SPONSOR_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Descrizione Breve *</label>
          <input name="shortDescription" required defaultValue={sponsor?.shortDescription} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Categoria</label>
          <input name="category" defaultValue={sponsor?.category || ""} placeholder="es. Enogastronomia, Tecnologia..." className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
        </div>
        {hasDetailPage && (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Descrizione Completa</label>
            <textarea name="fullDescription" rows={6} defaultValue={sponsor?.fullDescription || ""} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
        )}
      </fieldset>

      {/* Branding */}
      <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">
          Branding
        </legend>
        <ImageUpload
          name="logo"
          label="Logo *"
          required
          defaultValue={sponsor?.logo}
        />
        {hasDetailPage && (
          <ImageUpload
            name="coverImage"
            label="Cover Image"
            defaultValue={sponsor?.coverImage || undefined}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Badge</label>
            <input name="badge" defaultValue={sponsor?.badge || ""} placeholder="es. Main Sponsor" className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
        </div>
      </fieldset>

      {/* Contatti & Link */}
      <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">
          Contatti & Link
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Sito Web</label>
            <input name="website" defaultValue={sponsor?.website || ""} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Email</label>
            <input name="email" type="email" defaultValue={sponsor?.email || ""} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Telefono</label>
            <input name="phone" defaultValue={sponsor?.phone || ""} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">CTA Label</label>
            <input name="ctaLabel" defaultValue={sponsor?.ctaLabel || ""} placeholder="es. Visita il sito" className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">CTA URL</label>
            <input name="ctaUrl" defaultValue={sponsor?.ctaUrl || ""} placeholder="https://..." className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
        </div>
      </fieldset>

      {/* Visibilità */}
      <fieldset className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
        <legend className="text-sm font-bold uppercase tracking-widest text-stone-500 px-2">
          Visibilità
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Stato *</label>
            <select name="status" required defaultValue={sponsor?.status || "draft"} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary">
              <option value="draft">Bozza</option>
              <option value="published">Pubblicato</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">Priorità</label>
            <input name="displayPriority" type="number" defaultValue={sponsor?.displayPriority ?? 100} className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary" />
          </div>
        </div>
        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="featured" defaultChecked={sponsor?.featured ?? false} className="rounded border-stone-300 text-primary focus:ring-primary" />
            <span className="text-sm font-medium text-stone-700">In Evidenza</span>
            <span className="text-xs text-stone-400">— appare nella sezione Featured della pagina /partner</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="showOnHomepage" defaultChecked={sponsor?.showOnHomepage ?? true} className="rounded border-stone-300 text-primary focus:ring-primary" />
            <span className="text-sm font-medium text-stone-700">Mostra in Homepage</span>
            <span className="text-xs text-stone-400">— appare nella strip dei partner</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="hasDetailPage"
              checked={hasDetailPage}
              onChange={(e) => setHasDetailPage(e.target.checked)}
              className="rounded border-stone-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium text-stone-700">Pagina Dettaglio</span>
            <span className="text-xs text-stone-400">— abilita /partner/[slug] con cover image e descrizione completa</span>
          </label>
        </div>
      </fieldset>

      <div className="flex gap-4">
        <button type="submit" className="bg-emerald-900 text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-emerald-950 transition-colors">
          {isEdit ? "Salva Modifiche" : "Crea Sponsor"}
        </button>
        <a href="/admin/sponsors" className="px-8 py-3 rounded-lg font-bold text-sm border border-stone-300 hover:bg-stone-50 transition-colors">
          Annulla
        </a>
      </div>
    </form>
  );
}
