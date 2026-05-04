"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  HUBSPOT_CONTACT_FORM_ID,
  splitName,
  submitToHubSpot,
} from "@/lib/hubspot";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .regex(/^[\d\s+\-()]{7,20}$/, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  message: z
    .string()
    .min(10, "Please provide a brief description (10+ characters)"),
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
  "w-full bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-3.5 text-sm focus:outline-none focus:border-[#b32025] transition-colors duration-200";

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: "(800) 663-6007",
    href: "tel:+18006636007",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@76graphics.com",
    href: "mailto:info@76graphics.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Greater Metropolitan Area",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri 8am–6pm",
    href: null,
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      const { firstname, lastname } = splitName(data.name);
      await submitToHubSpot(HUBSPOT_CONTACT_FORM_ID, {
        firstname,
        lastname,
        company: data.company ?? "",
        email: data.email,
        phone: data.phone,
        service_interested_in: data.service,
        message: data.message,
      });
      setSubmitted(true);
      reset();
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setSubmitError(
        "Sorry, we couldn't send your message. Please try again or email info@76graphics.com directly."
      );
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* ── PAGE HERO ── */}
        <section className="relative bg-[#092f4d] brand-stars-bg overflow-hidden py-24 lg:py-32">
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
                Start Your Project
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
              Request
              <span className="block text-[#b32025]">A Quote</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-lg max-w-2xl leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Tell us about your project and we will respond with a detailed quote within
              24 hours — usually the same day.
            </motion.p>
          </div>
        </section>

        {/* ── CONTACT FORM + INFO ── */}
        <section className="bg-[#092f4d] pb-24 relative overflow-hidden brand-stars-bg">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-white/10"
            >
              {/* ── FORM ── */}
              <div className="lg:col-span-3 bg-[#0a2d49] p-8 lg:p-12">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
                    <CheckCircle2 size={56} className="text-[#b32025] mb-6" />
                    <h3
                      className="text-white text-2xl uppercase mb-3"
                      style={{
                        fontFamily: "'Apotek Extended', sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      Message Received!
                    </h3>
                    <p
                      className="text-white/60 text-base max-w-sm"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      We&apos;ll review your request and get back to you within 1
                      business day.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-8 border border-white/30 hover:border-white text-white/70 hover:text-white text-xs px-8 py-3.5 tracking-[0.2em] uppercase transition-colors duration-200 cursor-pointer"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <>
                    <h2
                      className="text-white text-xl uppercase mb-8"
                      style={{
                        fontFamily: "'Apotek Extended', sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      Project Details
                    </h2>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5"
                      noValidate
                    >
                      {/* Name + Company */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <input
                            {...register("name")}
                            placeholder="Full Name *"
                            className={INPUT_CLASS}
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          />
                          {errors.name && (
                            <p
                              className="text-red-400 text-xs mt-1.5"
                              style={{ fontFamily: "'Inter', sans-serif" }}
                            >
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

                      {/* Email + Phone */}
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
                            <p
                              className="text-red-400 text-xs mt-1.5"
                              style={{ fontFamily: "'Inter', sans-serif" }}
                            >
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
                            <p
                              className="text-red-400 text-xs mt-1.5"
                              style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Service */}
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
                            <path
                              d="M1 1l6 6 6-6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        {errors.service && (
                          <p
                            className="text-red-400 text-xs mt-1.5"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {errors.service.message}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <textarea
                          {...register("message")}
                          rows={5}
                          placeholder="Tell us about your project — vehicle type, quantity, timeline, any specifics... *"
                          className={`${INPUT_CLASS} resize-none`}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                        {errors.message && (
                          <p
                            className="text-red-400 text-xs mt-1.5"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#b32025] hover:bg-[#8f181c] disabled:opacity-50 text-white py-4 text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-200 flex items-center justify-center gap-3 cursor-pointer"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {isSubmitting ? (
                          "Sending…"
                        ) : (
                          <>
                            Send Request
                            <Send size={15} />
                          </>
                        )}
                      </button>
                      {submitError && (
                        <p
                          className="text-red-400 text-xs text-center"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {submitError}
                        </p>
                      )}
                    </form>
                  </>
                )}
              </div>

              {/* ── CONTACT INFO ── */}
              <div className="lg:col-span-2 bg-[#061e31] p-8 lg:p-10 flex flex-col">
                {/* Logo */}
                <div className="mb-10">
                  <Image
                    src="/logos/76Graphics_Primary-White.svg"
                    alt="76 Graphics"
                    width={140}
                    height={44}
                    className="h-10 w-auto"
                  />
                </div>

                <h3
                  className="text-white text-lg uppercase mb-8"
                  style={{
                    fontFamily: "'Apotek Extended', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Get In Touch
                </h3>

                <div className="space-y-6 mb-10">
                  {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#b32025]/15 border border-[#b32025]/30 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-[#b32025]" />
                      </div>
                      <div>
                        <div
                          className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1"
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
                          <span
                            className="text-white text-sm"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-8 mt-auto">
                  <p
                    className="text-white/40 text-xs mb-4 tracking-wide"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Not sure which service you need?
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-white text-sm font-semibold tracking-[0.15em] uppercase hover:text-[#b32025] transition-colors duration-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Browse All Services
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
