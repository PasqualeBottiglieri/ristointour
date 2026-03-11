"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
}

export default function ImageUpload({
  name,
  label,
  required,
  defaultValue,
}: ImageUploadProps) {
  const [url, setUrl] = useState(defaultValue || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
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

      setUrl(data.urls[0]);
    } catch {
      setError("Errore di rete");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleRemove() {
    setUrl("");
    setError("");
  }

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
        {label} {required && "*"}
      </label>

      <input type="hidden" name={name} value={url} />

      {url ? (
        <div className="relative inline-block">
          <img
            src={url}
            alt={label}
            className="h-32 w-48 object-cover rounded-lg border border-stone-200"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
          >
            &times;
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <label
            className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-stone-300 text-sm text-stone-600 hover:border-stone-400 hover:bg-stone-50 transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}
          >
            <span className="material-symbols-outlined text-lg">upload</span>
            {uploading ? "Caricamento..." : "Scegli immagine"}
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}
