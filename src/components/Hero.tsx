"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { heroImage, locationOptions, searchCategories } from "@/data/content";

export default function Hero() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  function handleSearch() {
    const selected = searchCategories.find((c) => c.label === category);
    if (!selected) return;
    const url = location
      ? `${selected.href}?location=${encodeURIComponent(location)}`
      : selected.href;
    router.push(url);
  }

  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute inset-0 transition-transform duration-1000 hover:scale-105">
        <Image
          src={heroImage}
          alt="Piana del Sele"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl text-white font-black mb-6 leading-tight">
          Scopri i sapori della <br />
          <span className="text-orange-500">Piana del Sele</span>
        </h1>
        <p className="text-lg md:text-xl text-stone-100 mb-12 font-light max-w-2xl mx-auto font-display">
          Esplora i migliori ristoranti, agriturismi ed esperienze
          gastronomiche autentiche in Campania.
        </p>

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
  );
}
