import type { Artist, ArtistSocial } from "@/lib/types";
import { jsonArray } from "@/lib/types";

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
  const socials = jsonArray<ArtistSocial>(artist.socialLinks);
  if (socials.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#f86d16] mb-2 font-display">
          Connettiti
        </p>
        <h2 className="text-3xl md:text-4xl font-black mb-10 text-stone-900">
          Segui {artist.name}
        </h2>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 md:px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 font-display font-bold text-sm border border-stone-100"
            >
              <span className="material-symbols-outlined text-lg text-stone-500">
                {platformIcons[social.platform] || "link"}
              </span>
              {platformLabels[social.platform] || social.platform}
            </a>
          ))}
        </div>
        <a
          href="/contatti"
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-900 text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-emerald-950 transition-colors font-display"
        >
          <span className="material-symbols-outlined text-base">mail</span>
          Contatta per un Evento
        </a>
      </div>
    </section>
  );
}
