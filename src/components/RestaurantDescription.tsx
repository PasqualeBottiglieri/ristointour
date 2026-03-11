import type { Listing } from "@/lib/types";

export default function RestaurantDescription({ restaurant }: { restaurant: Listing }) {
  if (!restaurant.philosophy) return null;

  return (
    <article className="max-w-none">
      <h3 className="font-serif text-3xl mb-4">La Nostra Filosofia</h3>
      <p className="text-lg text-stone-500 leading-relaxed font-display">
        {restaurant.philosophy}
      </p>
    </article>
  );
}
