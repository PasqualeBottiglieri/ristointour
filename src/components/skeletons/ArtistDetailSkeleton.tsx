import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ArtistDetailSkeleton() {
  return (
    <>
      <Header />
      <main aria-busy="true">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-stone-200 rounded animate-pulse" />
            <div className="h-4 w-4 bg-stone-200 rounded animate-pulse" />
            <div className="h-4 w-16 bg-stone-200 rounded animate-pulse" />
            <div className="h-4 w-4 bg-stone-200 rounded animate-pulse" />
            <div className="h-4 w-28 bg-stone-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Hero */}
        <section className="relative bg-emerald-950 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white/10 animate-pulse shrink-0" />
              <div className="text-center md:text-left flex-1">
                <div className="h-10 w-64 bg-white/10 rounded animate-pulse mb-4 mx-auto md:mx-0" />
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  <div className="h-7 w-20 bg-white/10 rounded-full animate-pulse" />
                  <div className="h-7 w-24 bg-white/10 rounded-full animate-pulse" />
                </div>
                <div className="h-5 w-40 bg-white/10 rounded animate-pulse mx-auto md:mx-0" />
              </div>
            </div>
          </div>
        </section>

        {/* Bio */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 space-y-3">
            <div className="h-7 w-24 bg-stone-200 rounded animate-pulse mb-6" />
            <div className="h-4 w-full bg-stone-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-stone-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-stone-200 rounded animate-pulse" />
          </div>
        </section>

        {/* Gallery */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-7 w-24 bg-stone-200 rounded animate-pulse mb-6" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square bg-stone-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
