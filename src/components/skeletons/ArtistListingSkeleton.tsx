import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CardSkeleton from "./CardSkeleton";

export default function ArtistListingSkeleton() {
  return (
    <>
      <Header />
      <main aria-busy="true">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            {/* Title */}
            <div className="text-center mb-12">
              <div className="h-10 w-72 bg-stone-200 rounded animate-pulse mx-auto mb-4" />
              <div className="h-5 w-96 max-w-full bg-stone-200 rounded animate-pulse mx-auto" />
            </div>

            {/* Filter bar */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="h-10 w-40 bg-stone-200 rounded-lg animate-pulse" />
              <div className="h-10 w-40 bg-stone-200 rounded-lg animate-pulse" />
              <div className="h-10 w-40 bg-stone-200 rounded-lg animate-pulse" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
