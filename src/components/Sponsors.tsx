import { sponsors } from "@/data/content";

export default function Sponsors() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-12 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
        {sponsors.map((s) => (
          <div key={s} className="text-2xl font-serif italic text-stone-800">
            {s}
          </div>
        ))}
      </div>
    </section>
  );
}
