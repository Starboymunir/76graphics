"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import BrandSwoosh from "@/components/BrandSwoosh";
import { useRouter } from "next/navigation";
import {
  HUBSPOT_QUOTE_FORM_ID,
  splitName,
  submitToHubSpot,
} from "@/lib/hubspot";

type Service = "Branding" | "Website" | "Vehicle Wrap" | "Signage" | "Promotional Products";

interface FormData {
  name: string;
  email: string;
  phone: string;
  services: Service[];
  vehicleType: string;
  wrapType: string;
  websitePages: string;
  hasExistingBranding: string;
  budget: string;
  timeline: string;
  goals: string;
}

const SERVICES: Service[] = [
  "Branding",
  "Website",
  "Vehicle Wrap",
  "Signage",
  "Promotional Products",
];

const BUDGETS = ["$500 – $1,500", "$1,500 – $5,000", "$5,000 – $10,000", "$10,000+"];
const TIMELINES = ["ASAP", "2 – 4 weeks", "1 – 3 months", "No rush, just planning"];

const INPUT =
  "w-full bg-white/5 border border-white/20 text-white placeholder-white/30 px-4 py-3.5 text-sm focus:outline-none focus:border-[#b32025] transition-colors duration-200";
const SELECT =
  "w-full bg-[#0d3a5e] border border-white/20 text-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#b32025] transition-colors duration-200";

