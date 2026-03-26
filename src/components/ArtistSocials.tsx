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
  const hasContact = artist.phone || artist.website;

  if (socials.length === 0 && !hasContact) return null;

  return (
    <section className="py-20 md:py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#f86d16] mb-2 font-display">
          Connettiti
        </p>
        <h2 className="text-3xl md:text-4xl font-black mb-10 text-stone-900">
          Segui {artist.name}
        </h2>

        {/* Direct contact buttons */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
          {artist.phone && (
            <a
              href={`tel:${artist.phone}`}
              className="flex items-center gap-2 px-5 md:px-6 py-3 bg-primary text-white rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 font-display font-bold text-sm"
            >
              <span className="material-symbols-outlined text-lg">call</span>
              {artist.phone}
            </a>
          )}
          {artist.website && (
            <a
              href={artist.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 md:px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 font-display font-bold text-sm border border-stone-100"
            >
              <span className="material-symbols-outlined text-lg text-stone-500">language</span>
              Sito Web
            </a>
          )}
          <a
            href={`https://wa.me/393385940445?text=${encodeURIComponent(`Ciao! Vorrei informazioni su ${artist.name} trovato su ristointour.it`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 md:px-6 py-3 bg-[#25D366] text-white rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 font-display font-bold text-sm"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Scrivici su WhatsApp
          </a>
        </div>

        {/* Social links */}
        {socials.length > 0 && (
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
        )}

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
