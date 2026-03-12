"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { Listing, GalleryImage } from "@/lib/types";
import { jsonArray } from "@/lib/types";

export default function RestaurantGallery({ restaurant }: { restaurant: Listing }) {
  const images = jsonArray<GalleryImage>(restaurant.galleryImages);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = images.length;
  if (total === 0) return null;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(Math.max(0, Math.min(index, total - 1)));
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning, total]
  );

  const prev = useCallback(() => goTo(current - 1), [goTo, current]);
  const next = useCallback(() => goTo(current + 1), [goTo, current]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    el.addEventListener("keydown", handleKey);
    return () => el.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (touchDeltaX.current > 50) prev();
    else if (touchDeltaX.current < -50) next();
  };

  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <h3 className="font-serif text-3xl">Galleria</h3>
        {total > 1 && (
          <span className="text-sm text-stone-400 font-display tabular-nums">
            {current + 1} / {total}
          </span>
        )}
      </div>

      <div
        ref={containerRef}
        className="relative group rounded-2xl overflow-hidden shadow-lg shadow-stone-900/5 bg-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        tabIndex={0}
        role="region"
        aria-label="Galleria immagini"
        aria-roledescription="carousel"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="aspect-[3/2] md:aspect-[16/9] relative overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500 ease-out will-change-transform"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="w-full h-full flex-shrink-0"
                role="group"
                aria-roledescription="slide"
                aria-label={`Immagine ${i + 1} di ${total}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt || `${restaurant.name} - foto ${i + 1}`}
                  className="w-full h-full object-contain"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          {total > 1 && (
            <>
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          )}

          {total > 1 && (
            <>
              <button
                onClick={prev}
                disabled={current === 0}
                aria-label="Immagine precedente"
                className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-stone-700 hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={next}
                disabled={current === total - 1}
                aria-label="Immagine successiva"
                className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-stone-700 hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {total > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 hide-scrollbar" role="tablist" aria-label="Miniature galleria">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={current === i}
              aria-label={`Vai a immagine ${i + 1}`}
              className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-stone-200 transition-all duration-300 ${
                current === i
                  ? "ring-2 ring-primary ring-offset-2 opacity-100 scale-100"
                  : "opacity-50 hover:opacity-80 scale-95"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt=""
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
