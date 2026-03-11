import type { Listing, Service, Hours } from "@/lib/types";
import { jsonArray } from "@/lib/types";

export default function RestaurantServices({ restaurant }: { restaurant: Listing }) {
  const services = jsonArray<Service>(restaurant.services);
  const hours = jsonArray<Hours>(restaurant.hours);
  if (services.length === 0 && hours.length === 0) return null;

  return (
    <section className="border-t border-stone-100 pt-8">
      <div className="flex gap-8 border-b border-stone-100 mb-8 overflow-x-auto whitespace-nowrap">
        <button className="pb-4 border-b-2 border-primary text-primary font-bold">
          Orari &amp; Servizi
        </button>
        <button className="pb-4 border-b-2 border-transparent text-stone-400 hover:text-stone-600 transition-colors font-bold">
          Pagamenti
        </button>
        <button className="pb-4 border-b-2 border-transparent text-stone-400 hover:text-stone-600 transition-colors font-bold">
          Opzioni Dietetiche
        </button>
      </div>
      <div className="grid grid-cols-2 gap-8 text-sm">
        <ul className="space-y-4">
          {services.map((service) => (
            <li
              key={service.label}
              className="flex items-center gap-3 text-emerald-900 font-medium"
            >
              <span className="material-symbols-outlined text-sm">
                {service.icon}
              </span>{" "}
              {service.label}
            </li>
          ))}
        </ul>
        <ul className="space-y-4">
          {hours.map((h) => (
            <li key={h.day} className="flex items-center justify-between">
              <span className="text-stone-500">{h.day}</span>
              <span className="font-medium">{h.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
