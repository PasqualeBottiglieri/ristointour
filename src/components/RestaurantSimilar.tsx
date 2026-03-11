import Link from "next/link";
import { restaurants, type Restaurant } from "@/data/restaurants";

export default function RestaurantSimilar({ current }: { current: Restaurant }) {
  const similar = restaurants.filter((r) => r.slug !== current.slug && r.hasDetailPage);

  if (similar.length === 0) return null;

  return (
    <section className="py-12">
      <h3 className="font-serif text-3xl mb-8">
        Altri ristoranti nei dintorni
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similar.map((r) => (
          <Link
            key={r.slug}
            href={`/ristoranti/${r.slug}`}
            className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="h-48 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                src={r.image}
                alt={r.name}
              />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold">{r.name}</h4>
                {r.rating != null && (
                <span className="flex items-center gap-1 text-primary text-sm font-bold">
                  <span className="material-symbols-outlined fill-icon text-xs">
                    star
                  </span>{" "}
                  {r.rating}
                </span>
                )}
              </div>
              <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold">
                {r.cuisine}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
