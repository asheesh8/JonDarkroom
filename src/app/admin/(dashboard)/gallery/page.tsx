"use client";

import { useState } from "react";
import { Plus, Trash2, ImagePlus, Tag } from "lucide-react";
import {
  AdminPageHeader,
  MockNotice,
  Card,
  Field,
  TextInput,
  TextArea,
  Select,
} from "@/components/admin/AdminForm";
import { ShopImage } from "@/components/ShopImage";
import { formatPrice, cn } from "@/lib/utils";
import {
  galleryImages as seedGallery,
  inventory as seedInventory,
  conditionOptions,
  statusLabels,
  type InventoryItem,
} from "@/data/gallery";

type Tab = "inventory" | "gallery";

export default function AdminGalleryPage() {
  const [tab, setTab] = useState<Tab>("inventory");

  return (
    <div>
      <AdminPageHeader
        title="Gallery & Inventory"
        description="Manage the photo gallery and the camera-equipment display case. The inventory editor is the polished card template — fill it in and watch the live preview."
      />
      <MockNotice />

      <div className="mb-6 inline-flex rounded-lg border border-brass/25 bg-espresso/50 p-1">
        {(["inventory", "gallery"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-md px-4 py-2 text-sm capitalize transition",
              tab === t
                ? "bg-brass/20 text-brass"
                : "text-cream/60 hover:text-cream",
            )}
          >
            {t === "inventory" ? "Inventory (display case)" : "Photo gallery"}
          </button>
        ))}
      </div>

      {tab === "inventory" ? <InventoryManager /> : <GalleryManager />}
    </div>
  );
}

