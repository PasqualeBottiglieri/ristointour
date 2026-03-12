"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { Artist, ArtistVideo } from "@/lib/types";
import { jsonArray } from "@/lib/types";

function extractVideoId(embedUrl: string): string | null {
  const match = embedUrl.match(
    /(?:youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default function ArtistVideoCarousel({ artist }: { artist: Artist }) {
  const videos = jsonArray<ArtistVideo>(artist.videoEmbeds);
  const [activeIndex, setActiveIndex] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const total = videos.length;
  if (total === 0) return null;

  const activeVideo = videos[activeIndex];

  const selectVideo = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setIframeLoaded(false);
      setActiveIndex(index);
    },
    [activeIndex]
  );

  // Scroll selected thumbnail into view
  useEffect(() => {
    if (!scrollRef.current || total <= 1) return;
    const el = scrollRef.current.children[activeIndex] as HTMLElement;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeIndex, total]);

  // Single video — no carousel, just premium presentation
  if (total === 1) {
    return (
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#f86d16] mb-2 font-display">
              Live
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-stone-900">
              Video
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg shadow-stone-900/5 bg-stone-900">
              <iframe
                src={activeVideo.url}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            {activeVideo.title && (
              <p className="mt-4 text-center text-stone-600 font-display font-medium">
                {activeVideo.title}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#f86d16] mb-2 font-display">
              Live
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-stone-900">
              Video
            </h2>
          </div>
          <span className="text-sm text-stone-400 font-display tabular-nums">
            {activeIndex + 1} / {total}
          </span>
        </div>

        {/* Featured video */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg shadow-stone-900/5 bg-stone-900 relative">
            {/* Loading state */}
            {!iframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-900">
                <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
              </div>
            )}
            <iframe
              key={activeVideo.url}
              src={activeVideo.url}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setIframeLoaded(true)}
              className={`w-full h-full transition-opacity duration-300 ${iframeLoaded ? "opacity-100" : "opacity-0"}`}
            />
          </div>
          {activeVideo.title && (
            <p className="mt-4 text-center text-stone-600 font-display font-medium text-lg truncate max-w-2xl mx-auto" title={activeVideo.title}>
              {activeVideo.title}
            </p>
          )}
        </div>

        {/* Thumbnail selector */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar max-w-4xl mx-auto"
          role="tablist"
          aria-label="Seleziona video"
        >
          {videos.map((video, i) => {
            const videoId = extractVideoId(video.url);
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                onClick={() => selectVideo(i)}
                role="tab"
                aria-selected={isActive}
                aria-label={`${video.title || `Video ${i + 1}`}`}
                className={`flex-shrink-0 w-40 md:w-48 group relative rounded-xl overflow-hidden transition-all duration-300 ${
                  isActive
                    ? "ring-2 ring-[#f86d16] ring-offset-2 opacity-100"
                    : "opacity-60 hover:opacity-90"
                }`}
              >
                <div className="w-full aspect-video bg-stone-200 relative">
                  {videoId ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-stone-800">
                      <span className="material-symbols-outlined text-3xl text-white/60">
                        play_circle
                      </span>
                    </div>
                  )}
                  {/* Play icon overlay */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isActive ? "opacity-0" : "opacity-100 group-hover:opacity-100"}`}>
                    <div className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                </div>
                {video.title && (
                  <p className={`w-full px-2 py-1.5 text-xs font-medium truncate text-left transition-colors ${isActive ? "text-stone-900" : "text-stone-500"}`}>
                    {video.title}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
