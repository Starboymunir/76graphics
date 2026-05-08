import fs from "fs";
import path from "path";

const BLOG_PATH = path.join(process.cwd(), "data", "blog.json");

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  category: string;
  tags: string[];
  date: string; // ISO yyyy-mm-dd
  body: string; // markdown-flavored plain text (paragraphs split by blank line)
  published: boolean;
}

function readAll(): BlogPost[] {
  if (!fs.existsSync(BLOG_PATH)) return [];
  try {
    const raw = fs.readFileSync(BLOG_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(posts: BlogPost[]): void {
  fs.writeFileSync(BLOG_PATH, JSON.stringify(posts, null, 2), "utf-8");
}

export function getBlogPosts(opts: { includeUnpublished?: boolean } = {}): BlogPost[] {
  const all = readAll();
  const filtered = opts.includeUnpublished ? all : all.filter((p) => p.published);
  return filtered.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPost(slug: string): BlogPost | null {
  return readAll().find((p) => p.slug === slug) ?? null;
}

export function upsertBlogPost(post: BlogPost): BlogPost {
  const all = readAll();
  const idx = all.findIndex((p) => p.id === post.id);
  if (idx >= 0) all[idx] = post;
  else all.unshift(post);
  writeAll(all);
  return post;
}

export function deleteBlogPost(id: string): boolean {
  const all = readAll();
  const filtered = all.filter((p) => p.id !== id);
  if (filtered.length === all.length) return false;
  writeAll(filtered);
  return true;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
