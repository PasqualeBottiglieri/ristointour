"use client";

import {
  useState,
  useRef,
  useId,
  forwardRef,
  useImperativeHandle,
} from "react";
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
  layout?: string;
}

interface GalleryItem extends GalleryImage {
  _id: string;
}

const LAYOUT_OPTIONS = ["square", "wide", "tall"];

export interface ListingMediaManagerHandle {
  setCardImage: (url: string) => void;
  setHeroImage: (url: string) => void;
  addGalleryImage: (url: string) => void;
}

interface ListingMediaManagerProps {
  defaultCardImage?: string;
  defaultHeroImage?: string;
  defaultGalleryImages?: GalleryImage[];
}

/* ─── Sortable gallery item ────────────────────────────────────── */

function SortableGalleryItem({
  item,
  onRemove,
  onAltChange,
  onLayoutChange,
  onSetAsCard,
  onSetAsHero,
}: {
  item: GalleryItem;
  onRemove: () => void;
  onAltChange: (alt: string) => void;
  onLayoutChange: (layout: string) => void;
  onSetAsCard: () => void;
  onSetAsHero: () => void;
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

      {/* Quick actions */}
      <div className="absolute top-1 left-8 z-10 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={onSetAsCard}
          className="w-6 h-6 rounded bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary/10"
          title="Usa come immagine card"
        >
          <span className="material-symbols-outlined text-sm text-[#f86d16]">
            credit_card
          </span>
        </button>
        <button
          type="button"
          onClick={onSetAsHero}
          className="w-6 h-6 rounded bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary/10"
          title="Usa come immagine hero"
        >
          <span className="material-symbols-outlined text-sm text-[#f86d16]">
            panorama
          </span>
        </button>
      </div>

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

      <div className="p-2 space-y-1">
        <input
          type="text"
          value={item.alt}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="Testo alternativo"
          className="w-full px-2 py-1 rounded border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-primary"
        />
        <select
          value={item.layout || "square"}
          onChange={(e) => onLayoutChange(e.target.value)}
          className="w-full px-2 py-1 rounded border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-primary"
        >
          {LAYOUT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* ─── Draggable single image ──────────────────────────────────── */

function DraggableSingleImage({
  id,
  src,
  label,
}: {
  id: string;
  src: string;
  label: string;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative group/img ${isDragging ? "opacity-25" : ""}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute top-1.5 left-1.5 z-10 w-7 h-7 rounded-md bg-white/80 backdrop-blur-sm flex items-center justify-center cursor-grab active:cursor-grabbing opacity-0 group-hover/img:opacity-100 transition-opacity"
        title={`Trascina ${label} nella galleria`}
      >
        <span className="material-symbols-outlined text-sm text-stone-500">
          drag_indicator
        </span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        className="h-36 w-52 object-cover rounded-lg border border-stone-200"
        draggable={false}
      />
    </div>
  );
}

/* ─── Main component ───────────────────────────────────────────── */

const ListingMediaManager = forwardRef<
  ListingMediaManagerHandle,
  ListingMediaManagerProps
>(function ListingMediaManager(
  { defaultCardImage, defaultHeroImage, defaultGalleryImages },
  ref
) {
  const idCounter = useRef(0);
  const genId = () => `gal-${++idCounter.current}`;

  const [cardImage, setCardImage] = useState(defaultCardImage || "");
  const [heroImage, setHeroImage] = useState(defaultHeroImage || "");
  const [gallery, setGallery] = useState<GalleryItem[]>(() =>
    (defaultGalleryImages || []).map((img) => ({
      ...img,
      _id: genId(),
    }))
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null); // "card" | "hero" | "gallery" | null
  const [error, setError] = useState("");
  const cardInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const dndId = useId();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const galleryIds = gallery.map((img) => img._id);

  /* ── Imperative handle for external control (Google Photos) ──── */

  useImperativeHandle(ref, () => ({
    setCardImage: (url: string) => {
      if (cardImage) {
        setGallery((prev) => [
          ...prev,
          { _id: genId(), src: cardImage, alt: "", layout: "square" },
        ]);
      }
      setCardImage(url);
    },
    setHeroImage: (url: string) => {
      if (heroImage) {
        setGallery((prev) => [
          ...prev,
          { _id: genId(), src: heroImage, alt: "", layout: "square" },
        ]);
      }
      setHeroImage(url);
    },
    addGalleryImage: (url: string) => {
      setGallery((prev) => [
        ...prev,
        { _id: genId(), src: url, alt: "", layout: "square" },
      ]);
    },
  }));

  /* ── Upload handlers ─────────────────────────────────────────── */

  async function handleUpload(
    files: FileList | null,
    target: "card" | "hero" | "gallery"
  ) {
    if (!files || files.length === 0) return;
    setError("");
    setUploading(target);
    const formData = new FormData();
    for (const file of Array.from(files)) formData.append("files", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Errore durante il caricamento");
        return;
      }
      if (target === "card") {
        if (cardImage) {
          setGallery((prev) => [
            { _id: genId(), src: cardImage, alt: "", layout: "square" },
            ...prev,
          ]);
        }
        setCardImage(data.urls[0]);
      } else if (target === "hero") {
        if (heroImage) {
          setGallery((prev) => [
            { _id: genId(), src: heroImage, alt: "", layout: "square" },
            ...prev,
          ]);
        }
        setHeroImage(data.urls[0]);
      } else {
        const newImages: GalleryItem[] = data.urls.map((url: string) => ({
          _id: genId(),
          src: url,
          alt: "",
          layout: "square",
        }));
        setGallery((prev) => [...prev, ...newImages]);
      }
    } catch {
      setError("Errore di rete");
    } finally {
      setUploading(null);
      if (target === "card" && cardInputRef.current)
        cardInputRef.current.value = "";
      if (target === "hero" && heroInputRef.current)
        heroInputRef.current.value = "";
      if (target === "gallery" && galleryInputRef.current)
        galleryInputRef.current.value = "";
    }
  }

  /* ── Gallery → Single image (click action) ─────────────────── */

  function promoteToCard(index: number) {
    const item = gallery[index];
    const oldCard = cardImage;
    setCardImage(item.src);
    setGallery((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (oldCard) {
        next.splice(Math.min(index, next.length), 0, {
          _id: genId(),
          src: oldCard,
          alt: "",
          layout: "square",
        });
      }
      return next;
    });
  }

  function promoteToHero(index: number) {
    const item = gallery[index];
    const oldHero = heroImage;
    setHeroImage(item.src);
    setGallery((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (oldHero) {
        next.splice(Math.min(index, next.length), 0, {
          _id: genId(),
          src: oldHero,
          alt: "",
          layout: "square",
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

    const aGalIdx = gallery.findIndex((g) => g._id === aId);
    const oGalIdx = gallery.findIndex((g) => g._id === oId);

    // Gallery ↔ Gallery: reorder
    if (aGalIdx !== -1 && oGalIdx !== -1) {
      setGallery((prev) => arrayMove(prev, aGalIdx, oGalIdx));
      return;
    }

    // Gallery → Card drop zone
    if (aGalIdx !== -1 && oId === "card-drop-zone") {
      promoteToCard(aGalIdx);
      return;
    }

    // Gallery → Hero drop zone
    if (aGalIdx !== -1 && oId === "hero-drop-zone") {
      promoteToHero(aGalIdx);
      return;
    }

    // Card → Gallery drop zone (append)
    if (aId === "card-image" && oId === "gallery-drop-zone") {
      const old = cardImage;
      setCardImage("");
      setGallery((prev) => [
        ...prev,
        { _id: genId(), src: old, alt: "", layout: "square" },
      ]);
      return;
    }

    // Card → Gallery item (insert at position)
    if (aId === "card-image" && oGalIdx !== -1) {
      const old = cardImage;
      setCardImage("");
      setGallery((prev) => {
        const next = [...prev];
        next.splice(oGalIdx, 0, {
          _id: genId(),
          src: old,
          alt: "",
          layout: "square",
        });
        return next;
      });
      return;
    }

    // Hero → Gallery drop zone (append)
    if (aId === "hero-image" && oId === "gallery-drop-zone") {
      const old = heroImage;
      setHeroImage("");
      setGallery((prev) => [
        ...prev,
        { _id: genId(), src: old, alt: "", layout: "square" },
      ]);
      return;
    }

    // Hero → Gallery item (insert at position)
    if (aId === "hero-image" && oGalIdx !== -1) {
      const old = heroImage;
      setHeroImage("");
      setGallery((prev) => {
        const next = [...prev];
        next.splice(oGalIdx, 0, {
          _id: genId(),
          src: old,
          alt: "",
          layout: "square",
        });
        return next;
      });
      return;
    }

    // Card → Hero drop zone: swap
    if (aId === "card-image" && oId === "hero-drop-zone") {
      const c = cardImage;
      const h = heroImage;
      setCardImage(h);
      setHeroImage(c);
      return;
    }

    // Hero → Card drop zone: swap
    if (aId === "hero-image" && oId === "card-drop-zone") {
      const c = cardImage;
      const h = heroImage;
      setCardImage(h);
      setHeroImage(c);
      return;
    }
  }

  /* ── Active drag image for overlay ───────────────────────────── */

  function getActiveImageSrc(): string | null {
    if (!activeId) return null;
    if (activeId === "card-image") return cardImage;
    if (activeId === "hero-image") return heroImage;
    const item = gallery.find((g) => g._id === activeId);
    return item?.src || null;
  }

  /* ── Droppable zones ─────────────────────────────────────────── */

  const { setNodeRef: setCardDropRef, isOver: isOverCard } = useDroppable({
    id: "card-drop-zone",
  });
  const { setNodeRef: setHeroDropRef, isOver: isOverHero } = useDroppable({
    id: "hero-drop-zone",
  });
  const { setNodeRef: setGalleryDropRef, isOver: isOverGallery } =
    useDroppable({ id: "gallery-drop-zone" });

  /* ── Serialization ─────────────────────────────────────────── */

  const serializedGallery =
    gallery.length > 0
      ? JSON.stringify(
          gallery.map(({ src, alt, layout }) => ({ src, alt, layout }))
        )
      : "";

  const isDraggingFromGallery =
    activeId !== null &&
    activeId !== "card-image" &&
    activeId !== "hero-image";
  const isDraggingCard = activeId === "card-image";
  const isDraggingHero = activeId === "hero-image";
  const isDraggingSingle = isDraggingCard || isDraggingHero;

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm focus:ring-2 focus:ring-primary focus:border-primary";

  /* ── Render helper for single-image zone ─────────────────────── */

  function renderSingleZone(
    label: string,
    image: string,
    setImage: (url: string) => void,
    dropRef: (el: HTMLElement | null) => void,
    isOver: boolean,
    draggableId: string,
    inputRefObj: React.RefObject<HTMLInputElement | null>,
    uploadTarget: "card" | "hero",
    highlightDrag: boolean
  ) {
    return (
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
          {label}
        </label>
        <div
          ref={dropRef}
          className={`rounded-xl border-2 border-dashed transition-all duration-200 p-4 ${
            isOver && highlightDrag
              ? "border-[#f86d16] bg-orange-50/60"
              : image
                ? "border-stone-200 bg-white"
                : "border-stone-300 bg-stone-50"
          }`}
        >
          {image ? (
            <div className="flex items-start gap-4">
              <DraggableSingleImage
                id={draggableId}
                src={image}
                label={label}
              />
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setGallery((prev) => [
                      ...prev,
                      {
                        _id: genId(),
                        src: image,
                        alt: "",
                        layout: "square",
                      },
                    ]);
                    setImage("");
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-stone-600 hover:bg-stone-100 transition-colors border border-stone-200"
                >
                  <span className="material-symbols-outlined text-sm">
                    move_down
                  </span>
                  In galleria
                </button>
                <label
                  className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-stone-600 hover:bg-stone-100 transition-colors border border-stone-200 ${uploading === uploadTarget ? "opacity-50 pointer-events-none" : ""}`}
                >
                  <span className="material-symbols-outlined text-sm">
                    swap_horiz
                  </span>
                  {uploading === uploadTarget ? "Caricamento..." : "Sostituisci"}
                  <input
                    ref={inputRefObj}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={(e) => handleUpload(e.target.files, uploadTarget)}
                    className="hidden"
                    disabled={uploading === uploadTarget}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setImage("")}
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
                className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-stone-300 text-sm text-stone-600 hover:border-stone-400 hover:bg-stone-50 transition-colors ${uploading === uploadTarget ? "opacity-50 pointer-events-none" : ""}`}
              >
                <span className="material-symbols-outlined text-lg">
                  upload
                </span>
                {uploading === uploadTarget
                  ? "Caricamento..."
                  : `Carica ${label.toLowerCase()}`}
                <input
                  ref={inputRefObj}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(e) => handleUpload(e.target.files, uploadTarget)}
                  className="hidden"
                  disabled={uploading === uploadTarget}
                />
              </label>
              <p className="text-[11px] text-stone-400 mt-2">
                Oppure trascina qui un&apos;immagine dalla galleria
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <input type="hidden" name="image" value={cardImage} />
      <input type="hidden" name="heroImage" value={heroImage} />
      <input type="hidden" name="galleryImages" value={serializedGallery} />

      {/* ── Card + Hero side by side ────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderSingleZone(
          "Immagine Card *",
          cardImage,
          setCardImage,
          setCardDropRef,
          isOverCard,
          "card-image",
          cardInputRef,
          "card",
          isDraggingFromGallery || isDraggingHero
        )}
        {renderSingleZone(
          "Immagine Hero",
          heroImage,
          setHeroImage,
          setHeroDropRef,
          isOverHero,
          "hero-image",
          heroInputRef,
          "hero",
          isDraggingFromGallery || isDraggingCard
        )}
      </div>

      {/* ── Swap button ──────────────────────────────────────────── */}
      {cardImage && heroImage && (
        <div className="flex justify-center -mt-1">
          <button
            type="button"
            onClick={() => {
              const c = cardImage;
              const h = heroImage;
              setCardImage(h);
              setHeroImage(c);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-stone-500 hover:bg-stone-100 transition-colors border border-stone-200"
          >
            <span className="material-symbols-outlined text-sm">
              swap_horiz
            </span>
            Scambia Card ↔ Hero
          </button>
        </div>
      )}

      {/* ── Gallery Section ──────────────────────────────────────── */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
          Galleria Immagini
        </label>
        <div
          ref={setGalleryDropRef}
          className={`rounded-xl border-2 border-dashed transition-all duration-200 p-4 ${
            isOverGallery && isDraggingSingle
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
                    onLayoutChange={(layout) =>
                      setGallery((prev) =>
                        prev.map((g) =>
                          g._id === item._id ? { ...g, layout } : g
                        )
                      )
                    }
                    onSetAsCard={() => promoteToCard(i)}
                    onSetAsHero={() => promoteToHero(i)}
                  />
                ))}
              </div>
            )}
          </SortableContext>

          {gallery.length === 0 &&
            !(isOverGallery && isDraggingSingle) && (
              <p className="text-[11px] text-stone-400 text-center py-2 mb-2">
                Nessuna immagine in galleria
              </p>
            )}

          <label
            className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-stone-300 text-sm text-stone-600 hover:border-stone-400 hover:bg-stone-50 transition-colors ${uploading === "gallery" ? "opacity-50 pointer-events-none" : ""}`}
          >
            <span className="material-symbols-outlined text-lg">
              add_photo_alternate
            </span>
            {uploading === "gallery" ? "Caricamento..." : "Aggiungi immagini"}
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              onChange={(e) => handleUpload(e.target.files, "gallery")}
              className="hidden"
              disabled={uploading === "gallery"}
            />
          </label>

          {gallery.length > 0 && (
            <p className="text-[11px] text-stone-400 mt-2">
              Trascina per riordinare &middot; Usa le icone per assegnare a
              Card o Hero
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
});

export default ListingMediaManager;
