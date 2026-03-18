import Link from "next/link";
import { getPublishedListings } from "@/lib/queries";
import RestaurantCard from "./RestaurantCard";
import BusinessCardBasic from "./BusinessCardBasic";

interface BusinessListingGridProps {
  categories: string[];
  location?: string;
  emptyIcon?: string;
  emptyLabel?: string;
}

export default async function BusinessListingGrid({
  categories,
  location,
  emptyIcon = "store",
  emptyLabel = "Nessuna attività trovata",
}: BusinessListingGridProps) {
  const filtered = await getPublishedListings(categories, location);

  const premium = filtered.filter((r) => r.hasDetailPage);
  const basic = filtered.filter((r) => !r.hasDetailPage);

  return (
    <>
      {location && (
        <div className="mb-8 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-sm font-medium font-display">
            <span className="material-symbols-outlined text-base">location_on</span>
            {location}
            <Link
              href="?"
              className="ml-1 hover:text-orange-900 transition-colors"
              aria-label={`Rimuovi filtro ${location}`}
            >
              <span className="material-symbols-outlined text-base">close</span>
            </Link>
          </span>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-6xl text-stone-300 mb-4 block">
            {emptyIcon}
          </span>
          <h3 className="text-xl font-bold mb-2">{emptyLabel}</h3>
          <p className="text-stone-500 font-display">
            {location
              ? "Nessun risultato per questa zona. Prova a rimuovere il filtro."
              : "Nuove attività saranno aggiunte presto."}
          </p>
        </div>
      ) : (
        <>
          {premium.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {premium.map((r) => (
                <RestaurantCard key={r.slug} restaurant={r} />
              ))}
            </div>
          )}

          {basic.length > 0 && (
            <div className={premium.length > 0 ? "mt-16" : ""}>
              {premium.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-black mb-1">Altre Attività</h2>
                  <p className="text-stone-500 font-display text-sm">
                    Contattali direttamente per informazioni
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {basic.map((r) => (
                  <BusinessCardBasic key={r.slug} business={r} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
