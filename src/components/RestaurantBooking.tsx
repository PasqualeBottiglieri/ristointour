import type { Listing } from "@/lib/types";

export default function RestaurantBooking({ restaurant }: { restaurant: Listing }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 sticky top-24">
      <h3 className="font-serif text-2xl mb-6">Contatta Ora</h3>

      <div className="space-y-4">
        {restaurant.phone && (
          <a
            href={`tel:${restaurant.phone}`}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">call</span>
            Chiama Ora
          </a>
        )}

        {restaurant.email && (
          <a
            href={`mailto:${restaurant.email}`}
            className="w-full bg-emerald-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-950 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">mail</span>
            Scrivi Email
          </a>
        )}

        {restaurant.website && (
          <a
            href={restaurant.website}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-stone-200 text-stone-700 py-4 rounded-xl font-bold text-lg hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">language</span>
            Visita il Sito
          </a>
        )}
      </div>

      <div className="mt-10 pt-8 border-t border-stone-100 space-y-6">
        {restaurant.phone && (
          <div className="flex items-center gap-3 text-stone-600">
            <span className="material-symbols-outlined text-primary">call</span>
            <span className="text-sm font-medium">{restaurant.phone}</span>
          </div>
        )}
        {restaurant.email && (
          <div className="flex items-center gap-3 text-stone-600">
            <span className="material-symbols-outlined text-primary">mail</span>
            <span className="text-sm font-medium">{restaurant.email}</span>
          </div>
        )}
        {restaurant.website && (
          <div className="flex items-center gap-3 text-stone-600">
            <span className="material-symbols-outlined text-primary">language</span>
            <span className="text-sm font-medium">{restaurant.website}</span>
          </div>
        )}

        {restaurant.mapImage && (
          <div className="rounded-xl overflow-hidden h-40 relative group">
            <div
              className="absolute inset-0 bg-stone-200 flex items-center justify-center grayscale bg-cover bg-center"
              style={{ backgroundImage: `url('${restaurant.mapImage}')` }}
            >
              <span className="material-symbols-outlined text-primary text-4xl">
                location_on
              </span>
            </div>
            <button className="absolute bottom-2 right-2 bg-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md flex items-center gap-1 hover:bg-stone-50">
              <span className="material-symbols-outlined text-sm">directions</span>{" "}
              Indicazioni
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
