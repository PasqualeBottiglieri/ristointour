import { mapImage, mapPins } from "@/data/content";

export default function MapSection() {
  return (
    <section className="w-full h-[500px] relative">
      <div className="absolute inset-0 bg-stone-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-full object-cover grayscale opacity-50"
          src={mapImage}
          alt="Map of the Gulf of Salerno"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-transparent to-stone-50 opacity-40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm text-center">
          <span className="material-symbols-outlined text-4xl text-primary mb-4 block">
            map
          </span>
          <h3 className="text-2xl font-bold mb-2">Esplora la Mappa</h3>
          <p className="text-stone-500 mb-6 font-display">
            Trova tutte le eccellenze gastronomiche intorno a te.
          </p>
          <button className="bg-emerald-900 text-white px-8 py-3 rounded-full font-bold font-display">
            Apri Mappa Interattiva
          </button>
        </div>
      </div>

      {/* Map pins (hidden on mobile, visible on larger screens) */}
      <div className="hidden md:block">
        {mapPins.map((pin) => (
          <div
            key={pin.label}
            className="absolute group cursor-pointer"
            style={{
              top: pin.top,
              left: pin.left,
              right: pin.right,
              bottom: pin.bottom,
            }}
          >
            <span
              className={`material-symbols-outlined text-primary text-4xl ${pin.animate ? "animate-bounce" : ""}`}
            >
              location_on
            </span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white p-2 rounded shadow-lg text-xs hidden group-hover:block z-10">
              <p className="font-bold text-emerald-900 font-display">
                {pin.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
