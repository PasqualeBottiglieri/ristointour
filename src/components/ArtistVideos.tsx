import type { Artist } from "@/data/artists";

export default function ArtistVideos({ artist }: { artist: Artist }) {
  if (!artist.videos || artist.videos.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-black mb-8">Video</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {artist.videos.map((video, i) => (
            <div key={i}>
              <div className="aspect-video rounded-xl overflow-hidden bg-stone-200">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <h3 className="mt-3 font-bold font-display">{video.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