/* ============================ INVENTORY ============================ */
function InventoryManager() {
  const [items, setItems] = useState<InventoryItem[]>(seedInventory);
  const [editing, setEditing] = useState<InventoryItem>(blankItem());
  const [saved, setSaved] = useState(false);

  function set<K extends keyof InventoryItem>(key: K, value: InventoryItem[K]) {
    setEditing((prev) => ({ ...prev, [key]: value }) as InventoryItem);
  }

  function saveItem() {
    // TODO: insert/update Supabase `inventory` row + upload image to Storage.
    setItems((prev) => {
      const exists = prev.some((i) => i.id === editing.id);
      return exists
        ? prev.map((i) => (i.id === editing.id ? editing : i))
        : [...prev, editing];
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setEditing(blankItem());
  }

  function edit(item: InventoryItem) {
    setEditing(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function remove(id: string) {
    if (!confirm("Remove this item? (mock — resets on reload)")) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* editor */}
        <Card className="space-y-5">
          <h2 className="font-serif text-xl text-cream">
            {items.some((i) => i.id === editing.id) ? "Edit item" : "Add a new item"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Item name" htmlFor="name">
              <TextInput
                id="name"
                value={editing.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Canon AE-1 Program"
              />
            </Field>
            <Field label="Brand" htmlFor="brand">
              <TextInput
                id="brand"
                value={editing.brand}
                onChange={(e) => set("brand", e.target.value)}
                placeholder="Canon"
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Category" htmlFor="category">
              <Select
                id="category"
                value={editing.category}
                onChange={(e) =>
                  set("category", e.target.value as InventoryItem["category"])
                }
              >
                <option>Camera</option>
                <option>Lens</option>
                <option>Accessory</option>
              </Select>
            </Field>
            <Field label="Era / year" htmlFor="era">
              <TextInput
                id="era"
                value={editing.era}
                onChange={(e) => set("era", e.target.value)}
                placeholder="1981"
              />
            </Field>
            <Field label="Price (USD)" htmlFor="price">
              <TextInput
                id="price"
                type="number"
                min={0}
                value={editing.price}
                onChange={(e) => set("price", Number(e.target.value))}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Condition" htmlFor="condition">
              <Select
                id="condition"
                value={editing.condition}
                onChange={(e) =>
                  set("condition", e.target.value as InventoryItem["condition"])
                }
              >
                {conditionOptions.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </Field>
            <Field label="Status" htmlFor="status">
              <Select
                id="status"
                value={editing.status}
                onChange={(e) =>
                  set("status", e.target.value as InventoryItem["status"])
                }
              >
                {Object.entries(statusLabels).map(([v, label]) => (
                  <option key={v} value={v}>
                    {label}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Short blurb" htmlFor="blurb">
            <TextInput
              id="blurb"
              value={editing.blurb}
              onChange={(e) => set("blurb", e.target.value)}
              placeholder="The 35mm SLR that taught a generation to shoot."
            />
          </Field>

          <Field label="Full description" htmlFor="description">
            <TextArea
              id="description"
              value={editing.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </Field>

          <Field
            label="Item photo"
            hint="TODO: uploads go to Supabase Storage. For now paste a path under /jons-assets."
          >
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-brass/40 bg-espresso/40 px-4 py-5 text-center text-sm text-cream/55 transition hover:border-brass">
              <ImagePlus className="h-5 w-5 text-brass" aria-hidden="true" />
              Upload photo (mock)
              <input type="file" accept="image/*" className="hidden" />
            </label>
            <TextInput
              className="mt-3"
              value={editing.image}
              onChange={(e) => set("image", e.target.value)}
              placeholder="/jons-assets/your-item.jpg"
            />
          </Field>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={saveItem}
              disabled={!editing.name}
              className="btn-reset rounded-md bg-gradient-to-b from-brass-light to-brass-dark px-5 py-2.5 text-sm font-medium text-espresso shadow-brass disabled:opacity-50"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Save item
            </button>
            {editing.id && items.some((i) => i.id === editing.id) && (
              <button
                type="button"
                onClick={() => setEditing(blankItem())}
                className="text-sm text-cream/60 hover:text-cream"
              >
                Cancel edit
              </button>
            )}
            {saved && (
              <span className="text-sm text-[#7fae7f]">Saved (locally)</span>
            )}
          </div>
        </Card>

        {/* live preview card */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-cream/50">
            Live preview
          </p>
          <PreviewCard item={editing} />
        </div>
      </div>

      {/* existing items */}
      <div>
        <h2 className="mb-4 font-serif text-xl text-cream">
          In the case ({items.length})
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="relative">
              <button
                type="button"
                onClick={() => edit(item)}
                className="block w-full text-left"
              >
                <PreviewCard item={item} compact />
              </button>
              <button
                type="button"
                onClick={() => remove(item.id)}
                title="Delete"
                className="absolute right-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-full border border-burgundy/50 bg-espresso/90 text-burgundy hover:bg-burgundy/20"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PreviewCard({
  item,
  compact = false,
}: {
  item: InventoryItem;
  compact?: boolean;
}) {
  const statusStyles: Record<string, string> = {
    available: "bg-[#3a5a40]/80 text-cream border-[#588157]/60",
    "on-hold": "bg-brass-dark/80 text-espresso border-brass/60",
    sold: "bg-charcoal/80 text-cream/70 border-cream/20",
  };
  return (
    <div className="overflow-hidden rounded-lg border border-brass/30 bg-[#241810] shadow-counter">
      <div
        aria-hidden="true"
        className="h-2 w-full bg-brass"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle 5px at 10px 0, transparent 5px, #000 5px)",
          WebkitMaskSize: "20px 8px",
          maskImage:
            "radial-gradient(circle 5px at 10px 0, transparent 5px, #000 5px)",
          maskSize: "20px 8px",
        }}
      />
      <div className="relative aspect-[4/3] bg-espresso">
        <ShopImage src={item.image} alt={item.alt || item.name} variant="camera" />
        <span
          className={cn(
            "absolute left-3 top-3 rounded border px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-widest",
            statusStyles[item.status],
          )}
        >
          {statusLabels[item.status]}
        </span>
        <span className="absolute bottom-3 right-3 rounded-full border border-brass-dark bg-brass-light px-2.5 py-1 font-serif text-sm font-semibold text-espresso">
          {formatPrice(item.price || 0)}
        </span>
      </div>
      <div className="p-4">
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-brass/80">
          {item.brand || "Brand"} · {item.era || "Year"} · {item.condition}
        </span>
        <h3 className="mt-1 font-serif text-lg text-cream">
          {item.name || "Item name"}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-cream/65">
          {item.blurb || "Short blurb shown on the card…"}
        </p>
        {!compact && (
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brass">
            <Tag className="h-4 w-4" aria-hidden="true" /> View details
          </span>
        )}
      </div>
    </div>
  );
}

function blankItem(): InventoryItem {
  return {
    id: `inv-${Math.random().toString(36).slice(2, 8)}`,
    name: "",
    category: "Camera",
    brand: "",
    era: "",
    condition: "Excellent",
    status: "available",
    price: 0,
    blurb: "",
    description: "",
    specs: [],
    image: "",
    alt: "",
  };
}

/* ============================ GALLERY ============================ */
function GalleryManager() {
  const [images, setImages] = useState(seedGallery);

  function remove(id: string) {
    if (!confirm("Remove this image? (mock — resets on reload)")) return;
    setImages((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="space-y-6">
      <Card>
        <Field
          label="Add a gallery image"
          hint="TODO: uploads go to Supabase Storage. These show as polaroids on the homepage and showcase sections."
        >
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-brass/40 bg-espresso/40 px-4 py-10 text-center text-sm text-cream/55 transition hover:border-brass">
            <ImagePlus className="h-6 w-6 text-brass" aria-hidden="true" />
            Upload image (mock)
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </Field>
      </Card>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        {images.map((img) => (
          <div
            key={img.id}
            className="group relative overflow-hidden rounded-md border border-brass/20 bg-[#241810]"
          >
            <div className="aspect-square">
              <ShopImage src={img.src} alt={img.alt} />
            </div>
            <div className="p-3">
              <p className="text-xs uppercase tracking-widest text-brass/70">
                {img.tag}
              </p>
              <p className="truncate font-serif text-cream">{img.caption}</p>
            </div>
            <button
              type="button"
              onClick={() => remove(img.id)}
              title="Delete"
              className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full border border-burgundy/50 bg-espresso/90 text-burgundy opacity-0 transition group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
