"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// WRAP CONFIGURATOR (Day 6)
// Real-time 3D vehicle preview. Pick a wrap finish, watch the body update.
// Stylized low-poly car built from primitives so it ships without external
// model assets. Drag to rotate, scroll to zoom (gated on desktop).
// ─────────────────────────────────────────────────────────────────────────────

interface WrapPreset {
  id: string;
  name: string;
  caption: string;
  color: string;
  metalness: number;
  roughness: number;
  emissive?: string;
  emissiveIntensity?: number;
  iridescence?: number;
}

const PRESETS: WrapPreset[] = [
  {
    id: "gloss-black",
    name: "Gloss Black",
    caption: "Showroom finish · 3M 2080",
    color: "#0a0a0a",
    metalness: 0.85,
    roughness: 0.08,
  },
  {
    id: "chrome-shift",
    name: "Color-Shift Chrome",
    caption: "Avery Dennison · ColorFlow",
    color: "#7a4dff",
    metalness: 1.0,
    roughness: 0.12,
    iridescence: 1.0,
  },
  {
    id: "matte-stealth",
    name: "Matte Stealth",
    caption: "Inozetek SuperGloss · Anthracite",
    color: "#2a2e33",
    metalness: 0.4,
    roughness: 0.85,
  },
  {
    id: "76-red",
    name: "76 Red",
    caption: "Brand-matched signature pop",
    color: "#b32025",
    metalness: 0.7,
    roughness: 0.18,
  },
  {
    id: "satin-blue",
    name: "Patriot Satin",
    caption: "76 Navy · brushed satin",
    color: "#285493",
    metalness: 0.6,
    roughness: 0.45,
  },
  {
    id: "neon-accent",
    name: "Neon Accent",
    caption: "Glow stripe · special order",
    color: "#1f2933",
    metalness: 0.5,
    roughness: 0.3,
    emissive: "#b32025",
    emissiveIntensity: 0.4,
  },
];

