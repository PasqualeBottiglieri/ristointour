import { experiences } from "@/data/content";

export default function Experiences() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-black mb-12 text-center">
        Esperienze Uniche
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
        {experiences.map((exp) => (
          <div
            key={exp.title}
            className={`${exp.colSpan} relative group overflow-hidden rounded-2xl`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={exp.image}
              alt={exp.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent flex flex-col justify-end p-8">
              {exp.subtitle && (
                <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 font-display">
                  {exp.subtitle}
                </span>
              )}
              <h3 className={`${exp.titleSize} font-bold text-white mb-2`}>
                {exp.title}
              </h3>
              <p className="text-stone-300 max-w-md font-display">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
