"use client";

import type { Listing } from "@/lib/types";

export default function MobileBookingButton({ restaurant }: { restaurant: Listing }) {
  if (!restaurant.phone) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-stone-100 z-50">
      <a
        href={`tel:${restaurant.phone}`}
        className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined">call</span>
        Chiama Ora
      </a>
    </div>
  );
}
