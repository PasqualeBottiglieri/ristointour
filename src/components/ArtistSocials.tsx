import type { Artist } from "@/data/artists";

const platformLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  spotify: "Spotify",
  tiktok: "TikTok",
  website: "Sito Web",
};

const platformIcons: Record<string, string> = {
  instagram: "photo_camera",
  facebook: "group",
  youtube: "play_circle",
  spotify: "headphones",
  tiktok: "music_note",
  website: "language",
};

export default function ArtistSocials({ artist }: { artist: Artist }) {
  if (!artist.socials || artist.socials.length === 0) return null;

  return (
    <section className="py-16 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-black mb-8">Segui {artist.name}</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {artist.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all hover:-translate-y-1 font-display font-bold text-sm"
            >
              <span className="material-symbols-outlined text-lg">
                {platformIcons[social.platform] || "link"}
              </span>
              {platformLabels[social.platform] || social.platform}
            </a>
          ))}
        </div>
        <a
          href="#"
          className="inline-block px-8 py-4 bg-emerald-900 text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-emerald-950 transition-colors font-display"
        >
          Contatta per un Evento
        </a>
      </div>
    </section>
  );
}
