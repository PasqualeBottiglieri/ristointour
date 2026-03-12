"use client";

import { useState } from "react";

interface VideoEmbed {
  url: string;
  title: string;
}

function extractYouTubeId(input: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) return match[1];
  }
  return null;
}

interface VideoEmbedsInputProps {
  defaultValue?: VideoEmbed[];
}

export default function VideoEmbedsInput({ defaultValue }: VideoEmbedsInputProps) {
  const [videos, setVideos] = useState<VideoEmbed[]>(defaultValue || []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addVideo = async () => {
    setError("");
    const id = extractYouTubeId(input.trim());
    if (!id) {
      setError("URL YouTube non valido");
      return;
    }

    const embedUrl = `https://www.youtube.com/embed/${id}`;
    if (videos.some((v) => v.url === embedUrl)) {
      setError("Video già aggiunto");
      return;
    }

    setLoading(true);
    try {
      const watchUrl = `https://www.youtube.com/watch?v=${id}`;
      const res = await fetch(
        `/api/admin/youtube-oembed?url=${encodeURIComponent(watchUrl)}`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setVideos((prev) => [...prev, { url: embedUrl, title: data.title || "Video" }]);
      setInput("");
    } catch {
      setError("Impossibile recuperare il titolo del video");
    } finally {
      setLoading(false);
    }
  };

  const removeVideo = (url: string) => {
    setVideos((prev) => prev.filter((v) => v.url !== url));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addVideo();
    }
  };

  const getVideoId = (embedUrl: string) => {
    const match = embedUrl.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : "";
  };

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
        Video YouTube
      </label>

      {videos.length > 0 && (
        <div className="space-y-2 mb-3">
          {videos.map((video) => {
            const videoId = getVideoId(video.url);
            return (
              <div
                key={video.url}
                className="flex items-center gap-3 p-2 rounded-lg border border-stone-200 bg-stone-50"
              >
                <img
                  src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-28 h-16 object-cover rounded"
                />
                <span className="flex-1 text-sm font-medium text-stone-700 truncate">
                  {video.title}
                </span>
                <button
                  type="button"
                  onClick={() => removeVideo(video.url)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span className="text-lg">&times;</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
          }}
          onKeyDown={handleKeyDown}
          placeholder="Incolla link YouTube (watch, youtu.be, shorts...)"
          className="flex-1 px-3 py-2 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          disabled={loading}
        />
        <button
          type="button"
          onClick={addVideo}
          disabled={loading || !input.trim()}
          className="px-4 py-2 rounded-lg bg-emerald-900 text-white text-sm font-medium hover:bg-emerald-950 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "..." : "Aggiungi"}
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}

      <input type="hidden" name="videoEmbeds" value={JSON.stringify(videos)} />
    </div>
  );
}