const SLIDE = {
  initial: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  animate: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

export default function QuoteForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    services: [],
    vehicleType: "",
    wrapType: "Full Wrap",
    websitePages: "1 – 5 pages",
    hasExistingBranding: "No",
    budget: "",
    timeline: "",
    goals: "",
  });

  const set = (key: keyof FormData, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const toggleService = (s: Service) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));
  };

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your name.";
      if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Please enter a valid email.";
      if (!form.phone.match(/^[\d\s+\-()\\.]{7,20}$/)) e.phone = "Please enter a valid phone number.";
    }
    if (step === 2) {
      if (form.services.length === 0) e.services = "Please select at least one service.";
    }
    if (step === 4) {
      if (!form.budget) e.budget = "Please select a budget range.";
    }
    if (step === 5) {
      if (!form.timeline) e.timeline = "Please select a timeline.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate()) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, 6));
  }

  function back() {
    setDir(-1);
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  }

  async function submit() {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const { firstname, lastname } = splitName(form.name);
      // HubSpot multi-checkbox properties expect a semicolon-delimited string.
      const servicesValue = form.services.join(";");
      await submitToHubSpot(HUBSPOT_QUOTE_FORM_ID, {
        firstname,
        lastname,
        email: form.email,
        phone: form.phone,
        services_needed: servicesValue,
        vehicle_type: form.vehicleType,
        wrap_type: form.wrapType,
        website_pages: form.websitePages,
        has_existing_branding: form.hasExistingBranding,
        budget_range: form.budget,
        project_timeline: form.timeline,
        project_goals: form.goals,
      });
      router.push("/thank-you");
    } catch (err) {
      console.error("Quote form submission failed:", err);
      setErrors({
        submit:
          "Sorry, we couldn't send your request. Please try again or email hello@76graphics.com directly.",
      });
      setSubmitting(false);
    }
  }

  const totalSteps = 6;
  const showSkipDetails =
    step === 3 &&
    !form.services.includes("Vehicle Wrap") &&
    !form.services.includes("Website");

  return (
    <section id="contact" className="pt-0 pb-28 bg-[#092f4d] relative overflow-hidden brand-stars-bg">
      <BrandSwoosh position="top" />

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
              Get a
              <span
                className="block"
                style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}
              >
                Free Quote
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
            Most quotes are delivered within 24 hours.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-white/8"
        >
          {/* ─── Form ─── */}
          <div className="lg:col-span-3 bg-[#0d3a5e] p-8 lg:p-12 overflow-hidden">
            {/* Progress */}
            <div className="flex items-center justify-between mb-8">
              <span
                className="text-white/40 text-xs uppercase tracking-widest"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Step {step} of {totalSteps}
              </span>
              <div className="flex gap-1.5">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 transition-all duration-300 ${
                      i + 1 <= step
                        ? "bg-[#b32025] w-6"
                        : "bg-white/15 w-4"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative min-h-[340px]">
              <AnimatePresence mode="wait" custom={dir}>
                {/* ── Step 1: Basic Info ── */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={dir}
                    variants={SLIDE}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <h3
                      className="text-white text-xl uppercase mb-6"
                      style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
                    >
                      Let&apos;s start with the basics
                    </h3>
                    <div>
                      <input
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Full Name *"
                        className={INPUT}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                      {errors.name && <p className="text-[#ff6b6b] text-xs mt-1.5">{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="Email Address *"
                        className={INPUT}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                      {errors.email && <p className="text-[#ff6b6b] text-xs mt-1.5">{errors.email}</p>}
                    </div>
                    <div>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="Phone Number *"
                        className={INPUT}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                      {errors.phone && <p className="text-[#ff6b6b] text-xs mt-1.5">{errors.phone}</p>}
                    </div>
                  </motion.div>
                )}

                {/* ── Step 2: Services ── */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={dir}
                    variants={SLIDE}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <h3
                      className="text-white text-xl uppercase mb-2"
                      style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
                    >
                      What do you need?
                    </h3>
                    <p className="text-white/40 text-sm mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Select all that apply.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICES.map((s) => {
                        const active = form.services.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleService(s)}
                            className={`px-5 py-4 text-sm font-semibold uppercase tracking-wider border transition-all duration-200 text-left cursor-pointer ${
                              active
                                ? "bg-[#b32025] border-[#b32025] text-white"
                                : "bg-white/5 border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                            }`}
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {active ? "✓ " : ""}{s}
                          </button>
                        );
                      })}
                    </div>
                    {errors.services && (
                      <p className="text-[#ff6b6b] text-xs mt-3">{errors.services}</p>
                    )}
                  </motion.div>
                )}

                {/* ── Step 3: Project Details (dynamic) ── */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={dir}
                    variants={SLIDE}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <h3
                      className="text-white text-xl uppercase mb-6"
                      style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
                    >
                      Project Details
                    </h3>

                    {showSkipDetails && (
                      <div className="rounded border border-white/10 bg-white/5 p-6 space-y-3">
                        <p
                          className="text-[#b32025] text-xs font-bold tracking-[0.25em] uppercase"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {form.services.length === 0
                            ? "No services selected"
                            : "Nothing extra needed for these services"}
                        </p>
                        <p
                          className="text-white/60 text-sm leading-relaxed"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          We&apos;ll cover everything we need on our call. You can tell us
                          more about your project on the last step.
                        </p>
                        <p
                          className="text-white/40 text-xs"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          Click <span className="text-white">Next</span> to continue.
                        </p>
                      </div>
                    )}

                    {form.services.includes("Vehicle Wrap") && (
                      <div className="space-y-4">
                        <p className="text-[#b32025] text-xs font-bold tracking-[0.2em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Vehicle Wrap
                        </p>
                        <input
                          value={form.vehicleType}
                          onChange={(e) => set("vehicleType", e.target.value)}
                          placeholder="Vehicle type (e.g. Ford F-150, Sprinter Van)"
                          className={INPUT}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                        <select
                          value={form.wrapType}
                          onChange={(e) => set("wrapType", e.target.value)}
                          className={SELECT}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          <option>Full Wrap</option>
                          <option>Partial Wrap</option>
                          <option>Color Change</option>
                          <option>Fleet Wrap</option>
                          <option>Not sure yet</option>
                        </select>
                      </div>
                    )}

                    {form.services.includes("Website") && (
                      <div className="space-y-4">
                        <p className="text-[#b32025] text-xs font-bold tracking-[0.2em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Website
                        </p>
                        <select
                          value={form.websitePages}
                          onChange={(e) => set("websitePages", e.target.value)}
                          className={SELECT}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          <option>1 – 5 pages</option>
                          <option>5 – 10 pages</option>
                          <option>10+ pages</option>
                          <option>Not sure yet</option>
                        </select>
                        <select
                          value={form.hasExistingBranding}
                          onChange={(e) => set("hasExistingBranding", e.target.value)}
                          className={SELECT}
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          <option value="Yes">I already have a logo / branding</option>
                          <option value="No">I need branding too</option>
                        </select>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ── Step 4: Budget ── */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    custom={dir}
                    variants={SLIDE}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <h3
                      className="text-white text-xl uppercase mb-2"
                      style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
                    >
                      What&apos;s your budget?
                    </h3>
                    <p className="text-white/40 text-sm mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                      This helps us recommend the right solution for you.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {BUDGETS.map((b) => {
                        const active = form.budget === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => set("budget", b)}
                            className={`px-5 py-4 text-sm font-semibold tracking-wider border transition-all duration-200 text-left cursor-pointer ${
                              active
                                ? "bg-[#b32025] border-[#b32025] text-white"
                                : "bg-white/5 border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                            }`}
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {active ? "✓ " : ""}{b}
                          </button>
                        );
                      })}
                    </div>
                    {errors.budget && <p className="text-[#ff6b6b] text-xs mt-3">{errors.budget}</p>}
                  </motion.div>
                )}

                {/* ── Step 5: Timeline ── */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    custom={dir}
                    variants={SLIDE}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <h3
                      className="text-white text-xl uppercase mb-2"
                      style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
                    >
                      What&apos;s your timeline?
                    </h3>
                    <p className="text-white/40 text-sm mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                      When do you need this completed?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {TIMELINES.map((t) => {
                        const active = form.timeline === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => set("timeline", t)}
                            className={`px-5 py-4 text-sm font-semibold tracking-wider border transition-all duration-200 text-left cursor-pointer ${
                              active
                                ? "bg-[#b32025] border-[#b32025] text-white"
                                : "bg-white/5 border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                            }`}
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {active ? "✓ " : ""}{t}
                          </button>
                        );
                      })}
                    </div>
                    {errors.timeline && <p className="text-[#ff6b6b] text-xs mt-3">{errors.timeline}</p>}
                  </motion.div>
                )}

                {/* ── Step 6: Goals ── */}
                {step === 6 && (
                  <motion.div
                    key="step6"
                    custom={dir}
                    variants={SLIDE}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <h3
                      className="text-white text-xl uppercase mb-2"
                      style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
                    >
                      Tell us about your business
                    </h3>
                    <p className="text-white/40 text-sm mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                      What are your goals? The more you share, the better we can help.
                    </p>
                    <textarea
                      value={form.goals}
                      onChange={(e) => set("goals", e.target.value)}
                      placeholder="Tell us about your business, what you're trying to achieve, and any specific ideas you have..."
                      rows={7}
                      className={INPUT + " resize-none"}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={back}
                  className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors cursor-pointer"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <ArrowLeft size={14} />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={next}
                  className="group flex items-center gap-2 bg-[#b32025] hover:bg-[#8f1a1e] text-white text-sm font-bold uppercase tracking-[0.15em] px-8 py-3.5 transition-colors cursor-pointer"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Next
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="group flex items-center gap-2 bg-[#b32025] hover:bg-[#8f1a1e] disabled:opacity-50 text-white text-sm font-bold uppercase tracking-[0.15em] px-8 py-3.5 transition-colors cursor-pointer"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {submitting ? "Sending…" : "Start My Project"}
                  {!submitting && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              )}
            </div>

            {errors.submit && (
              <p
                className="text-[#ff6b6b] text-xs mt-3 text-center"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {errors.submit}
              </p>
            )}

            <p
              className="text-white/20 text-xs mt-4 text-center"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              No obligation. No pressure.
            </p>
          </div>

          {/* ─── Contact Info ─── */}
          <div className="lg:col-span-2 bg-[#061e31] p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <h3
                className="text-white uppercase text-lg mb-8"
                style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
              >
                Contact Us Directly
              </h3>

              <div className="space-y-6">
                {[
                  { Icon: Phone, label: "Phone", value: "(832) 876-3150" },
                  { Icon: Mail, label: "Email", value: "info@76graphics.com" },
                  { Icon: MapPin, label: "Location", value: "Houston, TX" },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-[#b32025]/10 border border-[#b32025]/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={15} className="text-[#b32025]" />
                    </div>
                    <div>
                      <p
                        className="text-white/30 text-[10px] uppercase tracking-widest mb-0.5"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-white text-sm"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 bg-[#b32025]/10 border border-[#b32025]/20 p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#b32025] shrink-0 mt-0.5" />
                <div>
                  <p
                    className="text-white text-sm font-semibold mb-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Fast Response Guarantee
                  </p>
                  <p
                    className="text-white/50 text-xs leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Most quotes are delivered within 24 hours. We take every project seriously.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
