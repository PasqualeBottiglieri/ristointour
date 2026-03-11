import { territories } from "@/data/content";

export default function Territories() {
  return (
    <section className="py-20 bg-stone-50 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-black mb-12">I Nostri Territori</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {territories.map((t) => (
            <a
              key={t.name}
              className="group relative h-96 rounded-2xl overflow-hidden"
              href="#"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                src={t.image}
                alt={t.name}
              />
              <div className="absolute inset-0 bg-emerald-900/40 group-hover:bg-emerald-900/20 transition-colors" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-black text-white">{t.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
