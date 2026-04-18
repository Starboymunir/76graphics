"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ChevronDown, Info, ArrowRight } from "lucide-react";

// ─── Pricing Data ────────────────────────────────────────────────────────────

const VEHICLE_TYPES = [
  { id: "sedan", label: "Sedan / Coupe", basePrice: 1200 },
  { id: "suv", label: "SUV / Crossover", basePrice: 1600 },
  { id: "truck", label: "Pickup Truck", basePrice: 1500 },
  { id: "van", label: "Full-Size Van", basePrice: 2400 },
  { id: "box", label: "Box Truck", basePrice: 3200 },
  { id: "semi", label: "Semi-Truck / Trailer", basePrice: 5500 },
];

const COVERAGE_OPTIONS = [
  { id: "partial_25", label: "Partial Wrap — 25%", multiplier: 0.3 },
  { id: "partial_50", label: "Partial Wrap — 50%", multiplier: 0.55 },
  { id: "partial_75", label: "Partial Wrap — 75%", multiplier: 0.8 },
  { id: "full", label: "Full Wrap — 100%", multiplier: 1 },
];

const MATERIALS = [
  {
    id: "standard",
    label: "Standard Cast Vinyl",
    description: "5–7 year lifespan. Great for short-term and budget wraps.",
    multiplier: 1,
  },
  {
    id: "premium",
    label: "3M 2080 Series",
    description: "10+ year lifespan. Our most popular premium wrap film.",
    multiplier: 1.25,
  },
  {
    id: "color_shift",
    label: "Color-Shift / Chrome",
    description: "Specialty film with unique visual effects. Bold statement.",
    multiplier: 1.6,
  },
  {
    id: "ppf",
    label: "Paint Protection Film",
    description: "Self-healing clear film. Protects factory paint.",
    multiplier: 1.8,
  },
];