// ─── Car geometry ────────────────────────────────────────────────────────────
function Car({ preset }: { preset: WrapPreset }) {
  const ref = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const targetColor = useRef(new THREE.Color(preset.color));
  const targetMetal = useRef(preset.metalness);
  const targetRough = useRef(preset.roughness);

  useEffect(() => {
    targetColor.current.set(preset.color);
    targetMetal.current = preset.metalness;
    targetRough.current = preset.roughness;
  }, [preset]);

  useFrame((_, delta) => {
    if (ref.current) {
      // gentle idle rotation when user not interacting handled via OrbitControls autoRotate
    }
    if (matRef.current) {
      matRef.current.color.lerp(targetColor.current, Math.min(delta * 4, 1));
      matRef.current.metalness +=
        (targetMetal.current - matRef.current.metalness) * Math.min(delta * 4, 1);
      matRef.current.roughness +=
        (targetRough.current - matRef.current.roughness) * Math.min(delta * 4, 1);
    }
  });

  return (
    <group ref={ref} position={[0, -0.35, 0]}>
      {/* Body — main hull */}
      <mesh castShadow receiveShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[3.6, 0.55, 1.5]} />
        <meshPhysicalMaterial
          ref={matRef}
          color={preset.color}
          metalness={preset.metalness}
          roughness={preset.roughness}
          clearcoat={0.9}
          clearcoatRoughness={0.05}
          iridescence={preset.iridescence ?? 0}
          iridescenceIOR={1.6}
          emissive={preset.emissive ?? "#000000"}
          emissiveIntensity={preset.emissiveIntensity ?? 0}
        />
      </mesh>

      {/* Hood slope (front) */}
      <mesh castShadow position={[1.4, 0.8, 0]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.9, 0.2, 1.45]} />
        <meshPhysicalMaterial
          color={preset.color}
          metalness={preset.metalness}
          roughness={preset.roughness}
          clearcoat={0.9}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Roof / cabin */}
      <mesh castShadow position={[-0.1, 1.05, 0]}>
        <boxGeometry args={[2.0, 0.45, 1.35]} />
        <meshPhysicalMaterial
          color={preset.color}
          metalness={preset.metalness}
          roughness={preset.roughness}
          clearcoat={0.9}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Windows */}
      <mesh position={[-0.1, 1.05, 0.681]}>
        <boxGeometry args={[1.85, 0.38, 0.02]} />
        <meshPhysicalMaterial
          color="#0c1a24"
          metalness={0.1}
          roughness={0.05}
          transmission={0.4}
          thickness={0.2}
          opacity={0.85}
          transparent
        />
      </mesh>
      <mesh position={[-0.1, 1.05, -0.681]}>
        <boxGeometry args={[1.85, 0.38, 0.02]} />
        <meshPhysicalMaterial
          color="#0c1a24"
          metalness={0.1}
          roughness={0.05}
          transmission={0.4}
          thickness={0.2}
          opacity={0.85}
          transparent
        />
      </mesh>
      {/* Windshield */}
      <mesh position={[0.92, 0.93, 0]} rotation={[0, 0, -0.6]}>
        <boxGeometry args={[0.5, 0.4, 1.32]} />
        <meshPhysicalMaterial
          color="#0c1a24"
          metalness={0.1}
          roughness={0.05}
          transmission={0.4}
          thickness={0.2}
          opacity={0.85}
          transparent
        />
      </mesh>

      {/* Headlights */}
      <mesh position={[1.82, 0.55, 0.45]}>
        <boxGeometry args={[0.05, 0.18, 0.35]} />
        <meshStandardMaterial color="#ffffff" emissive="#fff8e7" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[1.82, 0.55, -0.45]}>
        <boxGeometry args={[0.05, 0.18, 0.35]} />
        <meshStandardMaterial color="#ffffff" emissive="#fff8e7" emissiveIntensity={1.2} />
      </mesh>

      {/* Taillights */}
      <mesh position={[-1.82, 0.55, 0.45]}>
        <boxGeometry args={[0.05, 0.16, 0.32]} />
        <meshStandardMaterial color="#b32025" emissive="#b32025" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[-1.82, 0.55, -0.45]}>
        <boxGeometry args={[0.05, 0.16, 0.32]} />
        <meshStandardMaterial color="#b32025" emissive="#b32025" emissiveIntensity={1.5} />
      </mesh>

      {/* Side accent stripe */}
      <mesh position={[0, 0.55, 0.755]}>
        <boxGeometry args={[3.4, 0.04, 0.005]} />
        <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.55, -0.755]}>
        <boxGeometry args={[3.4, 0.04, 0.005]} />
        <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Wheels */}
      {[
        [1.2, 0.27, 0.78],
        [1.2, 0.27, -0.78],
        [-1.2, 0.27, 0.78],
        [-1.2, 0.27, -0.78],
      ].map((p, i) => (
        <group key={i} position={p as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.32, 0.32, 0.22, 24]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.85} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.115, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.02, 16]} />
            <meshStandardMaterial color="#a0a0a0" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Stage ───────────────────────────────────────────────────────────────────
function Stage({ preset }: { preset: WrapPreset }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 4]} intensity={1.4} castShadow />
      <directionalLight position={[-4, 3, -2]} intensity={0.5} color="#b32025" />
      <directionalLight position={[2, 4, -5]} intensity={0.6} color="#285493" />
      <Environment preset="city" />
      <Car preset={preset} />
      <ContactShadows
        position={[0, -0.4, 0]}
        opacity={0.55}
        scale={10}
        blur={2.5}
        far={4}
      />
    </>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
