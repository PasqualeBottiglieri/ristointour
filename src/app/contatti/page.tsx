import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contatti | Ristointour",
  description:
    "Contatta Ristointour per informazioni, partnership o per inserire la tua attività nel portale.",
};

export default function ContattiPage() {
  return (
    <>
      <Header />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Contatti</h1>
            <p className="text-stone-500 font-display text-lg max-w-2xl">
              Hai una domanda, vuoi inserire la tua attività nel portale o
              proporre una collaborazione? Siamo qui per te.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-black mb-6">Parliamone</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1 font-display">
                        Email
                      </p>
                      <a
                        href="mailto:info@ristointour.it"
                        className="text-lg font-semibold hover:text-primary transition-colors"
                      >
                        info@ristointour.it
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined">call</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1 font-display">
                        Telefono
                      </p>
                      <a
                        href="tel:+390891234567"
                        className="text-lg font-semibold hover:text-primary transition-colors"
                      >
                        +39 089 123 4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined">
                        location_on
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1 font-display">
                        Territorio
                      </p>
                      <p className="text-lg font-semibold">
                        Piana del Sele, Provincia di Salerno
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partner CTA */}
              <div className="bg-emerald-900 rounded-2xl p-8">
                <h3 className="text-xl font-black text-white mb-3">
                  Vuoi inserire la tua attività?
                </h3>
                <p className="text-stone-300 font-display text-sm mb-6 leading-relaxed">
                  Ristointour offre piani di visibilità per ristoranti,
                  agriturismi, caseifici e artisti della Piana del Sele.
                  Contattaci per scoprire come entrare nel portale.
                </p>
                <a
                  href="mailto:partner@ristointour.it"
                  className="inline-block px-6 py-3 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-orange-600 transition-colors font-display"
                >
                  Diventa Partner
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-black mb-6">Scrivici un messaggio</h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1 font-display">
                      Nome
                    </label>
                    <input
                      className="w-full rounded-xl border border-stone-200 px-4 h-12 focus:border-primary focus:ring-primary font-display"
                      type="text"
                      placeholder="Il tuo nome"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1 font-display">
                      Email
                    </label>
                    <input
                      className="w-full rounded-xl border border-stone-200 px-4 h-12 focus:border-primary focus:ring-primary font-display"
                      type="email"
                      placeholder="La tua email"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1 font-display">
                    Oggetto
                  </label>
                  <select className="w-full rounded-xl border border-stone-200 px-4 h-12 focus:border-primary focus:ring-primary font-display text-stone-600">
                    <option>Informazioni generali</option>
                    <option>Inserire la mia attività</option>
                    <option>Proporre una collaborazione</option>
                    <option>Segnalare un problema</option>
                    <option>Altro</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-500 uppercase tracking-widest ml-1 font-display">
                    Messaggio
                  </label>
                  <textarea
                    className="w-full rounded-xl border border-stone-200 px-4 py-3 focus:border-primary focus:ring-primary font-display resize-none"
                    rows={6}
                    placeholder="Scrivi il tuo messaggio..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all font-display"
                >
                  Invia Messaggio
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
