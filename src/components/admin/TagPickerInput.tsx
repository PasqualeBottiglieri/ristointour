"use client";

import { useState } from "react";

interface TagPickerInputProps {
  name: string;
  label: string;
  suggestions?: string[];
  defaultValue?: string[];
  placeholder?: string;
}

export default function TagPickerInput({
  name,
  label,
  suggestions = [],
  defaultValue,
  placeholder = "Aggiungi...",
}: TagPickerInputProps) {
  const [tags, setTags] = useState<string[]>(defaultValue || []);
  const [input, setInput] = useState("");

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setInput("");
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input);
    }
  };

  const availableSuggestions = suggestions.filter((s) => !tags.includes(s));

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
        {label}
      </label>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900 text-white text-xs font-medium"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:bg-white/20 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
        />
        <button
          type="button"
          onClick={() => addTag(input)}
          disabled={!input.trim()}
          className="px-4 py-2 rounded-lg bg-emerald-900 text-white text-sm font-medium hover:bg-emerald-950 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Aggiungi
        </button>
      </div>

      {availableSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs text-stone-400 self-center mr-1">Suggerimenti:</span>
          {availableSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addTag(s)}
              className="px-3 py-1 rounded-full border border-stone-300 text-xs text-stone-600 hover:bg-stone-100 hover:border-stone-400 transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>
      )}

      <input type="hidden" name={name} value={JSON.stringify(tags)} />
    </div>
  );
}
