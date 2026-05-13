"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// WRAP CONFIGURATOR · v3
// - Two vehicle bodies: Box Truck (default — flagship product) + Sports Car
// - Categorized swatch palette pulled from Avery Supreme + 3M 2080 lineups
//   (Gloss / Satin / Matte / Pearl / ColorFlow / Carbon Fiber / Chrome / Brushed)
// - Per-finish material params (metalness / roughness / iridescence / emissive)
// - Animated lerp on swap, OrbitControls autoRotate, ContactShadows
// ─────────────────────────────────────────────────────────────────────────────

interface Swatch {
  id: string;
  name: string;
  code: string;
  color: string;
  metalness: number;
  roughness: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  iridescence?: number;
  emissive?: string;
  emissiveIntensity?: number;
  // For visual swatch only — when the actual color isn't a single solid (chrome, carbon, brushed)
  swatchCss?: string;
}

interface Family {
  id: string;
  name: string;
  blurb: string;
  swatches: Swatch[];
}

// ─── Swatch library (mapped from Avery Supreme + 3M 2080) ────────────────────
const FAMILIES: Family[] = [
  {
    id: "gloss",
    name: "Gloss",
    blurb: "Mirror-clear top coat · Avery SW900 Gloss · 3M 2080-G",
    swatches: [
      { id: "g-black", name: "Gloss Black", code: "SW900-190-O", color: "#0a0a0a", metalness: 0.65, roughness: 0.05, clearcoat: 1, clearcoatRoughness: 0.04 },
      { id: "g-white", name: "Gloss White", code: "SW900-101-O", color: "#f4f4f0", metalness: 0.45, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.04 },
      { id: "g-red", name: "Cardinal Red", code: "SW900-433-O", color: "#a51d23", metalness: 0.6, roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05 },
      { id: "g-76red", name: "76 Red", code: "Brand match", color: "#b32025", metalness: 0.6, roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05 },
      { id: "g-blue", name: "Park Avenue Blue", code: "SW900-703-O", color: "#1a3c6b", metalness: 0.55, roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05 },
      { id: "g-green", name: "Emerald Green", code: "SW900-771-O", color: "#1c5e3d", metalness: 0.55, roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05 },
      { id: "g-yellow", name: "Ambulance Yellow", code: "SW900-236-O", color: "#f4c916", metalness: 0.55, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05 },
      { id: "g-orange", name: "Orange", code: "SW900-373-O", color: "#e25b1c", metalness: 0.55, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05 },
    ],
  },
  {
    id: "satin",
    name: "Satin",
    blurb: "Soft sheen · Avery SW900 Satin",
    swatches: [
      { id: "s-black", name: "Satin Black", code: "SW900-192-M", color: "#181818", metalness: 0.4, roughness: 0.5, clearcoat: 0.4, clearcoatRoughness: 0.6 },
      { id: "s-white", name: "Satin White Pearl", code: "SW900-117-S", color: "#ececea", metalness: 0.45, roughness: 0.5, clearcoat: 0.4, clearcoatRoughness: 0.6 },
      { id: "s-blue", name: "Patriot Satin", code: "SW900-616-O", color: "#285493", metalness: 0.5, roughness: 0.45, clearcoat: 0.4, clearcoatRoughness: 0.55 },
      { id: "s-rosegold", name: "Rose Gold Satin", code: "SW900-419-M", color: "#b86d62", metalness: 0.7, roughness: 0.4, clearcoat: 0.4 },
      { id: "s-darkgrey", name: "Dark Grey", code: "SW900-854-M", color: "#3a3d42", metalness: 0.4, roughness: 0.5 },
      { id: "s-purple", name: "Purple", code: "SW900-566-M", color: "#3e2d63", metalness: 0.5, roughness: 0.45 },
    ],
  },
  {
    id: "matte",
    name: "Matte",
    blurb: "Zero glare · Inozetek + Avery SW900 Matte",
    swatches: [
      { id: "m-black", name: "Matte Black", code: "SW900-180-O", color: "#101010", metalness: 0.15, roughness: 0.95 },
      { id: "m-white", name: "Matte White", code: "SW900-102-O", color: "#e8e8e4", metalness: 0.15, roughness: 0.95 },
      { id: "m-stealth", name: "Matte Stealth", code: "Inozetek", color: "#2a2e33", metalness: 0.25, roughness: 0.85 },
      { id: "m-orange", name: "Matte Orange", code: "SW900-321-O", color: "#c14620", metalness: 0.2, roughness: 0.9 },
      { id: "m-blue", name: "Dreamline Blue", code: "SW900-616-O", color: "#1c344f", metalness: 0.2, roughness: 0.9 },
      { id: "m-olive", name: "Olive Green", code: "SW900-732-O", color: "#525a32", metalness: 0.2, roughness: 0.9 },
    ],
  },
  {
    id: "pearl",
    name: "Pearl",
    blurb: "Iridescent shimmer · Avery Pearl + 3M Pearlescent",
    swatches: [
      { id: "p-white", name: "Gloss White Pearl", code: "SW900-109-S", color: "#f0eee5", metalness: 0.75, roughness: 0.18, clearcoat: 1, iridescence: 0.5 },
      { id: "p-darkgreen", name: "Pearl Dark Green", code: "SW900-796-S", color: "#1f4a35", metalness: 0.75, roughness: 0.2, clearcoat: 1, iridescence: 0.4 },
      { id: "p-pink", name: "Tutu Pink Pearl", code: "SW900-523-S", color: "#d49eb6", metalness: 0.7, roughness: 0.22, clearcoat: 1, iridescence: 0.45 },
    ],
  },
  {
    id: "colorflow",
    name: "ColorFlow",
    blurb: "Two-tone shift · Avery ColorFlow™",
    swatches: [
      {
        id: "cf-thunder",
        name: "Roaring Thunder",
        code: "SW900-552-S",
        color: "#3a4a78",
        metalness: 0.95,
        roughness: 0.18,
        clearcoat: 1,
        iridescence: 1,
        swatchCss: "linear-gradient(135deg, #1f3b8a 0%, #6a2235 60%, #ffb84d 100%)",
      },
      {
        id: "cf-riptide",
        name: "Rushing Riptide",
        code: "SW900-674-S",
        color: "#2a6e7a",
        metalness: 0.95,
        roughness: 0.18,
        clearcoat: 1,
        iridescence: 1,
        swatchCss: "linear-gradient(135deg, #00b6d6 0%, #6a2db5 100%)",
      },
      {
        id: "cf-risingsun",
        name: "Rising Sun",
        code: "SW900-447-S",
        color: "#d83a2a",
        metalness: 0.95,
        roughness: 0.18,
        clearcoat: 1,
        iridescence: 1,
        swatchCss: "linear-gradient(135deg, #e11f1f 0%, #ffd24d 100%)",
      },
      {
        id: "cf-jungle",
        name: "Urban Jungle",
        code: "SW900-787-S",
        color: "#7d8a5c",
        metalness: 0.95,
        roughness: 0.18,
        clearcoat: 1,
        iridescence: 1,
        swatchCss: "linear-gradient(135deg, #b8c0a8 0%, #2f5d3a 100%)",
      },
    ],
  },
  {
    id: "chrome",
    name: "Chrome",
    blurb: "Mirror finish · Avery Conform Chrome SF100",
    swatches: [
      { id: "c-silver", name: "Conform Chrome Silver", code: "SF100-843-S", color: "#cfd2d6", metalness: 1, roughness: 0.04 },
      { id: "c-black", name: "Conform Chrome Black", code: "SF100-196-S", color: "#222428", metalness: 1, roughness: 0.05 },
      { id: "c-red", name: "Chrome Red", code: "SF100-474-S", color: "#9a1a20", metalness: 1, roughness: 0.05 },
      { id: "c-gold", name: "Chrome Gold", code: "SF100-604-S", color: "#caa040", metalness: 1, roughness: 0.05 },
      { id: "c-blue", name: "Chrome Blue", code: "SF100-256-S", color: "#1d4a8a", metalness: 1, roughness: 0.05 },
      { id: "c-rose", name: "Rose Gold Chrome", code: "SF100-211-S", color: "#c97e76", metalness: 1, roughness: 0.05 },
    ],
  },
  {
    id: "carbon",
    name: "Carbon Fiber",
    blurb: "Texture finish · Avery Extreme Texture",
    swatches: [
      {
        id: "cb-black",
        name: "Carbon Black",
        code: "SW900-194-X",
        color: "#1a1a1c",
        metalness: 0.55,
        roughness: 0.55,
        swatchCss: "repeating-linear-gradient(45deg, #1a1a1c 0 4px, #2a2a2e 4px 8px), #1a1a1c",
      },
      {
        id: "cb-white",
        name: "Carbon White",
        code: "SW900-115-X",
        color: "#d8d8d4",
        metalness: 0.45,
        roughness: 0.55,
        swatchCss: "repeating-linear-gradient(45deg, #d8d8d4 0 4px, #b8b8b4 4px 8px), #d8d8d4",
      },
    ],
  },
  {
    id: "brushed",
    name: "Brushed",
    blurb: "Anodized streak · Avery SW900-X Series",
    swatches: [
      { id: "b-aluminum", name: "Brushed Aluminum", code: "SW900-812-X", color: "#a3a8ae", metalness: 0.85, roughness: 0.45 },
      { id: "b-titanium", name: "Brushed Titanium", code: "SW900-802-X", color: "#6f7479", metalness: 0.85, roughness: 0.5 },
      { id: "b-bronze", name: "Brushed Bronze", code: "SW900-933-X", color: "#7a5a36", metalness: 0.85, roughness: 0.5 },
      { id: "b-steel", name: "Brushed Steel", code: "SW900-813-X", color: "#7a8088", metalness: 0.85, roughness: 0.5 },
      { id: "b-black", name: "Brushed Black", code: "SW900-193-X", color: "#1c1c1e", metalness: 0.85, roughness: 0.55 },
    ],
  },
];

