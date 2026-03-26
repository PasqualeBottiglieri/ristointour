"use client";

import { useActionState } from "react";
import Link from "next/link";
import { sendContactEmail } from "./actions";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, {
    success: false,
    error: null,
  });

  if (state.success) {
    return (
      <div className="text-center py-16">
        <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-emerald-600 text-3xl">
            check_circle
          </span>
        </div>
        <h3 className="text-2xl font-black mb-3">Messaggio inviato!</h3>
        <p className="text-stone-500 font-display max-w-md mx-auto">
          Grazie per averci contattato. Ti risponderemo il prima possibile.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none h-0 w-0"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label
            htmlFor="contact-name"
            className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1 font-display"
          >
            Nome *
          </label>
          <input
            id="contact-name"
            name="name"
            className="w-full rounded-xl border border-stone-200 px-4 h-12 focus:border-primary focus:ring-primary font-display"
            type="text"
            placeholder="Il tuo nome"
            required
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="contact-email"
            className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1 font-display"
          >
            Email *
          </label>
          <input
            id="contact-email"
            name="email"
            className="w-full rounded-xl border border-stone-200 px-4 h-12 focus:border-primary focus:ring-primary font-display"
            type="email"
            placeholder="La tua email"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label
            htmlFor="contact-phone"
            className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1 font-display"
          >
            Telefono
          </label>
          <input
            id="contact-phone"
            name="phone"
            className="w-full rounded-xl border border-stone-200 px-4 h-12 focus:border-primary focus:ring-primary font-display"
            type="tel"
            placeholder="Il tuo numero (opzionale)"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="contact-subject"
            className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1 font-display"
          >
            Oggetto
          </label>
          <select
            id="contact-subject"
            name="subject"
            className="w-full rounded-xl border border-stone-200 px-4 h-12 focus:border-primary focus:ring-primary font-display text-stone-600"
          >
            <option>Informazioni generali</option>
            <option>Inserire la mia attività</option>
            <option>Proporre una collaborazione</option>
            <option>Segnalare un problema</option>
            <option>Altro</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="contact-message"
          className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1 font-display"
        >
          Messaggio *
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="w-full rounded-xl border border-stone-200 px-4 py-3 focus:border-primary focus:ring-primary font-display resize-none"
          rows={6}
          placeholder="Scrivi il tuo messaggio..."
          required
        />
      </div>

      {/* Privacy consent checkbox */}
      <div className="space-y-1">
        <div className="flex items-start gap-3">
          <input
            id="contact-privacy"
            name="privacy"
            type="checkbox"
            value="accepted"
            required
            aria-required="true"
            className="mt-1 size-4 shrink-0 rounded border-stone-300 text-primary focus:ring-primary accent-[#F86D16]"
          />
          <label htmlFor="contact-privacy" className="text-sm text-stone-600 font-display leading-snug">
            Ho letto e accetto la{" "}
            <Link
              href="/privacy-policy"
              target="_blank"
              className="text-[#F86D16] underline hover:text-[#e05e0d]"
            >
              Privacy Policy
            </Link>{" "}
            *
          </label>
        </div>
        {state.error === "Devi accettare la Privacy Policy per procedere." && (
          <p className="text-red-600 text-xs font-display ml-7">
            {state.error}
          </p>
        )}
      </div>

      {state.error && state.error !== "Devi accettare la Privacy Policy per procedere." && (
        <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-display">
          <span className="material-symbols-outlined text-red-500 shrink-0">
            error
          </span>
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all font-display disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? "Invio in corso..." : "Invia Messaggio"}
      </button>
    </form>
  );
}
