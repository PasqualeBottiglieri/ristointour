import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PartnerDetailSkeleton() {
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

        {/* Dark hero */}
        <section className="relative bg-emerald-950 py-20">
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white/10 animate-pulse shrink-0" />
              <div className="flex-1">
                <div className="h-9 w-56 bg-white/10 rounded animate-pulse mb-3" />
                <div className="h-5 w-full max-w-md bg-white/10 rounded animate-pulse mb-2" />
                <div className="h-5 w-2/3 max-w-sm bg-white/10 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 space-y-4">
            <div className="h-7 w-48 bg-stone-200 rounded animate-pulse mb-6" />
            <div className="h-4 w-full bg-stone-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-stone-200 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-stone-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-stone-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-stone-200 rounded animate-pulse" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