const ALL_SWATCHES = FAMILIES.flatMap((f) => f.swatches);
const findSwatch = (id: string) => ALL_SWATCHES.find((s) => s.id === id) ?? FAMILIES[0].swatches[0];

// ─── Vehicle: Sports Car (refined low-poly) ──────────────────────────────────
function SportsCar({ swatch }: { swatch: Swatch }) {
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const target = useRef({
    color: new THREE.Color(swatch.color),
    metalness: swatch.metalness,
    roughness: swatch.roughness,
    clearcoat: swatch.clearcoat ?? 0.5,
    iridescence: swatch.iridescence ?? 0,
  });

  useEffect(() => {
    target.current.color.set(swatch.color);
    target.current.metalness = swatch.metalness;
    target.current.roughness = swatch.roughness;
    target.current.clearcoat = swatch.clearcoat ?? 0.5;
    target.current.iridescence = swatch.iridescence ?? 0;
  }, [swatch]);

  useFrame((_, delta) => {
    const m = matRef.current;
    if (!m) return;
    const k = Math.min(delta * 4, 1);
    m.color.lerp(target.current.color, k);
    m.metalness += (target.current.metalness - m.metalness) * k;
    m.roughness += (target.current.roughness - m.roughness) * k;
    m.clearcoat += (target.current.clearcoat - m.clearcoat) * k;
    m.iridescence += (target.current.iridescence - m.iridescence) * k;
  });

  const wheels: [number, number, number][] = [
    [1.25, 0.32, 0.85],
    [1.25, 0.32, -0.85],
    [-1.3, 0.32, 0.85],
    [-1.3, 0.32, -0.85],
  ];

  return (
    <group position={[0, -0.4, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[3.8, 0.5, 1.55]} />
        <meshPhysicalMaterial
          ref={matRef}
          color={swatch.color}
          metalness={swatch.metalness}
          roughness={swatch.roughness}
          clearcoat={swatch.clearcoat ?? 0.5}
          clearcoatRoughness={swatch.clearcoatRoughness ?? 0.05}
          iridescence={swatch.iridescence ?? 0}
          iridescenceIOR={1.6}
          emissive={swatch.emissive ?? "#000"}
          emissiveIntensity={swatch.emissiveIntensity ?? 0}
        />
      </mesh>
      <mesh castShadow position={[1.55, 0.78, 0]} rotation={[0, 0, -0.12]}>
        <boxGeometry args={[0.85, 0.18, 1.5]} />
        <meshPhysicalMaterial color={swatch.color} metalness={swatch.metalness} roughness={swatch.roughness} clearcoat={swatch.clearcoat ?? 0.5} />
      </mesh>
      <mesh castShadow position={[-0.05, 1.05, 0]}>
        <boxGeometry args={[2.1, 0.5, 1.4]} />
        <meshPhysicalMaterial color={swatch.color} metalness={swatch.metalness} roughness={swatch.roughness} clearcoat={swatch.clearcoat ?? 0.5} />
      </mesh>
      <mesh castShadow position={[-1.45, 0.85, 0]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.85, 0.18, 1.5]} />
        <meshPhysicalMaterial color={swatch.color} metalness={swatch.metalness} roughness={swatch.roughness} clearcoat={swatch.clearcoat ?? 0.5} />
      </mesh>
      <mesh position={[0.95, 0.95, 0]} rotation={[0, 0, -0.55]}>
        <boxGeometry args={[0.5, 0.42, 1.36]} />
        <meshPhysicalMaterial color="#0a1820" metalness={0.1} roughness={0.05} transmission={0.5} thickness={0.2} opacity={0.8} transparent />
      </mesh>
      <mesh position={[-0.05, 1.05, 0.71]}>
        <boxGeometry args={[1.95, 0.4, 0.02]} />
        <meshPhysicalMaterial color="#0a1820" metalness={0.1} roughness={0.05} transmission={0.5} thickness={0.2} opacity={0.8} transparent />
      </mesh>
      <mesh position={[-0.05, 1.05, -0.71]}>
        <boxGeometry args={[1.95, 0.4, 0.02]} />
        <meshPhysicalMaterial color="#0a1820" metalness={0.1} roughness={0.05} transmission={0.5} thickness={0.2} opacity={0.8} transparent />
      </mesh>
      <mesh position={[-1.05, 0.95, 0]} rotation={[0, 0, 0.55]}>
        <boxGeometry args={[0.5, 0.42, 1.36]} />
        <meshPhysicalMaterial color="#0a1820" metalness={0.1} roughness={0.05} transmission={0.5} thickness={0.2} opacity={0.8} transparent />
      </mesh>
      <mesh position={[1.92, 0.55, 0.5]}>
        <boxGeometry args={[0.05, 0.16, 0.32]} />
        <meshStandardMaterial color="#fff" emissive="#fff8e0" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[1.92, 0.55, -0.5]}>
        <boxGeometry args={[0.05, 0.16, 0.32]} />
        <meshStandardMaterial color="#fff" emissive="#fff8e0" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[-1.92, 0.55, 0.5]}>
        <boxGeometry args={[0.05, 0.14, 0.3]} />
        <meshStandardMaterial color="#b32025" emissive="#b32025" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[-1.92, 0.55, -0.5]}>
        <boxGeometry args={[0.05, 0.14, 0.3]} />
        <meshStandardMaterial color="#b32025" emissive="#b32025" emissiveIntensity={1.5} />
      </mesh>
      {wheels.map((p, i) => (
        <group key={i} position={p} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.34, 0.34, 0.22, 28]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.85} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.115, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.02, 18]} />
            <meshStandardMaterial color="#bcbcbc" metalness={0.85} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Vehicle: Box Truck ──────────────────────────────────────────────────────
