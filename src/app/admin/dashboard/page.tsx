"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, Trash2, LogOut, ImageIcon, ChevronDown } from "lucide-react";

type Section = "portfolio" | "hero" | "about";

const SECTIONS: { key: Section; label: string; description: string }[] = [
  {
    key: "portfolio",
    label: "Portfolio",
    description: "Images shown in the portfolio / our-work grid. Upload your best projects here.",
  },
  {
    key: "hero",
    label: "Hero Background",
    description: "The full-screen background image on the homepage hero section.",
  },
  {
    key: "about",
    label: "About Section",
    description: "Image shown in the About section of the homepage.",
  },
];

const PORTFOLIO_CATEGORIES = [
  "Vehicle Wraps",
  "Branding",
  "Website Design",
  "Signage",
  "Promotional Products",
  "Other",
];

interface CloudinaryImage {
  publicId: string;
  url: string;
  width: number;
  height: number;
  createdAt: string;
  context?: Record<string, string>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>("portfolio");
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  // Upload form state
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Vehicle Wraps");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadImages = useCallback(async (section: Section) => {
    setLoading(true);
    setImages([]);
    try {
      const res = await fetch(`/api/admin/images?section=${section}`);
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch {
      /* empty */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages(activeSection);
  }, [activeSection, loadImages]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadFile(file);
    setUploadPreview(URL.createObjectURL(file));
    setUploadError("");
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!uploadFile) return;

    setUploading(true);
    setUploadError("");

    try {
      const fd = new FormData();
      fd.append("file", uploadFile);
      fd.append("section", activeSection);
      if (uploadTitle) fd.append("title", uploadTitle);
      if (activeSection === "portfolio") fd.append("category", uploadCategory);

      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });

      if (!res.ok) {
        const data = await res.json();
        setUploadError(data.error ?? "Upload failed");
        return;
      }

      setUploadFile(null);
      setUploadPreview(null);
      setUploadTitle("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSuccessMsg("Image uploaded successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
      loadImages(activeSection);
    } catch {
      setUploadError("Upload failed. Check your Cloudinary settings.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(publicId: string) {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    setDeletingId(publicId);
    try {
      await fetch("/api/admin/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
      setImages((prev) => prev.filter((img) => img.publicId !== publicId));
      setSuccessMsg("Image deleted.");
      setTimeout(() => setSuccessMsg(""), 2500);
    } catch {
      /* empty */
    } finally {
      setDeletingId(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const currentSection = SECTIONS.find((s) => s.key === activeSection)!;

  return (
    <div className="min-h-screen bg-[#06192b]" style={{ fontFamily: "'Inter', sans-serif" }}>
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Section Tabs ── */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-bold mb-1">Image Manager</h1>
          <p className="text-white/40 text-sm mb-6">
            Upload, view, and delete images for each section of your website.
          </p>
          <div className="flex gap-2 flex-wrap">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`px-5 py-2.5 text-sm font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                  activeSection === s.key
                    ? "bg-[#b32025] text-white"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Upload Form ── */}
          <div className="lg:col-span-1">
            <div className="bg-[#0d3a5e] border border-white/10 p-6">
              <h2 className="text-white font-semibold mb-1 flex items-center gap-2">
                <Upload size={16} className="text-[#b32025]" />
                Upload Image
              </h2>
              <p className="text-white/40 text-xs mb-5">{currentSection.description}</p>

              <form onSubmit={handleUpload} className="space-y-4">
                {/* File picker */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded cursor-pointer transition-colors flex flex-col items-center justify-center p-6 min-h-[140px] ${
                    uploadPreview
                      ? "border-[#b32025]/40 bg-[#b32025]/5"
                      : "border-white/15 hover:border-white/30 bg-white/3"
                  }`}
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
                        <span className="text-white/25">JPG, PNG, WebP · Max 10 MB</span>
                      </span>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Title */}
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="Title (optional)"
                  className="w-full bg-white/5 border border-white/15 text-white placeholder-white/25 px-3 py-2.5 text-sm focus:outline-none focus:border-[#b32025] transition-colors"
                />

                {/* Category — portfolio only */}
                {activeSection === "portfolio" && (
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
                )}

                {uploadError && (
                  <p className="text-[#ff6b6b] text-xs">{uploadError}</p>
                )}
                {successMsg && (
                  <p className="text-emerald-400 text-xs">{successMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={!uploadFile || uploading}
                  className="w-full bg-[#b32025] hover:bg-[#8f1a1e] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold uppercase tracking-wider py-3 transition-colors cursor-pointer"
                >
                  {uploading ? "Uploading…" : "Upload Image"}
                </button>
              </form>
            </div>

            {/* Tips */}
            <div className="mt-4 bg-white/3 border border-white/8 p-4">
              <p className="text-white/30 text-xs leading-relaxed">
                <strong className="text-white/50">Tips:</strong> Use JPG or WebP for photos. Ideal
                size is 1200×900px or larger for portfolio images. Images appear on your site
                within a minute of uploading.
              </p>
            </div>
          </div>

          {/* ── Image Grid ── */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">
                Current Images{" "}
                <span className="text-white/30 font-normal text-sm">({images.length})</span>
              </h2>
              <button
                onClick={() => loadImages(activeSection)}
                className="text-white/30 hover:text-white text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white/5 animate-pulse aspect-[4/3]" />
                ))}
              </div>
            ) : images.length === 0 ? (
              <div className="border border-dashed border-white/10 rounded flex flex-col items-center justify-center py-20 text-center px-6">
                <ImageIcon size={36} className="text-white/15 mb-3" />
                <p className="text-white/30 text-sm">No images yet in this section.</p>
                <p className="text-white/20 text-xs mt-1">
                  Upload your first image using the form on the left.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img) => (
                  <div key={img.publicId} className="group relative bg-white/5 overflow-hidden">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={img.url}
                        alt={img.context?.title ?? "Portfolio image"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                    </div>
                    {/* Overlay on hover */}
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
                        onClick={() => handleDelete(img.publicId)}
                        disabled={deletingId === img.publicId}
                        className="flex items-center gap-1.5 bg-[#b32025] hover:bg-[#8f1a1e] disabled:opacity-50 text-white text-xs px-3 py-1.5 transition-colors cursor-pointer"
                      >
                        <Trash2 size={12} />
                        {deletingId === img.publicId ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
