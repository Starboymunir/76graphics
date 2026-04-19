"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Upload,
  Trash2,
  LogOut,
  ImageIcon,
  ChevronDown,
  Save,
  Layout,
  Plus,
  X,
  Loader2,
  Camera,
  FileText,
  Eye,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   Constants
   ──────────────────────────────────────────────────────────── */

const PAGES = [
  { key: "homepage", label: "Homepage", path: "/" },
  { key: "branding-services", label: "Branding", path: "/branding-services" },
  { key: "website-design", label: "Website Design", path: "/website-design" },
  { key: "vehicle-wraps", label: "Vehicle Wraps", path: "/vehicle-wraps" },
  { key: "signage", label: "Signage", path: "/signage" },
  { key: "environmental-graphics", label: "Environmental", path: "/environmental-graphics" },
  { key: "promotional-products", label: "Promo Products", path: "/promotional-products" },
];

const PORTFOLIO_CATEGORIES = [
  "Vehicle Wraps",
  "Branding",
  "Website Design",
  "Signage",
  "Environmental Graphics",
  "Promotional Products",
  "Other",
];

/* ────────────────────────────────────────────────────────────
   Sub-components
   ──────────────────────────────────────────────────────────── */

function ImageSlot({
  label,
  src,
  onUpload,
  uploading,
}: {
  label: string;
  src?: string;
  onUpload: (file: File) => void;
  uploading: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-2">
      <label className="text-white/60 text-xs uppercase tracking-wider font-medium">
        {label}
      </label>
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        className="relative aspect-video bg-white/5 border border-white/10 overflow-hidden cursor-pointer group hover:border-white/25 transition-colors"
      >
        {src ? (
          <>
            <Image src={src} alt={label} fill className="object-cover" sizes="400px" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              {uploading ? (
                <Loader2 size={20} className="text-white animate-spin" />
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <Camera size={20} className="text-white" />
                  <span className="text-white text-xs">Change Image</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            {uploading ? (
              <Loader2 size={24} className="text-white/30 animate-spin" />
            ) : (
              <>
                <Upload size={20} className="text-white/20 mb-1" />
                <span className="text-white/30 text-xs">Click to upload</span>
              </>
            )}
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onUpload(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-white/50 text-[11px] uppercase tracking-wider font-medium">
        {label}
      </label>
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/15 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#b32025] transition-colors"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="space-y-1">
      <label className="text-white/50 text-[11px] uppercase tracking-wider font-medium">
        {label}
      </label>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full bg-white/5 border border-white/15 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#b32025] transition-colors resize-y"
      />
    </div>
  );
}

function ListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items?: string[];
  onChange: (items: string[]) => void;
}) {
  const [newItem, setNewItem] = useState("");
  const arr = items ?? [];
  return (
    <div className="space-y-2">
      <label className="text-white/50 text-[11px] uppercase tracking-wider font-medium">
        {label}
      </label>
      <div className="space-y-1.5">
        {arr.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const next = [...arr];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="flex-1 bg-white/5 border border-white/15 text-white px-3 py-2 text-sm focus:outline-none focus:border-[#b32025] transition-colors"
            />
            <button
              type="button"
              onClick={() => onChange(arr.filter((_, j) => j !== i))}
              className="text-white/30 hover:text-[#b32025] transition-colors p-1 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item…"
          className="flex-1 bg-white/5 border border-dashed border-white/15 text-white px-3 py-2 text-sm focus:outline-none focus:border-[#b32025] transition-colors placeholder-white/25"
          onKeyDown={(e) => {
            if (e.key === "Enter" && newItem.trim()) {
              onChange([...arr, newItem.trim()]);
              setNewItem("");
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            if (newItem.trim()) {
              onChange([...arr, newItem.trim()]);
              setNewItem("");
            }
          }}
          className="text-[#b32025] hover:text-white transition-colors p-1 cursor-pointer"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Cloudinary Image type
   ──────────────────────────────────────────────────────────── */

interface CloudinaryImage {
  publicId: string;
  url: string;
  width: number;
  height: number;
  createdAt: string;
  context?: Record<string, string>;
}

/* ────────────────────────────────────────────────────────────
   Main Dashboard Component
   ──────────────────────────────────────────────────────────── */

type Tab = "pages" | "portfolio";

export default function AdminDashboard() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>("pages");
  const [activePage, setActivePage] = useState("branding-services");

  /* ── Content state ── */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<Record<string, any> | null>(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ── Portfolio state ── */
  const [portfolioImages, setPortfolioImages] = useState<CloudinaryImage[]>([]);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Vehicle Wraps");
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const portfolioFileRef = useRef<HTMLInputElement>(null);

  /* ── Image slot upload ── */
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);

  /* ── Feedback ── */
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  /* ── Load page content ── */
  const loadContent = useCallback(async (page: string) => {
    setContentLoading(true);
    setContent(null);
    try {
      const res = await fetch("/api/admin/content?page=" + encodeURIComponent(page));
      if (res.ok) setContent(await res.json());
    } catch {
      /* empty */
    } finally {
      setContentLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "pages") loadContent(activePage);
  }, [activePage, activeTab, loadContent]);

  /* ── Load portfolio ── */
  const loadPortfolio = useCallback(async () => {
    setPortfolioLoading(true);
    try {
      const res = await fetch("/api/admin/images?section=portfolio");
      if (res.ok) setPortfolioImages(await res.json());
    } catch {
      /* empty */
    } finally {
      setPortfolioLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "portfolio") loadPortfolio();
  }, [activeTab, loadPortfolio]);

  /* ── Save content ── */
  async function handleSave() {
    if (!content) return;
    setSaving(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: activePage, content }),
      });
      if (res.ok) {
        showSuccess("Changes saved & page revalidated!");
      } else {
        setErrorMsg("Save failed. Try again.");
      }
    } catch {
      setErrorMsg("Save failed. Check your connection.");
    } finally {
      setSaving(false);
    }
  }

  /* ── Upload image to specific slot ── */
  async function handleSlotUpload(slot: string, file: File) {
    setUploadingSlot(slot);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("section", "pages/" + activePage);
      fd.append("title", activePage + " " + slot);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        updateField(slot, data.url);
        showSuccess("Image uploaded!");
      }
    } catch {
      /* empty */
    } finally {
      setUploadingSlot(null);
    }
  }

  /* ── Update nested content field (dot notation) ── */
  function updateField(path: string, value: unknown) {
    setContent((prev) => {
      if (!prev) return prev;
      const copy = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return copy;
    });
  }

  /* ── Portfolio upload ── */
  async function handlePortfolioUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!uploadFile) return;
    setUploading(true);
    setErrorMsg("");
    try {
      const fd = new FormData();
      fd.append("file", uploadFile);
      fd.append("section", "portfolio");
      if (uploadTitle) fd.append("title", uploadTitle);
      fd.append("category", uploadCategory);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (res.ok) {
        setUploadFile(null);
        setUploadPreview(null);
        setUploadTitle("");
        if (portfolioFileRef.current) portfolioFileRef.current.value = "";
        showSuccess("Portfolio image uploaded!");
        loadPortfolio();
      } else {
        const data = await res.json();
        setErrorMsg(data.error ?? "Upload failed");
      }
    } catch {
      setErrorMsg("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handlePortfolioDelete(publicId: string) {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    setDeletingId(publicId);
    try {
      await fetch("/api/admin/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
      setPortfolioImages((prev) => prev.filter((img) => img.publicId !== publicId));
      showSuccess("Image deleted.");
    } catch {
      /* empty */
    } finally {
      setDeletingId(null);
    }
  }

  function showSuccess(msg: string) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const currentPageMeta = PAGES.find((p) => p.key === activePage);

  /* ────────────────────────────────────────────────────────────
     Render
     ──────────────────────────────────────────────────────────── */

  return (
    <div
      className="min-h-screen bg-[#06192b]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Top Bar ── */}
      <header className="bg-[#061e31] border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span
            style={{
              fontFamily: "'Apotek Extended', sans-serif",
              fontWeight: 900,
              fontSize: "1.5rem",
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            76<span style={{ color: "#b32025" }}>.</span>
          </span>
          <span className="text-white/40 text-sm uppercase tracking-widest hidden sm:block">
            Admin Panel
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white text-xs uppercase tracking-wider transition-colors hidden sm:block"
          >
            View Site ↗
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors cursor-pointer"
          >
            <LogOut size={15} />
            <span className="hidden sm:block">Log Out</span>
          </button>
        </div>
      </header>

      {/* ── Tab Navigation ── */}
      <div className="border-b border-white/10 bg-[#061e31]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-0">
          <button
            onClick={() => setActiveTab("pages")}
            className={`flex items-center gap-2 px-6 py-3.5 text-sm font-medium uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${activeTab === "pages" ? "border-[#b32025] text-white" : "border-transparent text-white/40 hover:text-white/70"}`}
          >
            <Layout size={14} />
            Pages & Content
          </button>
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`flex items-center gap-2 px-6 py-3.5 text-sm font-medium uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${activeTab === "portfolio" ? "border-[#b32025] text-white" : "border-transparent text-white/40 hover:text-white/70"}`}
          >
            <ImageIcon size={14} />
            Portfolio Gallery
          </button>
        </div>
      </div>

      {/* ── Global Feedback ── */}
      {successMsg && (
        <div className="bg-emerald-500/10 border-b border-emerald-400/25 px-6 py-2.5 text-emerald-400 text-sm text-center">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-500/10 border-b border-red-400/25 px-6 py-2.5 text-red-400 text-sm text-center">
          {errorMsg}
          <button
            onClick={() => setErrorMsg("")}
            className="ml-3 underline cursor-pointer"
          >
            dismiss
          </button>
        </div>
      )}

      {/* ══════════ PAGES TAB ══════════ */}
      {activeTab === "pages" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
            {/* ── Page Sidebar ── */}
            <div className="bg-[#0d3a5e] border border-white/10 p-3 lg:sticky lg:top-6 self-start">
              <p className="text-white/30 text-[10px] uppercase tracking-widest px-2 mb-2">
                Pages
              </p>
              {PAGES.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setActivePage(p.key)}
                  className={`w-full text-left px-3 py-2.5 text-sm transition-colors cursor-pointer flex items-center justify-between ${activePage === p.key ? "bg-[#b32025] text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
                >
                  <span>{p.label}</span>
                  {activePage === p.key && (
                    <a
                      href={p.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-white/60 hover:text-white"
                    >
                      <Eye size={12} />
                    </a>
                  )}
                </button>
              ))}
            </div>

            {/* ── Content Editor ── */}
            <div className="space-y-6">
              {/* Page Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-white text-xl font-bold">
                    {currentPageMeta?.label}
                  </h2>
                  <p className="text-white/40 text-xs mt-0.5">
                    Edit images and content for this page. Changes are saved to the
                    live site.
                  </p>
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving || !content}
                  className="flex items-center gap-2 bg-[#b32025] hover:bg-[#8f1a1e] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold uppercase tracking-wider px-6 py-3 transition-colors cursor-pointer"
                >
                  {saving ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>

              {contentLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white/5 animate-pulse h-32 rounded"
                    />
                  ))}
                </div>
              ) : content ? (
                <>
                  {/* ── IMAGES SECTION ── */}
                  <div className="bg-[#0d3a5e] border border-white/10 p-6">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Camera size={14} className="text-[#b32025]" />
                      Images
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <ImageSlot
                        label="Hero Background"
                        src={content.hero?.image}
                        onUpload={(f) => handleSlotUpload("hero.image", f)}
                        uploading={uploadingSlot === "hero.image"}
                      />
                      {activePage !== "homepage" && (
                        <ImageSlot
                          label="Featured Section Image"
                          src={content.featuredImage}
                          onUpload={(f) => handleSlotUpload("featuredImage", f)}
                          uploading={uploadingSlot === "featuredImage"}
                        />
                      )}
                    </div>
                  </div>

                  {/* ── HERO CONTENT ── */}
                  <div className="bg-[#0d3a5e] border border-white/10 p-6">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <FileText size={14} className="text-[#b32025]" />
                      Hero Section
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <TextField
                        label="Tag Label"
                        value={content.hero?.tag}
                        onChange={(v) => updateField("hero.tag", v)}
                      />
                      <TextField
                        label="CTA Button Text"
                        value={content.hero?.ctaText}
                        onChange={(v) => updateField("hero.ctaText", v)}
                      />
                      <TextField
                        label="Headline Line 1"
                        value={content.hero?.headline1}
                        onChange={(v) => updateField("hero.headline1", v)}
                      />
                      <TextField
                        label="Headline Line 2 (Outlined)"
                        value={content.hero?.headline2}
                        onChange={(v) => updateField("hero.headline2", v)}
                      />
                      {activePage === "homepage" && (
                        <>
                          <TextField
                            label="Headline Line 3"
                            value={content.hero?.headline3}
                            onChange={(v) => updateField("hero.headline3", v)}
                          />
                          <TextField
                            label="Secondary CTA Text"
                            value={content.hero?.ctaText2}
                            onChange={(v) => updateField("hero.ctaText2", v)}
                          />
                        </>
                      )}
                    </div>
                    <div className="mt-4">
                      <TextArea
                        label="Description"
                        value={content.hero?.description}
                        onChange={(v) => updateField("hero.description", v)}
                      />
                    </div>
                  </div>

                  {/* ── INCLUDES SECTION ── */}
                  {content.includes && (
                    <div className="bg-[#0d3a5e] border border-white/10 p-6">
                      <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                        <FileText size={14} className="text-[#b32025]" />
                        What&apos;s Included Section
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <TextField
                          label="Section Label"
                          value={content.includes.sectionLabel}
                          onChange={(v) =>
                            updateField("includes.sectionLabel", v)
                          }
                        />
                        <TextField
                          label="Section Heading"
                          value={content.includes.heading}
                          onChange={(v) => updateField("includes.heading", v)}
                        />
                      </div>
                      <ListEditor
                        label="Included Items"
                        items={content.includes.items}
                        onChange={(items) =>
                          updateField("includes.items", items)
                        }
                      />
                    </div>
                  )}

                  {/* ── INFO BOX(ES) + QUOTE ── */}
                  {(content.infoBox || content.quote) && (
                    <div className="bg-[#0d3a5e] border border-white/10 p-6">
                      <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                        <FileText size={14} className="text-[#b32025]" />
                        Info &amp; Quote
                      </h3>
                      <div className="space-y-4">
                        {content.infoBox && (
                          <div className="bg-white/3 border border-white/8 p-4 space-y-3">
                            <p className="text-[#b32025] text-[10px] uppercase tracking-widest font-bold">
                              Info Box
                            </p>
                            <TextField
                              label="Title"
                              value={content.infoBox.title}
                              onChange={(v) =>
                                updateField("infoBox.title", v)
                              }
                            />
                            <TextArea
                              label="Text"
                              value={content.infoBox.text}
                              onChange={(v) =>
                                updateField("infoBox.text", v)
                              }
                            />
                          </div>
                        )}
                        {content.infoBox2 && (
                          <div className="bg-white/3 border border-white/8 p-4 space-y-3">
                            <p className="text-[#b32025] text-[10px] uppercase tracking-widest font-bold">
                              Info Box 2
                            </p>
                            <TextField
                              label="Title"
                              value={content.infoBox2.title}
                              onChange={(v) =>
                                updateField("infoBox2.title", v)
                              }
                            />
                            <TextArea
                              label="Text"
                              value={content.infoBox2.text}
                              onChange={(v) =>
                                updateField("infoBox2.text", v)
                              }
                            />
                          </div>
                        )}
                        {content.quote && (
                          <div className="bg-white/3 border border-white/8 p-4 space-y-3">
                            <p className="text-[#b32025] text-[10px] uppercase tracking-widest font-bold">
                              Quote
                            </p>
                            <TextArea
                              label="Quote Text"
                              value={content.quote.text}
                              onChange={(v) =>
                                updateField("quote.text", v)
                              }
                            />
                            <TextField
                              label="Author"
                              value={content.quote.author}
                              onChange={(v) =>
                                updateField("quote.author", v)
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ── USE CASES ── */}
                  {content.useCases && (
                    <div className="bg-[#0d3a5e] border border-white/10 p-6">
                      <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                        <FileText size={14} className="text-[#b32025]" />
                        Use Cases
                      </h3>
                      <ListEditor
                        label="Use Case Items"
                        items={content.useCases}
                        onChange={(items) => updateField("useCases", items)}
                      />
                    </div>
                  )}

                  {/* ── CTA SECTION ── */}
                  {content.cta && (
                    <div className="bg-[#0d3a5e] border border-white/10 p-6">
                      <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                        <FileText size={14} className="text-[#b32025]" />
                        Bottom CTA Section
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TextField
                          label="CTA Headline"
                          value={content.cta.headline}
                          onChange={(v) => updateField("cta.headline", v)}
                        />
                        <TextField
                          label="CTA Button Text"
                          value={content.cta.ctaText}
                          onChange={(v) => updateField("cta.ctaText", v)}
                        />
                      </div>
                      <div className="mt-4">
                        <TextArea
                          label="CTA Description"
                          value={content.cta.description}
                          onChange={(v) => updateField("cta.description", v)}
                        />
                      </div>
                    </div>
                  )}

                  {/* ── SEO / META ── */}
                  {content.meta && (
                    <div className="bg-[#0d3a5e] border border-white/10 p-6">
                      <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                        <FileText size={14} className="text-[#b32025]" />
                        SEO / Meta Tags
                      </h3>
                      <div className="space-y-4">
                        <TextField
                          label="Page Title (browser tab)"
                          value={content.meta.title}
                          onChange={(v) => updateField("meta.title", v)}
                        />
                        <TextArea
                          label="Meta Description"
                          value={content.meta.description}
                          onChange={(v) => updateField("meta.description", v)}
                          rows={2}
                        />
                      </div>
                    </div>
                  )}

                  {/* ── Bottom Save ── */}
                  <div className="flex items-center justify-between pt-2 pb-8">
                    <p className="text-white/25 text-xs">
                      Editing: {currentPageMeta?.path}
                    </p>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex items-center gap-2 bg-[#b32025] hover:bg-[#8f1a1e] disabled:opacity-40 text-white text-sm font-bold uppercase tracking-wider px-8 py-3 transition-colors cursor-pointer"
                    >
                      {saving ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Save size={14} />
                      )}
                      {saving ? "Saving…" : "Save All Changes"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-20 text-white/30">
                  Select a page from the sidebar to begin editing.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════ PORTFOLIO TAB ══════════ */}
      {activeTab === "portfolio" && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-6">
            <h2 className="text-white text-2xl font-bold mb-1">
              Portfolio Gallery
            </h2>
            <p className="text-white/40 text-sm">
              Upload, view, and delete portfolio images stored in Cloudinary.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Form */}
            <div className="lg:col-span-1">
              <div className="bg-[#0d3a5e] border border-white/10 p-6">
                <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                  <Upload size={16} className="text-[#b32025]" />
                  Upload Image
                </h3>
                <p className="text-white/40 text-xs mb-5">
                  Images appear in the portfolio / our-work grid.
                </p>
                <form onSubmit={handlePortfolioUpload} className="space-y-4">
                  <div
                    onClick={() => portfolioFileRef.current?.click()}
                    className={`border-2 border-dashed rounded cursor-pointer transition-colors flex flex-col items-center justify-center p-6 min-h-[140px] ${uploadPreview ? "border-[#b32025]/40 bg-[#b32025]/5" : "border-white/15 hover:border-white/30 bg-white/3"}`}
                  >
                    {uploadPreview ? (
                      <div className="relative w-full h-28">
                        <Image
                          src={uploadPreview}
                          alt="Preview"
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <>
                        <ImageIcon size={28} className="text-white/20 mb-2" />
                        <span className="text-white/40 text-xs text-center">
                          Click to select image
                          <br />
                          <span className="text-white/25">
                            JPG, PNG, WebP · Max 10 MB
                          </span>
                        </span>
                      </>
                    )}
                  </div>
                  <input
                    ref={portfolioFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploadFile(file);
                      setUploadPreview(URL.createObjectURL(file));
                    }}
                  />
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="Title (optional)"
                    className="w-full bg-white/5 border border-white/15 text-white placeholder-white/25 px-3 py-2.5 text-sm focus:outline-none focus:border-[#b32025] transition-colors"
                  />
                  <div className="relative">
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="w-full appearance-none bg-white/5 border border-white/15 text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#b32025] transition-colors cursor-pointer"
                    >
                      {PORTFOLIO_CATEGORIES.map((c) => (
                        <option key={c} value={c} className="bg-[#0d3a5e]">
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!uploadFile || uploading}
                    className="w-full bg-[#b32025] hover:bg-[#8f1a1e] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold uppercase tracking-wider py-3 transition-colors cursor-pointer"
                  >
                    {uploading ? "Uploading…" : "Upload Image"}
                  </button>
                </form>
              </div>
            </div>

            {/* Image Grid */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">
                  Portfolio Images{" "}
                  <span className="text-white/30 font-normal text-sm">
                    ({portfolioImages.length})
                  </span>
                </h3>
                <button
                  onClick={() => loadPortfolio()}
                  className="text-white/30 hover:text-white text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Refresh
                </button>
              </div>

              {portfolioLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white/5 animate-pulse aspect-[4/3]"
                    />
                  ))}
                </div>
              ) : portfolioImages.length === 0 ? (
                <div className="border border-dashed border-white/10 rounded flex flex-col items-center justify-center py-20 text-center px-6">
                  <ImageIcon size={36} className="text-white/15 mb-3" />
                  <p className="text-white/30 text-sm">
                    No portfolio images yet.
                  </p>
                  <p className="text-white/20 text-xs mt-1">
                    Upload your first image using the form on the left.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {portfolioImages.map((img) => (
                    <div
                      key={img.publicId}
                      className="group relative bg-white/5 overflow-hidden"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={img.url}
                          alt={img.context?.title ?? "Portfolio image"}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, 33vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2">
                        {img.context?.title && (
                          <p className="text-white text-xs font-medium text-center px-2 truncate max-w-full">
                            {img.context.title}
                          </p>
                        )}
                        {img.context?.category && (
                          <span className="text-[#b32025] text-[10px] uppercase tracking-wider">
                            {img.context.category}
                          </span>
                        )}
                        <button
                          onClick={() => handlePortfolioDelete(img.publicId)}
                          disabled={deletingId === img.publicId}
                          className="flex items-center gap-1.5 bg-[#b32025] hover:bg-[#8f1a1e] disabled:opacity-50 text-white text-xs px-3 py-1.5 transition-colors cursor-pointer"
                        >
                          <Trash2 size={12} />
                          {deletingId === img.publicId
                            ? "Deleting…"
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
