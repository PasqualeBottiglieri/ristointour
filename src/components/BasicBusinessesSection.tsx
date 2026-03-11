import { restaurants } from "@/data/restaurants";
import { filterByPlan } from "@/data/types";
import BusinessCardBasic from "./BusinessCardBasic";

export default function BasicBusinessesSection() {
  const basicBusinesses = filterByPlan(restaurants, "basic")
    .filter((r) => r.showOnHomepage)
    .sort((a, b) => a.displayPriority - b.displayPriority);

  if (basicBusinesses.length === 0) return null;

  return (
    <section className="py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black mb-2">
              Altre Attività del Territorio
            </h2>
            <p className="text-stone-500 font-display">
              Scopri le attività locali nella Piana del Sele
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {basicBusinesses.map((business) => (
            <BusinessCardBasic key={business.slug} business={business} />
          ))}
        </div>
      </div>
    </section>
  );
}
