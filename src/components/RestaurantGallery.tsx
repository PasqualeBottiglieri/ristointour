import type { Restaurant } from "@/data/restaurants";

export default function RestaurantGallery({ restaurant }: { restaurant: Restaurant }) {
  if (!restaurant.galleryImages || restaurant.galleryImages.length === 0) return null;

  return (
    <section>
      <h3 className="font-serif text-3xl mb-6">Galleria</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {restaurant.galleryImages.map((img, i) => {
          if (img.layout === "wide") {
            return (
              <div
                key={i}
                className="col-span-2 aspect-video rounded-xl overflow-hidden group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  src={img.src}
                  alt={img.alt}
                />
              </div>
            );
          }

          if (img.layout === "overlay") {
            return (
              <div
                key={i}
                className="aspect-video md:aspect-square rounded-xl overflow-hidden group relative"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  src={img.src}
                  alt={img.alt}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer">
                  <span className="text-white font-bold text-lg">+12 foto</span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={i}
              className="aspect-square rounded-xl overflow-hidden group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                src={img.src}
                alt={img.alt}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
