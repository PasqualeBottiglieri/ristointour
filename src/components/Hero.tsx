import { heroImage, locationOptions } from "@/data/content";

export default function Hero() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: `url('${heroImage}')` }}
      />
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl text-white font-black mb-6 leading-tight">
          Scopri i sapori della <br />
          <span className="text-orange-500">Piana del Sele</span>
        </h1>
        <p className="text-lg md:text-xl text-stone-100 mb-12 font-light max-w-2xl mx-auto font-display">
          Esplora i migliori ristoranti, agriturismi ed esperienze
          gastronomiche autentiche in Campania.
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-full p-2 shadow-2xl flex flex-col md:flex-row items-center max-w-3xl mx-auto">
          <div className="flex-1 px-6 py-2 text-left border-b md:border-b-0 md:border-r border-stone-100 w-full md:w-auto">
            <label className="block text-[10px] uppercase tracking-tighter text-stone-400 font-bold">
              Cosa cerchi?
            </label>
            {/* Text input on desktop, hidden on mobile */}
            <input
              className="hidden md:block w-full border-none focus:ring-0 p-0 text-emerald-900 placeholder:text-stone-300 bg-transparent font-display text-sm"
              placeholder="Ristoranti, esperienze..."
              type="text"
            />
            {/* Select on mobile */}
            <select className="md:hidden w-full border-none focus:ring-0 p-0 text-emerald-900 bg-transparent font-display text-sm">
              <option value="">Ristoranti, esperienze...</option>
              <option>Ristoranti</option>
              <option>Pizzerie</option>
              <option>Agriturismi</option>
              <option>Caseifici</option>
              <option>Cantine</option>
              <option>Pasticcerie</option>
            </select>
          </div>
          <div className="flex-1 px-6 py-2 text-left w-full md:w-auto">
            <label className="block text-[10px] uppercase tracking-tighter text-stone-400 font-bold">
              Dove?
            </label>
            {/* Text input on desktop */}
            <input
              className="hidden md:block w-full border-none focus:ring-0 p-0 text-emerald-900 placeholder:text-stone-300 bg-transparent font-display text-sm"
              placeholder="Paestum, Eboli, Salerno"
              type="text"
            />
            {/* Select on mobile */}
            <select className="md:hidden w-full border-none focus:ring-0 p-0 text-emerald-900 bg-transparent font-display text-sm">
              {locationOptions.map((loc) => (
                <option key={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <button className="bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg flex items-center gap-2 w-full md:w-auto justify-center font-display text-sm">
            <span className="material-symbols-outlined text-sm">search</span>{" "}
            Cerca
          </button>
        </div>
      </div>
    </section>
  );
}
