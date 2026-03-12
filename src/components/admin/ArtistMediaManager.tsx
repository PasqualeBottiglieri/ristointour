"use client";

import { useState, useRef, useId } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* ─── Types ────────────────────────────────────────────────────── */

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryItem extends GalleryImage {
  _id: string;
}

interface ArtistMediaManagerProps {
  defaultMainImage?: string;
  defaultGalleryImages?: GalleryImage[];
}

/* ─── Sortable gallery item ────────────────────────────────────── */

function SortableGalleryItem({
  item,
  onRemove,
  onAltChange,
  onSetAsMain,
}: {
  item: GalleryItem;
  onRemove: () => void;
  onAltChange: (alt: string) => void;
  onSetAsMain: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.25 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative bg-stone-50 rounded-lg border border-stone-200 overflow-hidden group"
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-1 left-1 z-10 w-6 h-6 rounded bg-white/80 backdrop-blur-sm flex items-center justify-center cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
        title="Trascina per riordinare"
      >
        <span className="material-symbols-outlined text-sm text-stone-500">
          drag_indicator
        </span>
      </div>

      {/* Set as main button */}
      <button
        type="button"
        onClick={onSetAsMain}
        className="absolute top-1 left-8 z-10 w-6 h-6 rounded bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10"
        title="Imposta come immagine principale"
      >
        <span className="material-symbols-outlined text-sm text-[#f86d16]">
          star
        </span>
      </button>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        className="w-full h-28 object-cover"
        draggable={false}
      />

      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
      >
        &times;
      </button>

      <div className="p-2">
        <input
          type="text"
          value={item.alt}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="Testo alternativo"
          className="w-full px-2 py-1 rounded border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-primary"
        />
      </div>
    </div>
  );
}

/* ─── Draggable main image ─────────────────────────────────────── */

