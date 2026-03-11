import Link from "next/link";
import type { Restaurant } from "@/data/restaurants";

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link
      href={`/ristoranti/${restaurant.slug}`}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
    >
      <div className="h-64 overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={restaurant.image}
          alt={restaurant.name}
        />
        {restaurant.badge && (
          <div
            className={`absolute top-4 right-4 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${restaurant.badgeStyle || "bg-white/90 backdrop-blur"}`}
          >
            {restaurant.badge}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1 text-stone-400 mb-2">
          <span className="material-symbols-outlined text-sm">location_on</span>
          <span className="text-xs uppercase font-bold tracking-tighter font-display">
            {restaurant.location}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-1">{restaurant.name}</h3>
        <p className="text-stone-500 text-sm mb-6 italic font-display">
          {restaurant.description}
        </p>
        <span className="block w-full py-3 bg-emerald-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-emerald-950 transition-colors font-display text-center">
          Scopri di più
        </span>
      </div>
    </Link>
  );
}
