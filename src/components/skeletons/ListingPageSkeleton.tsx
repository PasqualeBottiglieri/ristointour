import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CardSkeleton from "./CardSkeleton";
import CardBasicSkeleton from "./CardBasicSkeleton";

export default function ListingPageSkeleton() {
  return (
    <>
      <Header />
      <main aria-busy="true">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            {/* Title */}
            <div className="text-center mb-16">
              <div className="h-10 w-80 bg-stone-200 rounded animate-pulse mx-auto mb-4" />
              <div className="h-5 w-96 max-w-full bg-stone-200 rounded animate-pulse mx-auto" />
            </div>

            {/* Premium grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>

            {/* Basic section */}
            <div>
              <div className="h-8 w-48 bg-stone-200 rounded animate-pulse mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CardBasicSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
