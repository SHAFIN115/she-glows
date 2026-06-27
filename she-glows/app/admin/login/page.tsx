"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fff0f6, #fffbf0)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}>
      <div style={{
        background: "#fff",
        border: "1px solid #f8d7e3",
        borderRadius: 20,
        padding: "40px 32px",
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 8px 40px rgba(194,24,91,0.10)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Image
            src="/logo.jpg"
            alt="She Glows"
            width={72}
            height={72}
            style={{ borderRadius: "50%", objectFit: "cover", border: "2px solid #f8bbd0" }}
          />
          <div style={{ fontSize: 20, fontWeight: 800, color: "#880e4f", marginTop: 10 }}>
            SheGlows Admin
          </div>
          <div style={{ fontSize: 13, color: "#9e9e9e", marginTop: 2 }}>
            Sign in to manage your store
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sheglows.com"
              required
              style={{
                width: "100%",
                padding: "11px 14px",
                border: "1.5px solid #f0e0e8",
                borderRadius: 10,
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "11px 14px",
                border: "1.5px solid #f0e0e8",
                borderRadius: 10,
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <div style={{
              background: "#fff0f0",
              border: "1px solid #ffcdd2",
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 13,
              color: "#c62828",
              marginBottom: 16,
            }}>
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "#e0c4cc" : "#c2185b",
              color: "#fff",
              border: "none",
              padding: "13px",
              borderRadius: 30,
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign in →"}
          </button>
        </form>
      </div>
    </div>
  );
}