const ADDONS = [
  { id: "design", label: "Custom Design Work", price: 350 },
  { id: "remove", label: "Old Wrap Removal", price: 250 },
  { id: "rush", label: "Rush Turnaround (48hr)", price: 500 },
  { id: "ceramic", label: "Ceramic Coating", price: 400 },
  { id: "gloss", label: "Gloss Laminate Finish", price: 150 },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function CalculatorSection() {
  const [vehicleId, setVehicleId] = useState("sedan");
  const [coverageId, setCoverageId] = useState("full");
  const [materialId, setMaterialId] = useState("premium");
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());

  const vehicle = VEHICLE_TYPES.find((v) => v.id === vehicleId)!;
  const coverage = COVERAGE_OPTIONS.find((c) => c.id === coverageId)!;
  const material = MATERIALS.find((m) => m.id === materialId)!;
  const addonTotal = ADDONS.filter((a) => selectedAddons.has(a.id)).reduce(
    (s, a) => s + a.price,
    0
  );

  const { low, high } = useMemo(() => {
    const base = vehicle.basePrice * coverage.multiplier * material.multiplier + addonTotal;
    return { low: Math.round(base * 0.9), high: Math.round(base * 1.1) };
  }, [vehicle, coverage, material, addonTotal]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const scrollToQuote = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="calculator" className="py-28 bg-[#092f4d]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[#b32025] text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Instant Estimate
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white text-4xl sm:text-5xl uppercase leading-none mb-6"
            style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
          >
            Wrap Price
            <span className="text-[#b32025]"> Calculator</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/60 text-base leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Get an instant ballpark estimate. Exact pricing provided in your custom quote.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 xl:grid-cols-5 gap-px bg-white/10"
        >
          {/* ─── Left — Controls ─── */}
          <div className="xl:col-span-3 bg-[#0d3a5e] p-8 lg:p-12 space-y-10">
            {/* Vehicle Type */}
            <div>
              <label
                className="block text-white text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Vehicle Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {VEHICLE_TYPES.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVehicleId(v.id)}
                    className={`px-4 py-3 text-sm font-medium tracking-wide border transition-all duration-200 cursor-pointer text-left ${
                      vehicleId === v.id
                        ? "bg-[#b32025] border-[#b32025] text-white"
                        : "bg-transparent border-white/20 text-white/70 hover:border-white/60 hover:text-white"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Coverage */}
            <div>
              <label
                className="block text-white text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Coverage
              </label>
              <div className="grid grid-cols-2 gap-3">
                {COVERAGE_OPTIONS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCoverageId(c.id)}
                    className={`px-4 py-3 text-sm font-medium tracking-wide border transition-all duration-200 cursor-pointer text-left ${
                      coverageId === c.id
                        ? "bg-[#b32025] border-[#b32025] text-white"
                        : "bg-transparent border-white/20 text-white/70 hover:border-white/60 hover:text-white"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div>
              <label
                className="block text-white text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Material
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MATERIALS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMaterialId(m.id)}
                    className={`px-4 py-4 text-sm border transition-all duration-200 cursor-pointer text-left ${
                      materialId === m.id
                        ? "bg-[#b32025] border-[#b32025] text-white"
                        : "bg-transparent border-white/20 text-white/70 hover:border-white/60 hover:text-white"
                    }`}
                  >
                    <div
                      className="font-semibold mb-1"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {m.label}
                    </div>
                    <div
                      className="text-xs opacity-70 leading-tight"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {m.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <label
                className="block text-white text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Add-Ons (Optional)
              </label>
              <div className="space-y-2">
                {ADDONS.map((a) => (
                  <label
                    key={a.id}
                    className="flex items-center justify-between gap-4 px-4 py-3 border border-white/20 hover:border-white/40 cursor-pointer transition-colors duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => toggleAddon(a.id)}
                        className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 transition-colors duration-200 cursor-pointer ${
                          selectedAddons.has(a.id)
                            ? "bg-[#b32025] border-[#b32025]"
                            : "border-white/40 hover:border-white"
                        }`}
                      >
                        {selectedAddons.has(a.id) && (
                          <svg
                            className="w-3 h-3 text-white"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2 6l3 3 5-5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className="text-white/80 group-hover:text-white text-sm transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        onClick={() => toggleAddon(a.id)}
                      >
                        {a.label}
                      </span>
                    </div>
                    <span
                      className="text-white/50 text-sm shrink-0"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      +${a.price.toLocaleString()}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Right — Result ─── */}
          <div className="xl:col-span-2 bg-white p-8 lg:p-12 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#b32025] flex items-center justify-center">
                <Calculator size={20} className="text-white" />
              </div>
              <div>
                <div
                  className="text-[#092f4d] text-xs font-semibold tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Your Estimate
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-3 mb-8 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              {[
                { label: "Vehicle", value: vehicle.label },
                { label: "Coverage", value: coverage.label },
                { label: "Material", value: material.label },
                ...(selectedAddons.size > 0
                  ? [
                      {
                        label: "Add-ons",
                        value: `${selectedAddons.size} selected (+$${addonTotal.toLocaleString()})`,
                      },
                    ]
                  : []),
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center py-2 border-b border-[#e8e8e8]">
                  <span className="text-[#9ca3af] font-medium">{row.label}</span>
                  <span className="text-[#092f4d] font-semibold">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Price range */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${low}-${high}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-[#092f4d] p-8 text-center mb-6"
              >
                <div
                  className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Estimated Range
                </div>
                <div
                  className="text-white text-4xl lg:text-5xl font-bold leading-none"
                  style={{ fontFamily: "'Apotek Extended', sans-serif" }}
                >
                  ${low.toLocaleString()} — ${high.toLocaleString()}
                </div>
                <div
                  className="text-white/40 text-xs mt-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Final price confirmed in your custom quote
                </div>
              </motion.div>
            </AnimatePresence>

            <div
              className="flex items-start gap-2 text-xs text-[#9ca3af] mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Info size={14} className="shrink-0 mt-0.5 text-[#b32025]" />
              <span>
                Estimates are for reference only. Actual pricing depends on vehicle condition, 
                design complexity, and current material costs.
              </span>
            </div>

            <button
              onClick={scrollToQuote}
              className="mt-auto w-full bg-[#b32025] hover:bg-[#8f181c] text-white py-4 text-sm font-semibold tracking-[0.12em] uppercase transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Get My Custom Quote
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
