import Link from "next/link";
import { categories } from "@/data/content";

export default function CategoryGrid() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            className="group flex flex-col items-center gap-4 text-center"
            href={cat.href}
          >
            <div className="size-24 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
              <span className="material-symbols-outlined text-3xl text-emerald-900 group-hover:text-primary transition-colors">
                {cat.icon}
              </span>
            </div>
            <span className="text-xs uppercase tracking-widest font-bold font-display">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
