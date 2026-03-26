import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RestaurantDetailSkeleton() {
  return (
    <>
      <Header />
      <main aria-busy="true">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-stone-200 rounded animate-pulse" />
            <div className="h-4 w-4 bg-stone-200 rounded animate-pulse" />
            <div className="h-4 w-20 bg-stone-200 rounded animate-pulse" />
            <div className="h-4 w-4 bg-stone-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-stone-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Hero */}
        <div className="relative h-[60vh] bg-stone-200 animate-pulse" />

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main content */}
            <div className="lg:col-span-8">
              {/* Info bar */}
              <div className="flex flex-wrap gap-4 mb-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-10 w-28 bg-stone-200 rounded-lg animate-pulse" />
                ))}
              </div>

              {/* Description */}
              <div className="space-y-3 mb-12">
                <div className="h-7 w-48 bg-stone-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-stone-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-stone-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-stone-200 rounded animate-pulse" />
              </div>

              {/* Gallery */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-stone-200 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                <div className="h-6 w-32 bg-stone-200 rounded animate-pulse" />
                <div className="h-10 w-full bg-stone-200 rounded-lg animate-pulse" />
                <div className="h-10 w-full bg-stone-200 rounded-lg animate-pulse" />
                <div className="h-12 w-full bg-emerald-900/20 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
