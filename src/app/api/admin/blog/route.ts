import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getBlogPosts,
  upsertBlogPost,
  deleteBlogPost,
  slugify,
  type BlogPost,
} from "@/lib/blog";

export async function GET() {
  return NextResponse.json(getBlogPosts({ includeUnpublished: true }));
}

export async function PUT(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as Partial<BlogPost> | null;
  if (!body || !body.title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }
  const id = body.id ?? `post-${Date.now()}`;
  const slug = body.slug && body.slug.length > 0 ? slugify(body.slug) : slugify(body.title);
  const post: BlogPost = {
    id,
    slug,
    title: body.title,
    excerpt: body.excerpt ?? "",
    cover: body.cover ?? "",
    author: body.author ?? "76 Graphics",
    category: body.category ?? "Studio",
    tags: Array.isArray(body.tags) ? body.tags : [],
    date: body.date ?? new Date().toISOString().slice(0, 10),
    body: body.body ?? "",
    published: body.published ?? false,
  };
  upsertBlogPost(post);
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  return NextResponse.json({ success: true, post });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const ok = deleteBlogPost(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/blog");
  return NextResponse.json({ success: true });
}
