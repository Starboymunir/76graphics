"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// HERO CANVAS — WebGL shader plane (Day 5)
// Full-bleed plane with custom GLSL: animated curl-noise displacement painted
// in the brand palette. Sits as an extra layer over the hero photo at low
// opacity to add cinematic life. Honours prefers-reduced-motion (mounts only
// when motion is allowed — see Hero.tsx gating).
// ─────────────────────────────────────────────────────────────────────────────

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform vec2  uResolution;
  varying vec2  vUv;

  // Brand palette
  const vec3 NAVY     = vec3(0.024, 0.094, 0.156);   // #061e31
  const vec3 BLUEBAND = vec3(0.157, 0.325, 0.576);   // #285493
  const vec3 RED      = vec3(0.702, 0.125, 0.145);   // #b32025

  // 2D simplex noise (ashima)
  vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187,0.366025403784439,
                       -0.577350269189626,0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x>x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0,i1.y,1.0))
                          + i.x + vec3(0.0,i1.x,1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0*fract(p*C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x+0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314*(a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0*dot(m,g);
  }

  void main(){
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = uv;
    p.x *= aspect;

    // Mouse falls in 0..1 range; convert to plane space
    vec2 m = uMouse;
    m.x *= aspect;

    // Layered curl-flow
    float t = uTime * 0.06;
    float n1 = snoise(p * 1.4 + vec2(t, -t * 0.6));
    float n2 = snoise(p * 2.6 + vec2(-t * 0.8, t * 0.4) + n1);
    float n3 = snoise(p * 4.2 + vec2(t * 0.3, t * 0.5) + n2 * 0.5);
    float v = (n1 + n2 * 0.5 + n3 * 0.25);

    // Mouse glow — soft falloff
    float md = distance(p, m);
    float glow = smoothstep(0.55, 0.0, md);

    // Bands — moving stripes hint at vinyl
    float bands = sin((uv.y * 18.0) + uTime * 0.4 + n1 * 1.2) * 0.5 + 0.5;
    bands = smoothstep(0.7, 1.0, bands) * 0.18;

    vec3 col = mix(NAVY, BLUEBAND, smoothstep(-0.6, 0.6, v));
    col = mix(col, RED, smoothstep(0.45, 1.0, v + glow * 0.6) * 0.85);
    col += bands;
    col += glow * 0.35 * RED;

    // Vignette
    float vig = smoothstep(1.1, 0.4, distance(uv, vec2(0.5)));
    col *= mix(0.6, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function ShaderPlane() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame(({ clock, size, pointer }) => {
    if (!ref.current) return;
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uResolution.value.set(size.width, size.height);
    // pointer is in [-1, 1]; remap to [0, 1] and lerp
    const targetX = pointer.x * 0.5 + 0.5;
    const targetY = pointer.y * 0.5 + 0.5;
    const cur = uniforms.uMouse.value;
    cur.x += (targetX - cur.x) * 0.05;
    cur.y += (targetY - cur.y) * 0.05;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={ref}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
