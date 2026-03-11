import type { Listing, Review } from "@/lib/types";
import { jsonArray } from "@/lib/types";

export default function RestaurantReviews({ restaurant }: { restaurant: Listing }) {
  const reviews = jsonArray<Review>(restaurant.reviews);
  if (reviews.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-serif text-3xl">Cosa dicono gli ospiti</h3>
        <button className="text-primary font-bold hover:underline">
          Scrivi una recensione
        </button>
      </div>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="p-6 rounded-2xl bg-white border border-stone-100 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-stone-200 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover"
                    src={review.avatar}
                    alt={review.name}
                  />
                </div>
                <div>
                  <p className="font-bold">{review.name}</p>
                  <p className="text-xs text-stone-400">{review.date}</p>
                </div>
              </div>
              <div className="flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`material-symbols-outlined text-sm ${i < review.rating ? "fill-icon" : ""}`}
                  >
                    star
                  </span>
                ))}
              </div>
            </div>
            <p className="text-stone-600">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
