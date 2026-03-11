import Link from "next/link";
import { restaurants } from "@/data/restaurants";
import { filterByPlan } from "@/data/types";

export default function FeaturedRestaurants() {
  const premiumRestaurants = filterByPlan(restaurants, "premium")
    .filter((r) => r.showOnHomepage)
    .sort((a, b) => a.displayPriority - b.displayPriority);

  return (
    <section className="py-20 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black mb-2">
              Eccellenze Gastronomiche
            </h2>
            <p className="text-stone-500 font-display">
              I migliori tavoli selezionati dai nostri esperti
            </p>
          </div>
          <Link
            className="text-primary font-bold flex items-center gap-2 hover:underline font-display"
            href="/ristoranti"
          >
            Mostra tutti{" "}
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {premiumRestaurants.map((r) => (
            <Link
              key={r.slug}
              href={`/ristoranti/${r.slug}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
            >
              <div className="h-64 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={r.image}
                  alt={r.name}
                />
                {r.badge && (
                  <div
                    className={`absolute top-4 right-4 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${r.badgeStyle || "bg-white/90 backdrop-blur"}`}
                  >
                    {r.badge}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 text-stone-400 mb-2">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>
                  <span className="text-xs uppercase font-bold tracking-tighter font-display">
                    {r.location}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1">{r.name}</h3>
                <p className="text-stone-500 text-sm mb-6 italic font-display">
                  {r.description}
                </p>
                <span className="block w-full py-3 bg-emerald-900 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-emerald-950 transition-colors font-display text-center">
                  Vedi ristorante
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