function WrapConfiguratorInner() {
  const [active, setActive] = useState(0);
  const preset = PRESETS[active];

  return (
    <section
      className="relative bg-[#061e31] overflow-hidden py-24 lg:py-32 isolate"
      aria-label="Wrap configurator"
    >
      {/* Background drift */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(40,84,147,0.6) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(179,32,37,0.4) 0%, transparent 40%)",
        }}
      />
      <div className="brand-stars-bg absolute inset-0 opacity-15 pointer-events-none" />

      {/* Drifting headline */}
      <div
        aria-hidden
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap select-none pointer-events-none z-0 opacity-[0.04]"
      >
        <span
          className="uppercase text-white block"
          style={{
            fontFamily: "'Apotek Extended', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(10rem, 22vw, 22rem)",
            lineHeight: 0.82,
            letterSpacing: "-0.02em",
          }}
        >
          CONFIGURE · CONFIGURE
        </span>
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 lg:mb-14">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-10 bg-[#b32025]" />
              <span
                className="text-[#b32025] text-[10px] font-bold tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Try It Live · 3D Configurator
              </span>
            </div>
            <h2
              className="text-white uppercase leading-[0.85]"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.75rem, 7vw, 6.5rem)",
                letterSpacing: "-0.015em",
              }}
            >
              Pick A Finish.
              <br />
              <span style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}>
                Spin It.
              </span>
            </h2>
          </div>
          <p
            className="text-white/60 text-base lg:text-lg max-w-md leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Real-time 3D preview. Drag to rotate. Tap a film below to swap the wrap on
            the body. Powered by WebGL.
          </p>
        </div>

        {/* 3D stage */}
        <div className="relative w-full aspect-[16/10] lg:aspect-[16/8] bg-gradient-to-b from-[#020c14] to-[#031827] border border-white/10 overflow-hidden">
          {/* Floor grid */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            }}
          />

          <Canvas
            shadows
            camera={{ position: [4.5, 2.4, 5], fov: 38 }}
            dpr={[1, 1.8]}
            gl={{ antialias: true, alpha: true }}
          >
            <Stage preset={preset} />
            <OrbitControls
              enablePan={false}
              enableZoom
              minDistance={4}
              maxDistance={10}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2.1}
              autoRotate
              autoRotateSpeed={0.6}
            />
          </Canvas>

          {/* Corner badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
            <span className="bg-[#b32025] text-white text-[9px] font-bold tracking-[0.3em] uppercase px-2.5 py-1">
              Live · WebGL
            </span>
          </div>
          <div className="absolute top-4 right-4 pointer-events-none">
            <span
              className="text-white/60 text-[9px] font-bold tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Drag · Rotate · Zoom
            </span>
          </div>

          {/* Active label */}
          <div className="absolute bottom-4 left-4 pointer-events-none">
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="text-[#b32025] text-[10px] font-bold tracking-[0.3em] uppercase block mb-1"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Now Showing
              </span>
              <h3
                className="text-white uppercase leading-none"
                style={{
                  fontFamily: "'Apotek Extended', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                {preset.name}
              </h3>
              <p
                className="text-white/55 text-xs mt-1"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {preset.caption}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Preset row */}
        <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-3">
          {PRESETS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              data-magnetic
              data-magnetic-strength="0.15"
              className={`group relative aspect-square overflow-hidden border-2 transition-colors ${
                active === i
                  ? "border-[#b32025]"
                  : "border-white/10 hover:border-white/40"
              }`}
              aria-label={`Apply ${p.name}`}
              aria-pressed={active === i}
            >
              <span
                className="absolute inset-0"
                style={{
                  background: p.id === "chrome-shift"
                    ? "linear-gradient(135deg, #7a4dff 0%, #4dd6ff 50%, #ffd24d 100%)"
                    : p.color,
                  filter: p.metalness > 0.7 ? "brightness(1.1)" : "brightness(0.95)",
                }}
              />
              {p.emissive && (
                <span
                  className="absolute inset-x-2 bottom-2 h-1 rounded-full"
                  style={{ backgroundColor: p.emissive, boxShadow: `0 0 12px ${p.emissive}` }}
                />
              )}
              {/* Hover label */}
              <span
                className={`absolute inset-x-0 bottom-0 px-2 py-1.5 text-[9px] font-bold tracking-[0.2em] uppercase transition-all bg-[#031827]/90 ${
                  active === i
                    ? "text-white opacity-100"
                    : "text-white/80 opacity-0 group-hover:opacity-100"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {p.name}
              </span>
              {/* Active corner */}
              {active === i && (
                <>
                  <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#b32025]" />
                  <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#b32025]" />
                  <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#b32025]" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#b32025]" />
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// Static fallback (no WebGL / reduced motion / mobile)
function ConfiguratorFallback() {
  return (
    <section className="relative bg-[#061e31] py-20 px-6 lg:px-12 overflow-hidden">
      <div className="brand-stars-bg absolute inset-0 opacity-15 pointer-events-none" />
      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <span
          className="text-[#b32025] text-[10px] font-bold tracking-[0.4em] uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          3D Configurator
        </span>
        <h2
          className="text-white uppercase leading-[0.9] mt-4"
          style={{
            fontFamily: "'Apotek Extended', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
          }}
        >
          Available on desktop.
        </h2>
        <p
          className="text-white/55 mt-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Visit on a larger screen to spin our live wrap previews in 3D.
        </p>
      </div>
    </section>
  );
}

// Default export with mobile/reduced-motion gate
export default function WrapConfigurator() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setOk(wide && !reduced);
  }, []);
  if (ok === null) return <section className="bg-[#061e31] min-h-[80vh]" aria-hidden />;
  if (!ok) return <ConfiguratorFallback />;
  return <WrapConfiguratorInner />;
}
