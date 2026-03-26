"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  timestamp: string;
}

const COOKIE_NAME = "cookie_consent";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 365 days in seconds

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAge};SameSite=Lax`;
}

function getStoredConsent(): CookieConsent | null {
  const raw = getCookie(COOKIE_NAME);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CookieConsent;
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();
    if (!consent) {
      setVisible(true);
    } else if (consent.analytics) {
      enableAnalytics();
    }
  }, []);

  const saveConsent = useCallback((analytics: boolean) => {
    const consent: CookieConsent = {
      necessary: true,
      analytics,
      timestamp: new Date().toISOString(),
    };
    setCookie(COOKIE_NAME, JSON.stringify(consent), COOKIE_MAX_AGE);
    if (analytics) {
      enableAnalytics();
    }
    setVisible(false);
    setShowPreferences(false);
  }, []);

  function enableAnalytics() {
    // Unblock Google Analytics if gtag is configured
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as Record<string, unknown>)["ga-disable-GA_MEASUREMENT_ID"] = false;
    }
  }

  const acceptAll = () => saveConsent(true);
  const rejectNonEssential = () => saveConsent(false);
  const savePreferences = () => saveConsent(analyticsEnabled);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestione consenso cookie"
      aria-modal="true"
      className="fixed inset-x-0 bottom-0 z-[9999] p-4"
    >
      <div className="mx-auto max-w-2xl rounded-2xl bg-emerald-950 p-6 shadow-2xl ring-1 ring-white/10">
        {!showPreferences ? (
          <>
            <h2 className="mb-2 text-base font-bold text-white">
              Questo sito utilizza i cookie
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-stone-300">
              Utilizziamo cookie tecnici necessari al funzionamento del sito e, previo tuo
              consenso, cookie analitici per migliorare la tua esperienza. Puoi scegliere
              quali accettare.{" "}
              <Link
                href="/cookie-policy"
                className="text-[#F86D16] underline hover:text-orange-400"
              >
                Cookie Policy
              </Link>
              {" · "}
              <Link
                href="/privacy-policy"
                className="text-[#F86D16] underline hover:text-orange-400"
              >
                Privacy Policy
              </Link>
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={acceptAll}
                className="rounded-lg bg-[#F86D16] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e05e0d] focus:outline-none focus:ring-2 focus:ring-[#F86D16] focus:ring-offset-2 focus:ring-offset-emerald-950"
              >
                Accetta tutti
              </button>
              <button
                onClick={rejectNonEssential}
                className="rounded-lg border border-stone-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-emerald-950"
              >
                Rifiuta non essenziali
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="rounded-lg px-5 py-2.5 text-sm font-semibold text-stone-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-emerald-950"
              >
                Personalizza
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-4 text-base font-bold text-white">
              Preferenze cookie
            </h2>
            <div className="mb-5 space-y-4">
              {/* Necessary - always on */}
              <div className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">Cookie necessari</p>
                  <p className="text-xs text-stone-400">
                    Essenziali per il funzionamento del sito. Non possono essere disattivati.
                  </p>
                </div>
                <div
                  className="relative h-6 w-11 cursor-not-allowed rounded-full bg-[#F86D16]"
                  aria-label="Cookie necessari sempre attivi"
                >
                  <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow" />
                </div>
              </div>

              {/* Analytics - toggleable */}
              <div className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">Cookie analitici</p>
                  <p className="text-xs text-stone-400">
                    Ci aiutano a capire come viene utilizzato il sito (Google Analytics).
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={analyticsEnabled}
                  onClick={() => setAnalyticsEnabled((v) => !v)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    analyticsEnabled ? "bg-[#F86D16]" : "bg-stone-600"
                  }`}
                  aria-label="Attiva o disattiva cookie analitici"
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      analyticsEnabled ? "right-0.5 translate-x-0" : "left-0.5 translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={savePreferences}
                className="rounded-lg bg-[#F86D16] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e05e0d] focus:outline-none focus:ring-2 focus:ring-[#F86D16] focus:ring-offset-2 focus:ring-offset-emerald-950"
              >
                Salva preferenze
              </button>
              <button
                onClick={() => setShowPreferences(false)}
                className="rounded-lg px-5 py-2.5 text-sm font-semibold text-stone-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-emerald-950"
              >
                Indietro
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
