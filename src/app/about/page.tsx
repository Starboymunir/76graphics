"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Zap, Award, Heart, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const VALUES = [
  {
    icon: Eye,
    title: "Critical Eye",
    description:
      "We scrutinise every detail before anything leaves our facility. Good enough is never good enough at 76 Graphics.",
  },
  {
    icon: Zap,
    title: "Hard Workers",
    description:
      "We out-work the competition. When you need it fast and done right, our team delivers — every single time.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Premium materials, expert installers, zero shortcuts. We hold ourselves to the highest standard in the industry.",
  },
  {
    icon: Heart,
    title: "Care",
    description:
      "Your brand is your livelihood. We treat every project with the same passion we'd bring to our own business.",
  },
  {
    icon: Shield,
    title: "Accountability",
    description:
      "We stand behind our work. If something isn't right, we make it right — no questions asked.",
  },
];

const STATS = [
  { num: "500+", label: "Projects Completed" },
  { num: "10+", label: "Years in Business" },
  { num: "200+", label: "Clients Served" },
  { num: "100%", label: "Satisfaction Rate" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* ── PAGE HERO ── */}
        <section className="relative bg-[#092f4d] brand-stars-bg overflow-hidden py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px bg-[#b32025]" />
              <span
                className="text-[#b32025] text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Who We Are
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white uppercase leading-none mb-6"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              }}
            >
              About
              <span className="block text-[#b32025]">76 Graphics</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-lg max-w-2xl leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We are a premium large format graphics studio built on precision, visibility,
              durability, and the relentless pursuit of excellence.
            </motion.p>
          </div>
        </section>

        {/* ── ORIGIN STORY ── */}
        <section className="bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="relative min-h-[440px] lg:min-h-0"
              >
                <Image
                  src="/portfolio/1Iuks3iUQRBzhIQWclmDb1aT5VGzw4Veg.jpg"
                  alt="76 Graphics wrap installation in shop"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="flex flex-col justify-center px-8 lg:px-14 xl:px-16 py-16 lg:py-20"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-[#b32025]" />
                  <span
                    className="text-[#b32025] text-xs font-semibold tracking-[0.25em] uppercase"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Our Story
                  </span>
                </div>

                <h2
                  className="text-[#092f4d] uppercase leading-none mb-7"
                  style={{
                    fontFamily: "'Apotek Extended', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  }}
                >
                  Crafted With
                  <span className="block text-[#b32025]">Precision</span>
                </h2>

                <p
                  className="text-[#374151] text-base leading-relaxed mb-5"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  76 Graphics was founded on a simple belief: that every business deserves
                  world-class graphics executed with the same precision as a custom-built machine.
                  What started as a passion for automotive wraps quickly grew into a full-service
                  large format graphics studio trusted by fleets, retailers, and brands nationwide.
                </p>

                <p
                  className="text-[#374151] text-base leading-relaxed mb-10"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Our in-house team handles everything from concept design to final installation,
                  ensuring zero compromise at every step. We use only 3M and Avery Dennison premium
                  materials, and every project is backed by our full satisfaction guarantee.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-[#b32025] hover:bg-[#8f181c] text-white px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-200 hover:-translate-y-0.5 self-start"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Work With Us
                  <ArrowRight size={15} />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="bg-[#092f4d] py-20 relative overflow-hidden brand-stars-bg">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div
                    className="text-white leading-none mb-2"
                    style={{
                      fontFamily: "'Apotek Extended', sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    className="text-white/50 text-xs tracking-[0.2em] uppercase"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="bg-[#f7f7f7] py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-3 mb-5"
              >
                <div className="w-8 h-px bg-[#b32025]" />
                <span
                  className="text-[#b32025] text-xs font-semibold tracking-[0.3em] uppercase"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  What Drives Us
                </span>
                <div className="w-8 h-px bg-[#b32025]" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-[#092f4d] uppercase leading-none"
                style={{
                  fontFamily: "'Apotek Extended', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                }}
              >
                Our Values
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {VALUES.map((value, i) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="bg-white border border-[#e5e7eb] p-8 hover:border-[#b32025]/30 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-[#092f4d] flex items-center justify-center mb-6 group-hover:bg-[#b32025] transition-colors duration-300">
                      <Icon size={22} className="text-white" />
                    </div>
                    <h3
                      className="text-[#092f4d] uppercase text-base leading-tight mb-3"
                      style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
                    >
                      {value.title}
                    </h3>
                    <p
                      className="text-[#6b7280] text-sm leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FACILITY / WORK PHOTOS ── */}
        <section className="bg-white py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-5"
                >
                  <div className="w-8 h-px bg-[#b32025]" />
                  <span
                    className="text-[#b32025] text-xs font-semibold tracking-[0.3em] uppercase"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Our Work
                  </span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-[#092f4d] uppercase leading-none"
                  style={{
                    fontFamily: "'Apotek Extended', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  }}
                >
                  Recent Projects
                </motion.h2>
              </div>
              <Link
                href="/our-work"
                className="inline-flex items-center gap-3 text-[#b32025] text-sm font-semibold tracking-[0.15em] uppercase hover:gap-5 transition-all duration-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                View Full Portfolio
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                "/portfolio/1YCPEuFx9FFkt3HnM_vkZMTT19VhMXldz.jpg",
                "/portfolio/1iOPICYZ38nQcQXetyU8VMYWCt-o-niBK.jpg",
                "/portfolio/1nus0QfhQQWxSsZukZDFM80Beyy8rM_J7.jpg",
                "/portfolio/1IW2u4MDufaJ6uvm_Nl79Dei1hWYTTmAV.jpg",
                "/portfolio/1kf79pi__xLmSnRamX4cLtJY_RVzgQx_I.jpg",
                "/portfolio/1RxHDGtB6_ycyky_Y4PPjy1B6F4zViWH4.jpg",
                "/portfolio/1ad97RBlWjZfO8dtu9vjpOmFjJnYdat4W.jpg",
                "/portfolio/1SuerDLKgEZsDJAjpuX_dpbNjkZHVV7L3.jpg",
              ].map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="relative overflow-hidden group"
                  style={{ paddingBottom: "75%" }}
                >
                  <Image
                    src={src}
                    alt="76 Graphics portfolio project"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="25vw"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CAREERS / CTA ── */}
        <section className="bg-[#092f4d] py-20 relative overflow-hidden brand-stars-bg">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-white uppercase mb-6 leading-none"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
              }}
            >
              Let&apos;s Build Something
              <span className="block text-[#b32025]">Together</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/60 text-lg mb-10 max-w-2xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Ready to elevate your brand with graphics that stop traffic? We would love to
              hear about your project.
            </motion.p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-[#b32025] hover:bg-[#8f181c] text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Start a Conversation
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
