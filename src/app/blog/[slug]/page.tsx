import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

interface Params {
  slug: string;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found | 76 Graphics" };
  return {
    title: `${post.title} | 76 Graphics Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post || !post.published) notFound();

  const others = getBlogPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  // Split body into paragraphs by blank lines
  const paragraphs = post.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#031827] text-white overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#031827_0%,#092f4d_55%,#031827_100%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/55 hover:text-white text-xs font-bold uppercase tracking-[0.22em] mb-8 transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>
          <p
            className="text-[#ff6f73] text-xs font-bold tracking-[0.35em] uppercase mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {post.category}
          </p>
          <h1
            className="uppercase leading-[0.92] mb-6"
            style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5.5vw, 4rem)", letterSpacing: "-0.01em" }}
          >
            {post.title}
          </h1>
          <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-3xl" style={{ fontFamily: "'Inter', sans-serif" }}>
            {post.excerpt}
          </p>
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-white/55 text-xs uppercase tracking-[0.18em] pb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="inline-flex items-center gap-2">
              <User size={13} className="text-[#ff6f73]" /> {post.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar size={13} className="text-[#ff6f73]" /> {formatDate(post.date)}
            </span>
            {post.tags.length > 0 && (
              <span className="inline-flex items-center gap-2">
                <Tag size={13} className="text-[#ff6f73]" /> {post.tags.join(" · ")}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* COVER */}
      {post.cover && (
        <section className="bg-[#031827]">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="relative aspect-[16/9] overflow-hidden border border-white/10 rounded-[14px] bg-[#061e31]">
              <Image src={post.cover} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" priority />
            </div>
          </div>
        </section>
      )}

      {/* BODY */}
      <article className="bg-[#031827] py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 space-y-6">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-white/85 text-lg leading-[1.75]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {p}
            </p>
          ))}
        </div>
      </article>

      {/* MORE */}
      {others.length > 0 && (
        <section className="bg-[#02101a] py-16 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <h2
              className="uppercase mb-10"
              style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              More From The Blog
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {others.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden border border-white/10 rounded-[12px] bg-[#061e31] mb-4">
                    {p.cover && (
                      <Image src={p.cover} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="(max-width:1024px) 50vw, 33vw" />
                    )}
                  </div>
                  <p className="text-[#ff6f73] text-[10px] font-bold uppercase tracking-[0.22em] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {p.category}
                  </p>
                  <h3
                    className="uppercase leading-tight group-hover:text-[#ff6f73] transition-colors"
                    style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700, fontSize: "1.15rem" }}
                  >
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}
