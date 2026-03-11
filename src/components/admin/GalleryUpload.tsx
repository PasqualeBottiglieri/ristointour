"use client";

import { useState, useRef } from "react";

interface GalleryImage {
  src: string;
  alt: string;
  layout?: string;
}

interface GalleryUploadProps {
  name: string;
  defaultValue?: GalleryImage[];
  showLayout?: boolean;
}

const LAYOUT_OPTIONS = ["square", "wide", "tall"];

export default function GalleryUpload({
  name,
  defaultValue,
  showLayout,
}: GalleryUploadProps) {
  const [images, setImages] = useState<GalleryImage[]>(defaultValue || []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError("");
    setUploading(true);

    const formData = new FormData();
    for (const file of Array.from(files)) {
      formData.append("files", file);
    }

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Errore durante il caricamento");
        return;
      }

      const newImages: GalleryImage[] = data.urls.map((url: string) => ({
        src: url,
        alt: "",
        ...(showLayout ? { layout: "square" } : {}),
      }));

      setImages((prev) => [...prev, ...newImages]);
    } catch {
      setError("Errore di rete");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleRemove(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function handleAltChange(index: number, alt: string) {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, alt } : img))
    );
  }

  function handleLayoutChange(index: number, layout: string) {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, layout } : img))
    );
  }

  const serialized = images.length > 0 ? JSON.stringify(images) : "";

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
        Galleria Immagini
      </label>

      <input type="hidden" name={name} value={serialized} />

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          {images.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="relative bg-stone-50 rounded-lg border border-stone-200 overflow-hidden"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-28 object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              >
                &times;
              </button>
              <div className="p-2 space-y-1">
                <input
                  type="text"
                  value={img.alt}
                  onChange={(e) => handleAltChange(i, e.target.value)}
                  placeholder="Testo alternativo"
                  className="w-full px-2 py-1 rounded border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-primary"
                />
                {showLayout && (
                  <select
                    value={img.layout || "square"}
                    onChange={(e) => handleLayoutChange(i, e.target.value)}
                    className="w-full px-2 py-1 rounded border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    {LAYOUT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <label
        className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-stone-300 text-sm text-stone-600 hover:border-stone-400 hover:bg-stone-50 transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}
      >
        <span className="material-symbols-outlined text-lg">add_photo_alternate</span>
        {uploading ? "Caricamento..." : "Aggiungi immagini"}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          onChange={handleUpload}
          className="hidden"
          disabled={uploading}
        />
      </label>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
