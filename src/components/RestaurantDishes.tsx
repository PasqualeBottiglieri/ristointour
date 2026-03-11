import type { Listing, SignatureDish } from "@/lib/types";
import { jsonArray } from "@/lib/types";

export default function RestaurantDishes({ restaurant }: { restaurant: Listing }) {
  const dishes = jsonArray<SignatureDish>(restaurant.dishes);
  if (dishes.length === 0) return null;

  return (
    <section className="bg-primary/5 p-8 rounded-2xl">
      <h3 className="font-serif text-3xl mb-8">Piatti Iconici</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {dishes.map((dish) => (
          <div key={dish.name} className="text-center space-y-3">
            <div className="size-16 mx-auto rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-primary/10">
              <span className="material-symbols-outlined text-3xl">
                {dish.icon}
              </span>
            </div>
            <h4 className="font-bold text-lg">{dish.name}</h4>
            <p className="text-sm text-stone-500">{dish.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
