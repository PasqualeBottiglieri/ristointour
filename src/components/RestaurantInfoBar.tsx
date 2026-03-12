"use client";

import { useState, useRef, useEffect } from "react";
import type { Listing } from "@/lib/types";

export default function RestaurantInfoBar({
  restaurant,
}: {
  restaurant: Listing;
}) {
  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Close share menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    }
    if (shareOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [shareOpen]);

  const pageUrl =
    typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${restaurant.name} — ${restaurant.cuisine || restaurant.category}`;

  function handleCopyLink() {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Google Maps URL for directions
  const mapsUrl =
    restaurant.googleMapsUrl ||
    (restaurant.latitude && restaurant.longitude
      ? `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`
      : restaurant.address
        ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurant.address)}`
        : null);

  // Google Reviews URL
  const reviewsUrl = restaurant.googleMapsUrl
    ? restaurant.googleMapsUrl
    : null;

  // Google "write a review" URL (uses place ID)
  const likeUrl = restaurant.googlePlaceId
    ? `https://search.google.com/local/writereview?placeid=${restaurant.googlePlaceId}`
    : reviewsUrl;

  return (
    <section className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Position → Google Maps */}
      {mapsUrl ? (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined">location_on</span>
          </div>
          <div>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">
              Posizione
            </p>
            <p className="font-semibold group-hover:text-primary transition-colors">
              {restaurant.address || restaurant.location}
            </p>
          </div>
        </a>
      ) : (
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">location_on</span>
          </div>
          <div>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">
              Posizione
            </p>
            <p className="font-semibold">
              {restaurant.address || restaurant.location}
            </p>
          </div>
        </div>
      )}

      {/* Hours */}
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">schedule</span>
        </div>
        <div>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">
            Orari
          </p>
          <p className="font-semibold text-emerald-600">
            {restaurant.openTime ? `Aperto: ${restaurant.openTime}` : "—"}
          </p>
        </div>
      </div>

      {/* Reviews → Google Reviews */}
      {reviewsUrl ? (
        <a
          href={reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined fill-icon">star</span>
          </div>
          <div>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">
              Recensioni
            </p>
            <p className="font-semibold group-hover:text-primary transition-colors">
              {restaurant.rating ?? "—"}{" "}
              {restaurant.reviewCount != null && (
                <span className="text-stone-400 font-normal text-sm">
                  ({restaurant.reviewCount})
                </span>
              )}
            </p>
          </div>
        </a>
      ) : (
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <div>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">
              Prezzo
            </p>
            <p className="font-semibold text-primary">
              {restaurant.priceRange ?? "—"}{" "}
              {restaurant.priceLabel && (
                <span className="text-stone-400 font-normal ml-1">
                  {restaurant.priceLabel}
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Share + Like */}
      <div className="flex items-center justify-end gap-2 relative" ref={shareRef}>
        {/* Share button */}
        <div className="relative">
          <button
            onClick={() => setShareOpen(!shareOpen)}
            className="size-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors text-stone-600"
            title="Condividi"
          >
            <span className="material-symbols-outlined">share</span>
          </button>

          {shareOpen && (
            <div className="absolute right-0 top-12 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-50 min-w-[200px]">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-stone-50 transition-colors text-sm font-medium text-stone-700"
              >
                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + pageUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-stone-50 transition-colors text-sm font-medium text-stone-700"
              >
                <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-stone-50 transition-colors text-sm font-medium text-stone-700"
              >
                <svg className="w-5 h-5 text-stone-800" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X (Twitter)
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(pageUrl)}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-stone-50 transition-colors text-sm font-medium text-stone-700"
              >
                <span className="material-symbols-outlined text-lg text-stone-500">mail</span>
                Email
              </a>
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-stone-50 transition-colors text-sm font-medium text-stone-700"
              >
                <span className="material-symbols-outlined text-lg text-stone-500">
                  {copied ? "check" : "link"}
                </span>
                {copied ? "Copiato!" : "Copia link"}
              </button>
            </div>
          )}
        </div>

        {/* Like → Google Review */}
        {likeUrl ? (
          <a
            href={likeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="size-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-colors text-stone-600"
            title="Lascia una recensione su Google"
          >
            <span className="material-symbols-outlined">favorite</span>
          </a>
        ) : (
          <button
            disabled
            className="size-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-300 cursor-not-allowed"
          >
            <span className="material-symbols-outlined">favorite</span>
          </button>
        )}
      </div>
    </section>
  );
}
