import type { Artist } from "@/data/artists";

export default function ArtistGallery({ artist }: { artist: Artist }) {
  if (!artist.galleryImages || artist.galleryImages.length === 0) return null;

  return (
    <section className="py-16 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-black mb-8">Galleria</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artist.galleryImages.map((img, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-xl overflow-hidden group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`${artist.name} - foto ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
