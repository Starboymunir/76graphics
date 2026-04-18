"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import BrandSwoosh from "@/components/BrandSwoosh";
import Image from "next/image";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .regex(/^[\d\s\+\-\(\)]{7,20}$/, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Please provide a brief description (10+ characters)"),
});

type FormData = z.infer<typeof schema>;

const SERVICES = [
  "Commercial Vehicle Wraps",
  "Fleet Wrapping",
  "Architectural / Interior Graphics",
  "Window Films",
  "Trade Show / Event Displays",
  "Brand Activation",
  "Paint Protection Film",
  "Custom / Other",
];

const INPUT_CLASS =
  "w-full bg-white/5 border border-white/20 text-white placeholder-white/30 px-4 py-3.5 text-sm focus:outline-none focus:border-[#b32025] transition-colors duration-200";

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    // Simulate API call — replace with real endpoint
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Quote request:", data);
    setSubmitted(true);
    reset();
  };

  return (
    <section id="contact" className="pt-0 pb-28 bg-[#092f4d] relative overflow-hidden brand-stars-bg">
      {/* Brand swoosh at top — full-width bands */}
      <BrandSwoosh position="top" />

      {/* Diagonal red accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background: "linear-gradient(to bottom-left, rgba(179,32,37,0.06) 0%, transparent 60%)"
        }}
      />

      {/* Giant background number */}
      <div
        aria-hidden="true"
        className="absolute -left-10 bottom-0 select-none pointer-events-none"
        style={{
          fontFamily: "'Apotek Extended', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(14rem, 30vw, 36rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.03)",
          lineHeight: 0.9,
        }}
      >
        76
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-14 pt-28 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-10 h-[3px] bg-[#b32025]" />
              <span
                className="text-[#b32025] text-xs font-bold tracking-[0.35em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Start Your Project
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-white uppercase leading-[0.88]"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
              }}
            >
              Request
              <span
                className="block"
                style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}
              >
                a Quote
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/35 text-sm leading-relaxed max-w-xs"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            We respond to all quote requests within 1 business day.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-white/8 mt-0"
        >
          {/* ─── Form ─── */}
          <div className="lg:col-span-3 bg-[#0d3a5e] p-8 lg:p-12">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <CheckCircle2 size={56} className="text-[#b32025] mb-6" />
                <h3
                  className="text-white text-2xl uppercase mb-3"
                  style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
                >
                  Message Received!
                </h3>
                <p
                  className="text-white/60 text-base"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  We&apos;ll review your request and get back to you within 1 business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 border border-white/30 hover:border-white text-white/70 hover:text-white text-sm px-6 py-3 tracking-widest uppercase transition-colors duration-200 cursor-pointer"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      {...register("name")}
                      placeholder="Full Name *"
                      className={INPUT_CLASS}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                    {errors.name && (
                      <p className="text-[#ff6b6b] text-xs mt-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register("company")}
                      placeholder="Company (optional)"
                      className={INPUT_CLASS}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Email Address *"
                      className={INPUT_CLASS}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                    {errors.email && (
                      <p className="text-[#ff6b6b] text-xs mt-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="Phone Number *"
                      className={INPUT_CLASS}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                    {errors.phone && (
                      <p className="text-[#ff6b6b] text-xs mt-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <select
                      {...register("service")}
                      defaultValue=""
                      className={`${INPUT_CLASS} appearance-none pr-10 cursor-pointer`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <option value="" disabled className="bg-[#092f4d]">
                        Service Needed *
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s} className="bg-[#092f4d]">
                          {s}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                      <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                        <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  {errors.service && (
                    <p className="text-[#ff6b6b] text-xs mt-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {errors.service.message}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell us about your project — vehicle count, timeline, location, etc. *"
                    className={`${INPUT_CLASS} resize-none`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                  {errors.message && (
                    <p className="text-[#ff6b6b] text-xs mt-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full bg-[#b32025] hover:bg-[#8f181c] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(179,32,37,0.45)] flex items-center justify-center gap-3 cursor-pointer overflow-hidden"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span className="relative z-10">{isSubmitting ? "Sending…" : "Send Request"}</span>
                  {!isSubmitting && <Send size={14} className="relative z-10 transition-transform duration-200 group-hover:translate-x-1" />}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                </button>
              </form>
            )}
          </div>

          {/* ─── Contact Info ─── */}
          <div className="lg:col-span-2 bg-[#061e31] p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <h3
                className="text-white text-xl uppercase mb-8"
                style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
              >
                Get In Touch
              </h3>

              <div className="space-y-7">
                {[
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+1 (555) 000-0000",
                    href: "tel:+15550000000",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hello@76graphics.com",
                    href: "mailto:hello@76graphics.com",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Serving clients nationwide",
                    href: null,
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#b32025]/15 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[#b32025]" />
                    </div>
                    <div>
                      <div
                        className="text-white/40 text-xs tracking-widest uppercase mb-1"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          className="text-white text-sm hover:text-[#b32025] transition-colors duration-200"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {value}
                        </a>
                      ) : (
                        <p
                          className="text-white text-sm"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business hours */}
            <div className="mt-12 border-t border-white/10 pt-8">
              <h4
                className="text-white/40 text-xs tracking-widest uppercase mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Business Hours
              </h4>
              {[
                { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
                { day: "Saturday", hours: "9:00 AM – 3:00 PM" },
                { day: "Sunday", hours: "Closed" },
              ].map((row) => (
                <div
                  key={row.day}
                  className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span className="text-white/60 text-sm">{row.day}</span>
                  <span className="text-white text-sm font-medium">{row.hours}</span>
                </div>
              ))}
            </div>

            {/* Response time */}
            <div className="mt-8 bg-[#b32025]/10 border border-[#b32025]/20 px-5 py-4">
              <p
                className="text-white/80 text-sm leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                We respond to all quote requests within{" "}
                <span className="text-[#b32025] font-semibold">1 business day</span>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
