"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Loader2,
  Upload,
  Camera,
  X,
} from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  category: string;
  tags: string[];
  date: string;
  body: string;
  published: boolean;
}

const EMPTY: BlogPost = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  cover: "",
  author: "76 Graphics",
  category: "Studio",
  tags: [],
  date: new Date().toISOString().slice(0, 10),
  body: "",
  published: false,
};

const CATEGORIES = [
  "Studio",
  "Vehicle Wraps",
  "Branding",
  "Website Design",
  "Industry Insights",
  "Tutorials",
];

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [active, setActive] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  function newPost() {
    setActive({ ...EMPTY, id: `post-${Date.now()}` });
  }

  async function save() {
    if (!active) return;
    if (!active.title.trim()) return alert("Title required");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(active),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error ?? "Save failed");
        return;
      }
      const { post } = await res.json();
      setActive(post);
      await loadPosts();
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/blog?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (res.ok) {
      if (active?.id === id) setActive(null);
      await loadPosts();
    }
  }

  async function uploadCover(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) {
        alert("Upload failed");
        return;
      }
      const { url } = await res.json();
      if (active && url) setActive({ ...active, cover: url });
    } finally {
      setUploading(false);
    }
  }

  function addTag() {
    if (!active) return;
    const t = tagInput.trim();
    if (!t || active.tags.includes(t)) return;
    setActive({ ...active, tags: [...active.tags, t] });
    setTagInput("");
  }

  function removeTag(t: string) {
    if (!active) return;
    setActive({ ...active, tags: active.tags.filter((x) => x !== t) });
  }

  return (
    <div className="min-h-screen bg-[#0a1929] text-white">
      <header className="border-b border-white/10 bg-[#061520]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs uppercase tracking-[0.2em]"
            >
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <h1 className="text-lg uppercase tracking-[0.2em]" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}>
              Blog
            </h1>
          </div>
          <button
            onClick={newPost}
            className="inline-flex items-center gap-2 bg-[#b32025] hover:bg-[#8f181c] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]"
          >
            <Plus size={14} /> New Post
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-12 gap-8">
        {/* List */}
        <aside className="lg:col-span-4 xl:col-span-3">
          <h2 className="text-xs uppercase tracking-[0.22em] text-white/50 mb-4">All Posts ({posts.length})</h2>
          <div className="space-y-2">
            {loading ? (
              <div className="text-white/40 text-sm flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Loading…</div>
            ) : posts.length === 0 ? (
              <p className="text-white/40 text-sm">No posts yet. Click "New Post".</p>
            ) : (
              posts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActive(p)}
                  className={`w-full text-left p-3 border transition-colors ${
                    active?.id === p.id
                      ? "border-[#b32025] bg-[#b32025]/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{p.title || "Untitled"}</p>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 mt-1">
                        {p.date} · {p.category}
                      </p>
                    </div>
                    {p.published ? (
                      <Eye size={13} className="text-emerald-400 mt-1" aria-label="Published" />
                    ) : (
                      <EyeOff size={13} className="text-white/30 mt-1" aria-label="Draft" />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Editor */}
        <main className="lg:col-span-8 xl:col-span-9">
          {!active ? (
            <div className="border border-white/10 bg-white/[0.02] p-12 text-center text-white/50">
              <p className="text-sm">Select a post to edit, or create a new one.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Title + slug + meta */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Title">
                  <input
                    type="text"
                    value={active.title}
                    onChange={(e) => setActive({ ...active, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-sm focus:border-[#b32025] outline-none"
                    placeholder="Post title"
                  />
                </Field>
                <Field label="Slug (URL)">
                  <input
                    type="text"
                    value={active.slug}
                    onChange={(e) => setActive({ ...active, slug: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-sm focus:border-[#b32025] outline-none"
                    placeholder="auto-from-title"
                  />
                </Field>
                <Field label="Author">
                  <input
                    type="text"
                    value={active.author}
                    onChange={(e) => setActive({ ...active, author: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-sm focus:border-[#b32025] outline-none"
                  />
                </Field>
                <Field label="Date">
                  <input
                    type="date"
                    value={active.date}
                    onChange={(e) => setActive({ ...active, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-sm focus:border-[#b32025] outline-none"
                  />
                </Field>
                <Field label="Category">
                  <select
                    value={active.category}
                    onChange={(e) => setActive({ ...active, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-sm focus:border-[#b32025] outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} className="bg-[#0a1929]">
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Status">
                  <label className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={active.published}
                      onChange={(e) => setActive({ ...active, published: e.target.checked })}
                    />
                    <span className="text-sm">{active.published ? "Published" : "Draft"}</span>
                  </label>
                </Field>
              </div>

              {/* Cover */}
              <Field label="Cover Image">
                <div
                  onClick={() => !uploading && fileRef.current?.click()}
                  className="relative aspect-[16/9] bg-white/5 border border-white/10 overflow-hidden cursor-pointer group hover:border-white/25"
                >
                  {active.cover ? (
                    <>
                      <Image src={active.cover} alt="Cover" fill className="object-cover" sizes="800px" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        {uploading ? (
                          <Loader2 size={24} className="animate-spin" />
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <Camera size={22} />
                            <span className="text-xs">Change Image</span>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-1">
                      {uploading ? (
                        <Loader2 size={24} className="text-white/40 animate-spin" />
                      ) : (
                        <>
                          <Upload size={22} className="text-white/30" />
                          <span className="text-xs text-white/40">Click to upload cover</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void uploadCover(f);
                    e.target.value = "";
                  }}
                />
              </Field>

              <Field label="Excerpt (1–2 sentences shown in lists)">
                <textarea
                  value={active.excerpt}
                  onChange={(e) => setActive({ ...active, excerpt: e.target.value })}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-sm focus:border-[#b32025] outline-none resize-none"
                />
              </Field>

              <Field label="Body (separate paragraphs with a blank line)">
                <textarea
                  value={active.body}
                  onChange={(e) => setActive({ ...active, body: e.target.value })}
                  rows={16}
                  className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-sm focus:border-[#b32025] outline-none font-mono leading-relaxed"
                />
              </Field>

              <Field label="Tags">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {active.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 bg-[#b32025]/15 border border-[#b32025]/40 px-2.5 py-1 text-xs"
                    >
                      {t}
                      <button onClick={() => removeTag(t)} className="hover:text-[#ff6f73]">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Add tag and press Enter"
                    className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-[#b32025] outline-none"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="bg-white/10 hover:bg-white/20 px-4 text-xs uppercase tracking-[0.16em]"
                  >
                    Add
                  </button>
                </div>
              </Field>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={save}
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-[#b32025] hover:bg-[#8f181c] disabled:opacity-50 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em]"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  Save Post
                </button>
                {active.slug && active.published && (
                  <Link
                    href={`/blog/${active.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 border border-white/20 hover:border-white px-5 py-3 text-xs font-bold uppercase tracking-[0.16em]"
                  >
                    <Eye size={13} /> View Live
                  </Link>
                )}
                {active.id && posts.some((p) => p.id === active.id) && (
                  <button
                    onClick={() => remove(active.id)}
                    className="inline-flex items-center gap-2 border border-red-500/40 hover:bg-red-500/15 text-red-300 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] ml-auto"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-white/55 text-[10px] uppercase tracking-[0.22em] font-bold mb-2">{label}</label>
      {children}
    </div>
  );
}
