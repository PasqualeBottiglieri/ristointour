"use client";

import { useState, useRef } from "react";

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

function isLocalVideo(url: string): boolean {
  return /\.(mp4|webm|mov)$/i.test(url);
}

function getVideoId(embedUrl: string): string | null {
  const match = embedUrl.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

interface VideoEmbedsInputProps {
  defaultValue?: VideoEmbed[];
}

export default function VideoEmbedsInput({ defaultValue }: VideoEmbedsInputProps) {
  const [videos, setVideos] = useState<VideoEmbed[]>(defaultValue || []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const addYouTube = async () => {
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Errore durante il caricamento");
        return;
      }

      const title = file.name.replace(/\.[^.]+$/, "");
      setVideos((prev) => [...prev, { url: data.urls[0], title }]);
    } catch {
      setError("Errore di rete durante il caricamento");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const removeVideo = (url: string) => {
    setVideos((prev) => prev.filter((v) => v.url !== url));
  };

  const updateTitle = (url: string, title: string) => {
    setVideos((prev) =>
      prev.map((v) => (v.url === url ? { ...v, title } : v))
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addYouTube();
    }
  };

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
        Video
      </label>

      {videos.length > 0 && (
        <div className="space-y-2 mb-3">
          {videos.map((video) => {
            const local = isLocalVideo(video.url);
            const videoId = !local ? getVideoId(video.url) : null;
            return (
              <div
                key={video.url}
                className="flex items-center gap-3 p-2 rounded-lg border border-stone-200 bg-stone-50"
              >
                {local ? (
                  <video
                    src={video.url}
                    className="w-28 h-16 object-cover rounded bg-stone-900"
                    muted
                    preload="metadata"
                  />
                ) : videoId ? (
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-28 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-28 h-16 rounded bg-stone-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/60">play_circle</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={video.title}
                    onChange={(e) => updateTitle(video.url, e.target.value)}
                    className="w-full text-sm font-medium text-stone-700 bg-transparent border-b border-transparent hover:border-stone-300 focus:border-primary focus:outline-none px-0 py-0.5 transition-colors"
                  />
                  <span className="text-xs text-stone-400">
                    {local ? "File caricato" : "YouTube"}
                  </span>
                </div>
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

      {/* YouTube URL input */}
      <div className="flex gap-2 mb-2">
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
          disabled={loading || uploading}
        />
        <button
          type="button"
          onClick={addYouTube}
          disabled={loading || uploading || !input.trim()}
          className="px-4 py-2 rounded-lg bg-emerald-900 text-white text-sm font-medium hover:bg-emerald-950 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "..." : "Aggiungi"}
        </button>
      </div>

      {/* File upload */}
      <label
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-stone-300 text-sm text-stone-600 hover:border-stone-400 hover:bg-stone-50 transition-colors cursor-pointer ${
          uploading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <span className="material-symbols-outlined text-lg">upload</span>
        {uploading ? "Caricamento..." : "Carica video (MP4, WebM, MOV — max 100MB)"}
        <input
          ref={fileRef}
          type="file"
          accept="video/mp4,video/webm,video/quicktime"
          onChange={handleFileUpload}
          className="hidden"
          disabled={uploading || loading}
        />
      </label>

      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}

      <input type="hidden" name="videoEmbeds" value={JSON.stringify(videos)} />
    </div>
  );
}