function DraggableMainImage({ src }: { src: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: "main-image",
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative group/main ${isDragging ? "opacity-25" : ""}`}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-1.5 left-1.5 z-10 w-7 h-7 rounded-md bg-white/80 backdrop-blur-sm flex items-center justify-center cursor-grab active:cursor-grabbing opacity-0 group-hover/main:opacity-100 transition-opacity"
        title="Trascina nella galleria"
      >
        <span className="material-symbols-outlined text-sm text-stone-500">
          drag_indicator
        </span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Immagine principale"
        className="h-36 w-52 object-cover rounded-lg border border-stone-200"
        draggable={false}
      />
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────── */

export default function ArtistMediaManager({
  defaultMainImage,
  defaultGalleryImages,
}: ArtistMediaManagerProps) {
  const idCounter = useRef(0);
  const genId = () => `gal-${++idCounter.current}`;

  const [mainImage, setMainImage] = useState(defaultMainImage || "");
  const [gallery, setGallery] = useState<GalleryItem[]>(
    () => (defaultGalleryImages || []).map((img) => ({ ...img, _id: genId() }))
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [error, setError] = useState("");
  const mainInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const dndId = useId();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const galleryIds = gallery.map((img) => img._id);

  /* ── Upload handlers ─────────────────────────────────────────── */

  async function handleMainUpload(e: React.ChangeEvent<HTMLInputElement>) {
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
      // If there was a main image, move it to gallery
      if (mainImage) {
        setGallery((prev) => [{ _id: genId(), src: mainImage, alt: "" }, ...prev]);
      }
      setMainImage(data.urls[0]);
    } catch {
      setError("Errore di rete");
    } finally {
      setUploading(false);
      if (mainInputRef.current) mainInputRef.current.value = "";
    }
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setError("");
    setGalleryUploading(true);
    const formData = new FormData();
    for (const file of Array.from(files)) formData.append("files", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Errore durante il caricamento");
        return;
      }
      const newImages: GalleryItem[] = data.urls.map((url: string) => ({
        _id: genId(),
        src: url,
        alt: "",
      }));
      setGallery((prev) => [...prev, ...newImages]);
    } catch {
      setError("Errore di rete");
    } finally {
      setGalleryUploading(false);
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    }
  }

  /* ── Gallery → Main (click action) ──────────────────────────── */

  function setAsMain(index: number) {
    const item = gallery[index];
    const oldMain = mainImage;
    setMainImage(item.src);
    setGallery((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (oldMain) {
        next.splice(Math.min(index, next.length), 0, {
          _id: genId(),
          src: oldMain,
          alt: "",
        });
      }
      return next;
    });
  }

  /* ── DnD handlers ────────────────────────────────────────────── */

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const aId = String(active.id);
    const oId = String(over.id);
    if (aId === oId) return;

    // Gallery reorder (both ids are gallery items)
    const aGalIdx = gallery.findIndex((g) => g._id === aId);
    const oGalIdx = gallery.findIndex((g) => g._id === oId);

    if (aGalIdx !== -1 && oGalIdx !== -1) {
      setGallery((prev) => arrayMove(prev, aGalIdx, oGalIdx));
      return;
    }

    // Gallery → Main drop zone
    if (aGalIdx !== -1 && oId === "main-drop-zone") {
      const draggedItem = gallery[aGalIdx];
      const oldMain = mainImage;
      setMainImage(draggedItem.src);
      setGallery((prev) => {
        const next = prev.filter((g) => g._id !== aId);
        if (oldMain) {
          next.splice(Math.min(aGalIdx, next.length), 0, {
            _id: genId(),
            src: oldMain,
            alt: "",
          });
        }
        return next;
      });
      return;
    }

    // Main → Gallery item (insert at position)
    if (aId === "main-image" && oGalIdx !== -1) {
      const oldMain = mainImage;
      setMainImage("");
      setGallery((prev) => {
        const next = [...prev];
        next.splice(oGalIdx, 0, { _id: genId(), src: oldMain, alt: "" });
        return next;
      });
      return;
    }

    // Main → Gallery zone (append)
    if (aId === "main-image" && oId === "gallery-drop-zone") {
      const oldMain = mainImage;
      setMainImage("");
      setGallery((prev) => [...prev, { _id: genId(), src: oldMain, alt: "" }]);
      return;
    }
  }

  /* ── Active drag image for overlay ───────────────────────────── */

  function getActiveImageSrc(): string | null {
    if (!activeId) return null;
    if (activeId === "main-image") return mainImage;
    const item = gallery.find((g) => g._id === activeId);
    return item?.src || null;
  }

  /* ── Droppable zones ─────────────────────────────────────────── */

  const { setNodeRef: setMainDropRef, isOver: isOverMain } = useDroppable({
    id: "main-drop-zone",
  });
  const { setNodeRef: setGalleryDropRef, isOver: isOverGallery } = useDroppable({
    id: "gallery-drop-zone",
  });

  /* ── Hidden inputs ───────────────────────────────────────────── */

  const serializedGallery =
    gallery.length > 0
      ? JSON.stringify(gallery.map(({ src, alt }) => ({ src, alt })))
      : "";

  const isDraggingFromGallery =
    activeId !== null && activeId !== "main-image";
  const isDraggingMain = activeId === "main-image";

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <input type="hidden" name="image" value={mainImage} />
      <input type="hidden" name="galleryImages" value={serializedGallery} />

      {/* ── Main Image Section ───────────────────────────────────── */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
          Immagine principale *
        </label>
        <div
          ref={setMainDropRef}
          className={`rounded-xl border-2 border-dashed transition-all duration-200 p-4 ${
            isOverMain && isDraggingFromGallery
              ? "border-[#f86d16] bg-orange-50/60"
              : mainImage
                ? "border-stone-200 bg-white"
                : "border-stone-300 bg-stone-50"
          }`}
        >
          {mainImage ? (
            <div className="flex items-start gap-4">
              <DraggableMainImage src={mainImage} />
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setGallery((prev) => [
                      ...prev,
                      { _id: genId(), src: mainImage, alt: "" },
                    ]);
                    setMainImage("");
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-stone-600 hover:bg-stone-100 transition-colors border border-stone-200"
                >
                  <span className="material-symbols-outlined text-sm">
                    move_down
                  </span>
                  Sposta in galleria
                </button>
                <label
                  className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-stone-600 hover:bg-stone-100 transition-colors border border-stone-200 ${uploading ? "opacity-50 pointer-events-none" : ""}`}
                >
                  <span className="material-symbols-outlined text-sm">
                    swap_horiz
                  </span>
                  {uploading ? "Caricamento..." : "Sostituisci"}
                  <input
                    ref={mainInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleMainUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setMainImage("")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-red-600 hover:bg-red-50 transition-colors border border-red-200"
                >
                  <span className="material-symbols-outlined text-sm">
                    delete
                  </span>
                  Rimuovi
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <span className="material-symbols-outlined text-3xl text-stone-300 mb-3">
                add_photo_alternate
              </span>
              <label
                className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-stone-300 text-sm text-stone-600 hover:border-stone-400 hover:bg-stone-50 transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}
              >
                <span className="material-symbols-outlined text-lg">
                  upload
                </span>
                {uploading ? "Caricamento..." : "Carica immagine principale"}
                <input
                  ref={mainInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleMainUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              <p className="text-[11px] text-stone-400 mt-2">
                Oppure trascina qui un&apos;immagine dalla galleria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Gallery Section ──────────────────────────────────────── */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
          Galleria Immagini
        </label>
        <div
          ref={setGalleryDropRef}
          className={`rounded-xl border-2 border-dashed transition-all duration-200 p-4 ${
            isOverGallery && isDraggingMain
              ? "border-[#f86d16] bg-orange-50/60"
              : gallery.length > 0
                ? "border-stone-200 bg-white"
                : "border-stone-300 bg-stone-50"
          }`}
        >
          <SortableContext items={galleryIds} strategy={rectSortingStrategy}>
            {gallery.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                {gallery.map((item, i) => (
                  <SortableGalleryItem
                    key={item._id}
                    item={item}
                    onRemove={() =>
                      setGallery((prev) =>
                        prev.filter((g) => g._id !== item._id)
                      )
                    }
                    onAltChange={(alt) =>
                      setGallery((prev) =>
                        prev.map((g) =>
                          g._id === item._id ? { ...g, alt } : g
                        )
                      )
                    }
                    onSetAsMain={() => setAsMain(i)}
                  />
                ))}
              </div>
            )}
          </SortableContext>

          {gallery.length === 0 && !(isOverGallery && isDraggingMain) && (
            <p className="text-[11px] text-stone-400 text-center py-2 mb-2">
              Nessuna immagine in galleria
            </p>
          )}

          <label
            className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-stone-300 text-sm text-stone-600 hover:border-stone-400 hover:bg-stone-50 transition-colors ${galleryUploading ? "opacity-50 pointer-events-none" : ""}`}
          >
            <span className="material-symbols-outlined text-lg">
              add_photo_alternate
            </span>
            {galleryUploading ? "Caricamento..." : "Aggiungi immagini"}
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              onChange={handleGalleryUpload}
              className="hidden"
              disabled={galleryUploading}
            />
          </label>

          {gallery.length > 0 && (
            <p className="text-[11px] text-stone-400 mt-2">
              Trascina per riordinare &middot; Clicca &#9733; per impostare come
              principale
            </p>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {/* ── Drag overlay ─────────────────────────────────────────── */}
      <DragOverlay dropAnimation={null}>
        {activeId && getActiveImageSrc() ? (
          <div className="rounded-lg overflow-hidden shadow-2xl border-2 border-[#f86d16] rotate-1 scale-105 pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getActiveImageSrc()!}
              alt=""
              className="h-24 w-36 object-cover"
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
