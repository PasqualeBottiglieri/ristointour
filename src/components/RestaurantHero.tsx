import type { Listing } from "@/lib/types";

export default function RestaurantHero({ restaurant }: { restaurant: Listing }) {
  return (
    <section className="relative h-[60vh] min-h-[450px] rounded-2xl overflow-hidden group bg-emerald-950">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={restaurant.heroImage || restaurant.image}
        alt={restaurant.name}
        className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
      <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          {restaurant.badge && (
            <span className="inline-flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm fill-icon">
                verified
              </span>{" "}
              {restaurant.badge}
            </span>
          )}
          <h2 className="font-serif text-4xl md:text-6xl text-white">
            {restaurant.name}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-white/90">
            <span className="font-semibold text-lg">{restaurant.cuisine}</span>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary fill-icon">
                star
              </span>
              <span className="font-bold">{restaurant.rating ?? "N/A"}</span>
              {restaurant.reviewCount != null && (
              <span className="text-sm opacity-80">
                ({restaurant.reviewCount} recensioni)
              </span>
              )}
            </div>
          </div>
        </div>
        {restaurant.phone ? (
          <a
            href={`tel:${restaurant.phone}`}
            className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/40 whitespace-nowrap inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined">call</span>
            Chiama Ora
          </a>
        ) : restaurant.email ? (
          <a
            href={`mailto:${restaurant.email}`}
            className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/40 whitespace-nowrap inline-flex items-center gap-2"
          >
            <span className="material-symbols-outlined">mail</span>
            Contatta Ora
          </a>
        ) : null}
      </div>
    </section>
  );
}
