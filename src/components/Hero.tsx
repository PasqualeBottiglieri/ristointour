"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { locationOptions, searchCategories } from "@/data/content";

const TOTAL_FRAMES = 240;

function getFrameSrc(index: number, portrait: boolean): string {
  const num = String(index).padStart(3, "0");
  const folder = portrait ? "risto_vert" : "risto_or";
  return `/hero/${folder}/ezgif-frame-${num}.jpg`;
}

const TEXT_BLOCKS = [
  {
    title: "Scopri i sapori della",
    accent: "Piana del Sele",
    subtitle:
      "Esplora i migliori ristoranti, agriturismi ed esperienze gastronomiche autentiche in Campania.",
  },
  {
    title: "Tradizione e gusto",
    accent: "Autentico",
    subtitle:
      "Dalla mozzarella di bufala ai vini del Cilento, ogni piatto racconta la nostra terra.",
  },
  {
    title: "Esperienze uniche",
    accent: "Nel Territorio",
    subtitle:
      "Degustazioni, tour enogastronomici e serate con artisti locali ti aspettano.",
  },
  {
    title: "Dal produttore",
    accent: "Alla Tavola",
    subtitle:
      "Caseifici, agriturismi e ristoranti dove la qualità è di casa.",
  },
  {
    title: "Inizia il tuo",
    accent: "Viaggio",
    subtitle:
      "Trova il ristorante perfetto per la tua prossima esperienza nella Piana del Sele.",
  },
];

function getActiveBlock(progress: number): number {
  const step = 1 / TEXT_BLOCKS.length;
  const index = Math.floor(progress / step);
  return Math.min(index, TEXT_BLOCKS.length - 1);
}

export default function Hero() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeBlock, setActiveBlock] = useState(0);
  const rafRef = useRef<number>(0);
  const currentFrameRef = useRef(0);
  const [isPortrait, setIsPortrait] = useState(false);

  // Detect orientation
  useEffect(() => {
    const mql = window.matchMedia("(orientation: portrait)");
    setIsPortrait(mql.matches);
    function onChange(e: MediaQueryListEvent) {
      setIsPortrait(e.matches);
    }
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  function handleSearch() {
    const selected = searchCategories.find((c) => c.label === category);
    if (!selected) return;
    const url = location
      ? `${selected.href}?location=${encodeURIComponent(location)}`
      : selected.href;
    router.push(url);
  }

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const srcW = img.naturalWidth;
    const srcH = img.naturalHeight;

    // Cover-fit (like object-cover)
    const scale = Math.max(canvas.width / srcW, canvas.height / srcH);
    const dw = srcW * scale;
    const dh = srcH * scale;
    const dx = (canvas.width - dw) / 2;
    const dy = (canvas.height - dh) / 2;

    ctx.drawImage(img, 0, 0, srcW, srcH, dx, dy, dw, dh);
  }, []);

  // Preload all frames (reloads when orientation changes)
  useEffect(() => {
    setLoaded(false);
    let cancelled = false;
    let count = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = document.createElement("img");
      img.src = getFrameSrc(i, isPortrait);
      img.onload = () => {
        if (cancelled) return;
        count++;
        if (count === TOTAL_FRAMES) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      images.push(img);
    }

    return () => {
      cancelled = true;
    };
  }, [isPortrait]);

  // Draw first frame once loaded
  useEffect(() => {
    if (loaded) drawFrame(0);
  }, [loaded, drawFrame]);

  // Scroll sync
  useEffect(() => {
    if (!loaded) return;

    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollableHeight = container.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * TOTAL_FRAMES)
        );

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }

        setActiveBlock(getActiveBlock(progress));
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaded, drawFrame]);

  // Resize handler
  useEffect(() => {
    if (!loaded) return;
    function onResize() {
      drawFrame(currentFrameRef.current);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [loaded, drawFrame]);

  const block = TEXT_BLOCKS[activeBlock];

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <section className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Canvas background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: "block" }}
        />

        {/* Fallback first frame (before all frames load) */}
        {!loaded && (
          <img
            src={getFrameSrc(1, isPortrait)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Static fallback when JS is disabled */}
        <noscript>
          <img
            src="/hero/risto_or/ezgif-frame-001.jpg"
            alt="Ristointour hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </noscript>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          {/* Animated text — key change triggers re-mount with CSS animation */}
          <div
            key={activeBlock}
            className="animate-[heroFadeIn_0.5s_ease-out_both]"
          >
            <h1 className="text-5xl md:text-7xl text-white font-black mb-6 leading-tight">
              {block.title} <br />
              <span className="text-orange-500">{block.accent}</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-100 mb-12 font-light max-w-2xl mx-auto font-display">
              {block.subtitle}
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl md:rounded-full p-3 md:p-2 shadow-2xl flex flex-col md:flex-row items-stretch md:items-center max-w-3xl mx-auto gap-2 md:gap-0">
            <div className="flex-1 px-4 md:px-6 py-2 text-left border-b md:border-b-0 md:border-r border-stone-100">
              <label className="block text-[10px] uppercase tracking-tighter text-stone-400 font-bold">
                Cosa cerchi?
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border-none focus:ring-0 p-0 text-emerald-900 bg-transparent font-display text-sm appearance-none cursor-pointer"
              >
                <option value="">Ristoranti, esperienze...</option>
                {searchCategories.map((c) => (
                  <option key={c.label} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 px-4 md:px-6 py-2 text-left">
              <label className="block text-[10px] uppercase tracking-tighter text-stone-400 font-bold">
                Dove?
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border-none focus:ring-0 p-0 text-emerald-900 bg-transparent font-display text-sm appearance-none cursor-pointer"
              >
                <option value="">Tutte le zone</option>
                {locationOptions.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSearch}
              className="bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-xl md:rounded-full font-bold transition-all shadow-lg flex items-center gap-2 justify-center font-display text-sm"
            >
              <span className="material-symbols-outlined text-sm">search</span>{" "}
              Cerca
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
