import type { Listing, Service, Hours } from "@/lib/types";
import { jsonArray } from "@/lib/types";

const DAY_IT: Record<string, string> = {
  monday: "Lunedì",
  tuesday: "Martedì",
  wednesday: "Mercoledì",
  thursday: "Giovedì",
  friday: "Venerdì",
  saturday: "Sabato",
  sunday: "Domenica",
};

function translateDay(day: string): string {
  const lower = day.toLowerCase();
  return DAY_IT[lower] || day;
}

function isClosed(time: string): boolean {
  const t = time.toLowerCase().trim();
  return t === "closed" || t === "chiuso";
}

export default function RestaurantServices({
  restaurant,
}: {
  restaurant: Listing;
}) {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
        {services.length > 0 && (
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
        )}
        {hours.length > 0 && (
          <div className="bg-stone-50 rounded-xl p-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-primary">
                schedule
              </span>
              Orari di Apertura
            </h4>
            <ul className="space-y-2.5">
              {hours.map((h) => {
                const dayIt = translateDay(h.day);
                const closed = isClosed(h.time);
                return (
                  <li
                    key={h.day}
                    className="flex items-center justify-between py-1 border-b border-stone-100 last:border-0"
                  >
                    <span className="font-medium text-stone-700">{dayIt}</span>
                    <span
                      className={
                        closed
                          ? "text-red-500 font-medium"
                          : "font-semibold text-stone-900"
                      }
                    >
                      {closed ? "Chiuso" : h.time}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