function BoxTruck({ swatch }: { swatch: Swatch }) {
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const matBoxRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const target = useRef({
    color: new THREE.Color(swatch.color),
    metalness: swatch.metalness,
    roughness: swatch.roughness,
    clearcoat: swatch.clearcoat ?? 0.5,
    iridescence: swatch.iridescence ?? 0,
  });

  useEffect(() => {
    target.current.color.set(swatch.color);
    target.current.metalness = swatch.metalness;
    target.current.roughness = swatch.roughness;
    target.current.clearcoat = swatch.clearcoat ?? 0.5;
    target.current.iridescence = swatch.iridescence ?? 0;
  }, [swatch]);

  useFrame((_, delta) => {
    const k = Math.min(delta * 4, 1);
    [matRef.current, matBoxRef.current].forEach((m) => {
      if (!m) return;
      m.color.lerp(target.current.color, k);
      m.metalness += (target.current.metalness - m.metalness) * k;
      m.roughness += (target.current.roughness - m.roughness) * k;
      m.clearcoat += (target.current.clearcoat - m.clearcoat) * k;
      m.iridescence += (target.current.iridescence - m.iridescence) * k;
    });
  });

  const wheels: [number, number, number][] = [
    [1.6, 0.42, 0.95],
    [1.6, 0.42, -0.95],
    [-1.4, 0.42, 0.95],
    [-1.4, 0.42, -0.95],
    [-2.05, 0.42, 0.95],
    [-2.05, 0.42, -0.95],
  ];

  return (
    <group position={[0, -0.4, 0]}>
      {/* Chassis */}
      <mesh castShadow position={[-0.1, 0.32, 0]}>
        <boxGeometry args={[5.4, 0.18, 1.8]} />
        <meshStandardMaterial color="#1c1c1e" metalness={0.5} roughness={0.7} />
      </mesh>

      {/* Cab */}
      <mesh castShadow receiveShadow position={[1.65, 0.95, 0]}>
        <boxGeometry args={[1.3, 1.05, 1.95]} />
        <meshPhysicalMaterial
          ref={matRef}
          color={swatch.color}
          metalness={swatch.metalness}
          roughness={swatch.roughness}
          clearcoat={swatch.clearcoat ?? 0.5}
          clearcoatRoughness={swatch.clearcoatRoughness ?? 0.05}
          iridescence={swatch.iridescence ?? 0}
          iridescenceIOR={1.6}
        />
      </mesh>
      <mesh castShadow position={[1.65, 1.55, 0]}>
        <boxGeometry args={[1.2, 0.08, 1.92]} />
        <meshPhysicalMaterial color={swatch.color} metalness={swatch.metalness} roughness={swatch.roughness} clearcoat={swatch.clearcoat ?? 0.5} />
      </mesh>
      <mesh castShadow position={[2.42, 0.7, 0]} rotation={[0, 0, -0.18]}>
        <boxGeometry args={[0.55, 0.6, 1.85]} />
        <meshPhysicalMaterial color={swatch.color} metalness={swatch.metalness} roughness={swatch.roughness} clearcoat={swatch.clearcoat ?? 0.5} />
      </mesh>
      <mesh position={[1.05, 1.18, 0]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.08, 0.65, 1.7]} />
        <meshPhysicalMaterial color="#0a1820" metalness={0.1} roughness={0.05} transmission={0.5} thickness={0.2} opacity={0.85} transparent />
      </mesh>
      <mesh position={[1.65, 1.15, 0.981]}>
        <boxGeometry args={[1.0, 0.55, 0.02]} />
        <meshPhysicalMaterial color="#0a1820" metalness={0.1} roughness={0.05} transmission={0.5} thickness={0.2} opacity={0.85} transparent />
      </mesh>
      <mesh position={[1.65, 1.15, -0.981]}>
        <boxGeometry args={[1.0, 0.55, 0.02]} />
        <meshPhysicalMaterial color="#0a1820" metalness={0.1} roughness={0.05} transmission={0.5} thickness={0.2} opacity={0.85} transparent />
      </mesh>

      {/* Cargo box */}
      <mesh castShadow receiveShadow position={[-0.95, 1.3, 0]}>
        <boxGeometry args={[3.6, 1.85, 2.1]} />
        <meshPhysicalMaterial
          ref={matBoxRef}
          color={swatch.color}
          metalness={swatch.metalness}
          roughness={swatch.roughness}
          clearcoat={swatch.clearcoat ?? 0.5}
          clearcoatRoughness={swatch.clearcoatRoughness ?? 0.05}
          iridescence={swatch.iridescence ?? 0}
          iridescenceIOR={1.6}
        />
      </mesh>
      <mesh position={[-0.95, 2.235, 0]}>
        <boxGeometry args={[3.62, 0.04, 2.12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Roll-up door */}
      <mesh position={[-2.751, 1.3, 0]}>
        <boxGeometry args={[0.02, 1.7, 1.95]} />
        <meshStandardMaterial color="#2a2a2c" metalness={0.5} roughness={0.6} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-2.756, 0.5 + i * 0.21, 0]}>
          <boxGeometry args={[0.005, 0.02, 1.92]} />
          <meshStandardMaterial color="#000" />
        </mesh>
      ))}

      {/* Headlights */}
      <mesh position={[2.69, 0.65, 0.7]}>
        <boxGeometry args={[0.04, 0.18, 0.32]} />
        <meshStandardMaterial color="#fff" emissive="#fff8e0" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[2.69, 0.65, -0.7]}>
        <boxGeometry args={[0.04, 0.18, 0.32]} />
        <meshStandardMaterial color="#fff" emissive="#fff8e0" emissiveIntensity={1.2} />
      </mesh>
      {/* Marker lights atop cab */}
      {[-0.6, -0.2, 0.2, 0.6].map((z, i) => (
        <mesh key={i} position={[1.65, 1.62, z]}>
          <boxGeometry args={[0.18, 0.04, 0.1]} />
          <meshStandardMaterial color="#ffaa3a" emissive="#ff8a1a" emissiveIntensity={0.8} />
        </mesh>
      ))}
      {/* Taillights */}
      <mesh position={[-2.76, 0.55, 0.7]}>
        <boxGeometry args={[0.03, 0.16, 0.32]} />
        <meshStandardMaterial color="#b32025" emissive="#b32025" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[-2.76, 0.55, -0.7]}>
        <boxGeometry args={[0.03, 0.16, 0.32]} />
        <meshStandardMaterial color="#b32025" emissive="#b32025" emissiveIntensity={1.5} />
      </mesh>

      {/* Wheels */}
      {wheels.map((p, i) => (
        <group key={i} position={p} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.28, 28]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.85} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.02, 18]} />
            <meshStandardMaterial color="#9a9a9a" metalness={0.85} roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Stage({ swatch, vehicle }: { swatch: Swatch; vehicle: "truck" | "car" }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 10, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, 4, -3]} intensity={0.6} color="#b32025" />
      <directionalLight position={[3, 5, -6]} intensity={0.7} color="#285493" />
      <Environment preset="city" />
      {vehicle === "truck" ? <BoxTruck swatch={swatch} /> : <SportsCar swatch={swatch} />}
      <ContactShadows position={[0, -0.42, 0]} opacity={0.6} scale={14} blur={2.6} far={5} />
    </>
  );
}

