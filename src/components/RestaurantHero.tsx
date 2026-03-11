import type { Restaurant } from "@/data/restaurants";

export default function RestaurantHero({ restaurant }: { restaurant: Restaurant }) {
  return (
    <section className="relative h-[60vh] min-h-[450px] rounded-2xl overflow-hidden group">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url('${restaurant.heroImage || restaurant.image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
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
        <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/40 whitespace-nowrap">
          Prenota Ora
        </button>
      </div>
    </section>
  );
}
