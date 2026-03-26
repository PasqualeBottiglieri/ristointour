import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PartnerListingSkeleton() {
  return (
    <>
      <Header />
      <main aria-busy="true">
        {/* Dark hero */}
        <section className="bg-emerald-950 py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="h-10 w-64 bg-white/10 rounded animate-pulse mx-auto mb-4" />
            <div className="h-5 w-96 max-w-full bg-white/10 rounded animate-pulse mx-auto" />
          </div>
        </section>

        {/* Featured */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-7 w-40 bg-stone-200 rounded animate-pulse mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden shadow-sm p-6 flex items-center gap-6"
                >
                  <div className="w-20 h-20 rounded-xl bg-stone-200 animate-pulse shrink-0" />
                  <div className="flex-1">
                    <div className="h-5 w-40 bg-stone-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-full bg-stone-200 rounded animate-pulse mb-1" />
                    <div className="h-4 w-2/3 bg-stone-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grouped compact cards */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4">
            {Array.from({ length: 3 }).map((_, g) => (
              <div key={g} className="mb-12">
                <div className="h-6 w-36 bg-stone-200 rounded animate-pulse mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-4 flex items-center gap-4 border border-stone-200"
                    >
                      <div className="w-14 h-14 rounded-lg bg-stone-200 animate-pulse shrink-0" />
                      <div className="flex-1">
                        <div className="h-4 w-28 bg-stone-200 rounded animate-pulse mb-2" />
                        <div className="h-3 w-20 bg-stone-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
