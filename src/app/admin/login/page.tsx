"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Invalid password");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#061e31] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center mb-10">
          <div
            style={{
              fontFamily: "'Apotek Extended', sans-serif",
              fontWeight: 900,
              fontSize: "2.5rem",
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            76
            <span style={{ color: "#b32025" }}>.</span>
          </div>
          <span
            className="ml-3 text-white/60 text-sm uppercase tracking-widest"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Admin
          </span>
        </div>

        <div className="bg-[#0d3a5e] border border-white/10 p-8">
          <h1
            className="text-white text-xl uppercase mb-1"
            style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
          >
            Sign In
          </h1>
          <p
            className="text-white/40 text-sm mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Enter your admin password to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                autoFocus
                required
                className="w-full bg-white/5 border border-white/20 text-white placeholder-white/30 px-4 py-3.5 text-sm focus:outline-none focus:border-[#b32025] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
              {error && (
                <p
                  className="text-[#ff6b6b] text-xs mt-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-[#b32025] hover:bg-[#8f1a1e] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold uppercase tracking-[0.2em] py-3.5 transition-colors duration-200 cursor-pointer"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p
          className="text-center text-white/20 text-xs mt-6"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          76 Graphics · Internal Admin Panel
        </p>
      </div>
    </div>
  );
}
