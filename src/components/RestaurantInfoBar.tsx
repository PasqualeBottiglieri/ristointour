import type { Listing } from "@/lib/types";

export default function RestaurantInfoBar({ restaurant }: { restaurant: Listing }) {
  return (
    <section className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">location_on</span>
        </div>
        <div>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">
            Posizione
          </p>
          <p className="font-semibold">{restaurant.address || restaurant.location}</p>
        </div>
      </div>
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
      <div className="flex items-center justify-end gap-2">
        <button className="size-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors">
          <span className="material-symbols-outlined text-stone-600">
            share
          </span>
        </button>
        <button className="size-10 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors">
          <span className="material-symbols-outlined text-stone-600">
            favorite
          </span>
        </button>
      </div>
    </section>
  );
}
