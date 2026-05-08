import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "The Blog | 76 Graphics",
  description:
    "Field notes from the 76 Graphics shop — wrap craft, brand strategy, materials, and the work behind the work.",
};

export default function BlogIndexPage() {
  const posts = getBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-[#031827] text-white overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(179,32,37,0.28),transparent_28%),radial-gradient(circle_at_15%_70%,rgba(86,127,167,0.18),transparent_28%),linear-gradient(135deg,#031827_0%,#092f4d_55%,#02101a_100%)]" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-white/[0.04] uppercase pointer-events-none select-none text-center whitespace-nowrap"
          style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(7rem, 20vw, 18rem)", lineHeight: 0.85 }}
        >
          Field Notes
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-2 bg-[linear-gradient(90deg,#b32025_0%,#ffffff_45%,#285493_100%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <p
            className="text-[#ff6f73] text-xs font-bold tracking-[0.35em] uppercase mb-5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            The 76 Graphics Blog
          </p>
          <h1
            className="uppercase leading-[0.84] mb-8 max-w-5xl"
            style={{
              fontFamily: "'Apotek Extended', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.6rem, 7vw, 6rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Notes From
            <span className="block text-transparent" style={{ WebkitTextStroke: "2px #b32025" }}>
              The Shop Floor
            </span>
          </h1>
          <p
            className="text-white/75 text-lg leading-relaxed max-w-3xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Wraps, branding, materials, and the craft behind everything we make.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      {featured && (
        <section className="bg-[#031827] py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid lg:grid-cols-12 gap-10 items-center"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden border border-white/10 rounded-[18px] bg-[#061e31]">
                {featured.cover && (
                  <Image
                    src={featured.cover}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                <span
                  className="absolute top-5 left-5 bg-[#b32025] text-white text-[10px] font-bold tracking-[0.22em] uppercase px-3 py-1.5"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Featured
                </span>
              </div>
              <div className="lg:col-span-5">
                <div
                  className="flex items-center gap-3 text-white/55 text-xs uppercase tracking-[0.2em] mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span className="text-[#ff6f73] font-bold">{featured.category}</span>
                  <span className="w-px h-3 bg-white/20" />
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={12} />
                    {formatDate(featured.date)}
                  </span>
                </div>
                <h2
                  className="uppercase leading-[0.95] mb-4"
                  style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)" }}
                >
                  {featured.title}
                </h2>
                <p className="text-white/70 leading-relaxed text-base mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {featured.excerpt}
                </p>
                <span
                  className="inline-flex items-center gap-2 text-[#ff6f73] text-xs font-bold tracking-[0.2em] uppercase group-hover:gap-3 transition-all"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Read the post
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* GRID */}
      <section className="py-16 bg-[#031827]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {rest.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border border-white/10 rounded-[14px] bg-[#061e31] mb-5">
                    {post.cover && (
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                  </div>
                  <div
                    className="flex items-center gap-3 text-white/50 text-[11px] uppercase tracking-[0.2em] mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <span className="text-[#ff6f73] font-bold">{post.category}</span>
                    <span className="w-px h-3 bg-white/20" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <h3
                    className="uppercase leading-tight mb-2 group-hover:text-[#ff6f73] transition-colors"
                    style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700, fontSize: "1.4rem" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          ) : !featured ? (
            <p className="text-white/55 text-center py-20" style={{ fontFamily: "'Inter', sans-serif" }}>
              No posts yet. Check back soon.
            </p>
          ) : null}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
