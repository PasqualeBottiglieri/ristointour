import type { Restaurant } from "@/data/restaurants";

export default function RestaurantBooking({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 sticky top-24">
      <h3 className="font-serif text-2xl mb-6">Prenota un tavolo</h3>
      <form className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
            Data
          </label>
          <input
            className="w-full rounded-xl border-stone-200 focus:border-primary focus:ring-primary h-12"
            type="date"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
              Ospiti
            </label>
            <select className="w-full rounded-xl border-stone-200 focus:border-primary focus:ring-primary h-12">
              <option>2 Persone</option>
              <option>3 Persone</option>
              <option>4 Persone</option>
              <option>5+ Persone</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1">
              Orario
            </label>
            <select className="w-full rounded-xl border-stone-200 focus:border-primary focus:ring-primary h-12">
              <option>19:30</option>
              <option>20:00</option>
              <option>20:30</option>
              <option>21:00</option>
            </select>
          </div>
        </div>
        <button
          className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all mt-4"
          type="submit"
        >
          Conferma Prenotazione
        </button>
      </form>

      <div className="mt-10 pt-8 border-t border-stone-100 space-y-6">
        {restaurant.contact && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-stone-600">
            <span className="material-symbols-outlined text-primary">mail</span>
            <span className="text-sm font-medium">{restaurant.contact.email}</span>
          </div>
          <div className="flex items-center gap-3 text-stone-600">
            <span className="material-symbols-outlined text-primary">
              language
            </span>
            <span className="text-sm font-medium">
              {restaurant.contact.website}
            </span>
          </div>
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