function WrapConfiguratorInner() {
  const [vehicle, setVehicle] = useState<"truck" | "car">("truck");
  const [swatchId, setSwatchId] = useState<string>("g-76red");
  const [activeFamily, setActiveFamily] = useState<string>("gloss");
  const swatch = useMemo(() => findSwatch(swatchId), [swatchId]);
  const family = useMemo(
    () => FAMILIES.find((f) => f.id === activeFamily) ?? FAMILIES[0],
    [activeFamily]
  );

  const cameraPos: [number, number, number] = vehicle === "truck" ? [6, 3, 7] : [4.5, 2.4, 5];
  const minDist = vehicle === "truck" ? 6 : 4;
  const maxDist = vehicle === "truck" ? 14 : 10;

  return (
    <section
      className="relative bg-[#061e31] overflow-hidden py-24 lg:py-32 isolate"
      aria-label="Wrap configurator"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle at 18% 28%, rgba(40,84,147,0.7) 0%, transparent 42%), radial-gradient(circle at 82% 72%, rgba(179,32,37,0.5) 0%, transparent 42%)",
        }}
      />
      <div className="brand-stars-bg absolute inset-0 opacity-15 pointer-events-none" />

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
          CONFIGURE · APPLY
        </span>
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12">
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
          <div className="lg:max-w-md space-y-5">
            <p
              className="text-white/65 text-base lg:text-lg leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Real-time 3D preview powered by WebGL. Swatches mapped from
              Avery Supreme &amp; 3M 2080 lineups — the same films we install daily.
            </p>
            <div className="flex items-center gap-2">
              <span
                className="text-white/40 text-[9px] font-bold tracking-[0.3em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Vehicle
              </span>
              <div className="flex border border-white/15 ml-2">
                {(["truck", "car"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVehicle(v)}
                    className={`px-3.5 py-1.5 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors ${
                      vehicle === v
                        ? "bg-[#b32025] text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {v === "truck" ? "Box Truck" : "Sports Car"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-[16/10] lg:aspect-[16/8] bg-gradient-to-b from-[#020c14] to-[#031827] border border-white/10 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            }}
          />

          <Canvas shadows camera={{ position: cameraPos, fov: 38 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
            <Stage swatch={swatch} vehicle={vehicle} />
            <OrbitControls
              enablePan={false}
              enableZoom
              minDistance={minDist}
              maxDistance={maxDist}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2.1}
              autoRotate
              autoRotateSpeed={0.55}
            />
          </Canvas>

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

          <div className="absolute bottom-4 left-4 pointer-events-none max-w-[60%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={swatch.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="text-[#b32025] text-[10px] font-bold tracking-[0.3em] uppercase block mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Now Showing · {family.name}
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
                  {swatch.name}
                </h3>
                <p className="text-white/55 text-xs mt-1 font-mono">{swatch.code}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Family tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-1 border-b border-white/10 pb-px">
          {FAMILIES.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFamily(f.id)}
              className={`relative px-4 py-2.5 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors ${
                activeFamily === f.id ? "text-white" : "text-white/40 hover:text-white/70"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {f.name}
              {activeFamily === f.id && (
                <motion.span
                  layoutId="family-underline"
                  className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#b32025]"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="mt-5">
          <p
            className="text-white/45 text-xs tracking-wide mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {family.blurb}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {family.swatches.map((s) => (
              <button
                key={s.id}
                onClick={() => setSwatchId(s.id)}
                data-magnetic
                data-magnetic-strength="0.15"
                className={`group relative aspect-square overflow-hidden border-2 transition-colors ${
                  swatchId === s.id ? "border-[#b32025]" : "border-white/10 hover:border-white/40"
                }`}
                aria-label={`Apply ${s.name}`}
                aria-pressed={swatchId === s.id}
              >
                <span
                  className="absolute inset-0"
                  style={{
                    background: s.swatchCss ?? s.color,
                    filter: s.metalness > 0.85 ? "brightness(1.1)" : s.roughness > 0.7 ? "brightness(0.92)" : "none",
                  }}
                />
                {s.emissive && (
                  <span
                    className="absolute inset-x-2 bottom-2 h-1 rounded-full"
                    style={{ backgroundColor: s.emissive, boxShadow: `0 0 12px ${s.emissive}` }}
                  />
                )}
                <span
                  className={`absolute inset-x-0 bottom-0 px-2 py-1.5 text-[9px] font-bold tracking-[0.2em] uppercase transition-all bg-[#031827]/95 text-white ${
                    swatchId === s.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {s.name}
                </span>
                {swatchId === s.id && (
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

        <p
          className="mt-8 text-white/35 text-[11px] tracking-wide"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Colors digitally reproduced — actual film may vary. Request a physical sample
          before fleet production.
        </p>
      </div>
    </section>
  );
}

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
