"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  badge: string;
  tags: string[];
  stars: number;
  review_count: number;
  short_desc: string;
  description: string;
  image_url: string;
  in_stock: boolean;
}

const CATEGORIES = ["Skincare", "Sunscreen", "Hair Care", "Makeup", "Lip Care", "Eye Care"];
const BADGES = ["Bestseller", "New Arrival", "Fan Favorite", "Dermatologist Pick", "Budget Pick", "Korean", "Vegan", "Brightening", "Hydrating"];

const emptyForm = {
  name: "", slug: "", price: 0, category: "Skincare",
  badge: "New Arrival", tags: "", stars: 5, review_count: 0,
  short_desc: "", description: "", image_url: "", in_stock: true,
};

export default function AdminDashboard() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState("");

  // Auth check
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push("/admin/login");
    });
  }, [router]);

  // Load products
  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  function slugify(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function handleNameChange(name: string) {
    setForm((f) => ({ ...f, name, slug: slugify(name) }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file);

    if (error) {
      setMsg("❌ Image upload failed. Check storage bucket settings.");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    setForm((f) => ({ ...f, image_url: urlData.publicUrl }));
    setPreview(urlData.publicUrl);
    setUploading(false);
    setMsg("✅ Image uploaded!");
    setTimeout(() => setMsg(""), 3000);
  }

  async function handleSave() {
    if (!form.name || !form.price || !form.category) {
      setMsg("❌ Name, price and category are required.");
      return;
    }
    setSaving(true);

    const payload = {
      name: form.name,
      slug: form.slug || slugify(form.name),
      price: Number(form.price),
      category: form.category,
      badge: form.badge,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      stars: Number(form.stars),
      review_count: Number(form.review_count),
      short_desc: form.short_desc,
      description: form.description,
      image_url: form.image_url,
      in_stock: form.in_stock,
    };

    if (view === "edit" && editId) {
      const { error } = await supabase.from("products").update(payload).eq("id", editId);
      if (error) { setMsg("❌ Update failed: " + error.message); }
      else { setMsg("✅ Product updated!"); }
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) { setMsg("❌ Save failed: " + error.message); }
      else { setMsg("✅ Product added!"); }
    }

    setSaving(false);
    await loadProducts();
    setTimeout(() => { setMsg(""); setView("list"); }, 1500);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await supabase.from("products").delete().eq("id", id);
    await loadProducts();
    setMsg(`✅ "${name}" deleted.`);
    setTimeout(() => setMsg(""), 3000);
  }

  function startEdit(p: Product) {
    setForm({
      name: p.name, slug: p.slug, price: p.price,
      category: p.category, badge: p.badge,
      tags: p.tags.join(", "), stars: p.stars,
      review_count: p.review_count, short_desc: p.short_desc,
      description: p.description, image_url: p.image_url,
      in_stock: p.in_stock,
    });
    setPreview(p.image_url);
    setEditId(p.id);
    setView("edit");
  }

  function startAdd() {
    setForm(emptyForm);
    setPreview("");
    setEditId(null);
    setView("add");
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const inp = (extra?: React.CSSProperties): React.CSSProperties => ({
    width: "100%", padding: "10px 12px",
    border: "1.5px solid #f0e0e8", borderRadius: 10,
    fontSize: 14, outline: "none", boxSizing: "border-box",
    background: "#fff", ...extra,
  });

  // ── LIST VIEW ──
  if (view === "list") return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      {/* Top bar */}
      <div style={{
        background: "#880e4f", color: "#fff",
        padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16 }}>SheGlows Admin</div>
          <div style={{ fontSize: 11, opacity: .7 }}>{products.length} products total</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href="/" target="_blank" style={{
            fontSize: 13, color: "#fff", opacity: .8,
            textDecoration: "none", padding: "6px 12px",
            border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20,
          }}>
            View site ↗
          </a>
          <button onClick={handleLogout} style={{
            fontSize: 13, color: "#fff", background: "rgba(255,255,255,0.15)",
            border: "none", padding: "6px 14px", borderRadius: 20, cursor: "pointer",
          }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        {msg && (
          <div style={{
            background: msg.includes("❌") ? "#fff0f0" : "#f0fff4",
            border: `1px solid ${msg.includes("❌") ? "#ffcdd2" : "#c8e6c9"}`,
            borderRadius: 10, padding: "12px 16px",
            fontSize: 14, marginBottom: 16,
            color: msg.includes("❌") ? "#c62828" : "#2e7d32",
          }}>
            {msg}
          </div>
        )}

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 20 }}>
          {[
            { label: "Total products", value: products.length },
            { label: "In stock", value: products.filter(p => p.in_stock).length },
            { label: "Out of stock", value: products.filter(p => !p.in_stock).length },
          ].map((s) => (
            <div key={s.label} style={{
              background: "#fff", border: "1px solid #f0e0e8",
              borderRadius: 12, padding: "14px 12px", textAlign: "center",
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#880e4f" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#9e9e9e" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search + Add */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <input
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inp(), flex: 1 }}
          />
          <button onClick={startAdd} style={{
            background: "#c2185b", color: "#fff", border: "none",
            padding: "10px 18px", borderRadius: 10, fontSize: 14,
            fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
          }}>
            + Add product
          </button>
        </div>

        {/* Product list */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 40, color: "#9e9e9e" }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: "#9e9e9e" }}>
            No products yet. Add your first one!
          </div>
        ) : (
          filtered.map((p) => (
            <div key={p.id} style={{
              background: "#fff", border: "1px solid #f0e0e8",
              borderRadius: 14, padding: "14px",
              marginBottom: 10, display: "flex",
              alignItems: "center", gap: 12,
            }}>
              {/* Image */}
              <div style={{
                width: 56, height: 56, borderRadius: 10,
                background: "#fce4ec", flexShrink: 0,
                overflow: "hidden", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 24,
              }}>
                {p.image_url ? (
                  <Image src={p.image_url} alt={p.name} width={56} height={56}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                ) : "📦"}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 12, color: "#9e9e9e" }}>
                  {p.category} · ৳{p.price.toLocaleString()}
                </div>
                <div style={{
                  display: "inline-block", fontSize: 10,
                  background: p.in_stock ? "#f0fff4" : "#fff0f0",
                  color: p.in_stock ? "#2e7d32" : "#c62828",
                  padding: "2px 8px", borderRadius: 8,
                  marginTop: 4, fontWeight: 600,
                }}>
                  {p.in_stock ? "● In stock" : "● Out of stock"}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button onClick={() => startEdit(p)} style={{
                  fontSize: 12, padding: "6px 12px", borderRadius: 8,
                  border: "1px solid #f0e0e8", background: "#fff",
                  cursor: "pointer", color: "#880e4f", fontWeight: 600,
                }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(p.id, p.name)} style={{
                  fontSize: 12, padding: "6px 12px", borderRadius: 8,
                  border: "1px solid #ffcdd2", background: "#fff0f0",
                  cursor: "pointer", color: "#c62828", fontWeight: 600,
                }}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // ── ADD / EDIT FORM ──
  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      {/* Top bar */}
      <div style={{
        background: "#880e4f", color: "#fff",
        padding: "14px 20px",
        display: "flex", alignItems: "center", gap: 12,
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <button onClick={() => setView("list")} style={{
          background: "rgba(255,255,255,0.15)", border: "none",
          color: "#fff", padding: "6px 12px", borderRadius: 20,
          cursor: "pointer", fontSize: 13,
        }}>
          ← Back
        </button>
        <div style={{ fontWeight: 800, fontSize: 16 }}>
          {view === "edit" ? "Edit product" : "Add new product"}
        </div>
      </div>

      <div style={{ padding: 20, maxWidth: 560, margin: "0 auto" }}>
        {msg && (
          <div style={{
            background: msg.includes("❌") ? "#fff0f0" : "#f0fff4",
            border: `1px solid ${msg.includes("❌") ? "#ffcdd2" : "#c8e6c9"}`,
            borderRadius: 10, padding: "12px 16px",
            fontSize: 14, marginBottom: 16,
            color: msg.includes("❌") ? "#c62828" : "#2e7d32",
          }}>
            {msg}
          </div>
        )}

        {/* Image upload */}
        <div style={{
          background: "#fff", border: "1.5px dashed #f8bbd0",
          borderRadius: 14, padding: 20,
          textAlign: "center", marginBottom: 16, cursor: "pointer",
        }} onClick={() => fileRef.current?.click()}>
          {preview ? (
            <Image src={preview} alt="preview" width={120} height={120}
              style={{ objectFit: "cover", borderRadius: 10, margin: "0 auto" }} />
          ) : (
            <div>
              <div style={{ fontSize: 36, marginBottom: 8 }}>📷</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#880e4f" }}>
                {uploading ? "Uploading..." : "Tap to upload product photo"}
              </div>
              <div style={{ fontSize: 12, color: "#9e9e9e", marginTop: 4 }}>
                JPG, PNG — max 5MB
              </div>
            </div>
          )}
          <input
            ref={fileRef} type="file" accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
        {preview && (
          <button onClick={() => fileRef.current?.click()}
            style={{
              width: "100%", fontSize: 13, color: "#c2185b",
              background: "#fff0f6", border: "1px solid #f8bbd0",
              borderRadius: 10, padding: "8px", marginBottom: 16, cursor: "pointer",
            }}>
            {uploading ? "Uploading..." : "Change photo"}
          </button>
        )}

        {/* Form fields */}
        {[
          { label: "Product name *", key: "name", type: "text", placeholder: "e.g. Beauty of Joseon Sunscreen" },
          { label: "Slug (auto-filled)", key: "slug", type: "text", placeholder: "beauty-of-joseon-sunscreen" },
          { label: "Price (৳) *", key: "price", type: "number", placeholder: "1650" },
          { label: "Short description", key: "short_desc", type: "text", placeholder: "One-line summary" },
          { label: "Tags (comma separated)", key: "tags", type: "text", placeholder: "SPF 50+, Korean, Reef Safe" },
          { label: "Star rating (1–5)", key: "stars", type: "number", placeholder: "5" },
          { label: "Review count", key: "review_count", type: "number", placeholder: "0" },
        ].map((field) => (
          <div key={field.key} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: 5 }}>
              {field.label}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={(form as Record<string, unknown>)[field.key] as string}
              onChange={(e) => {
                const val = field.key === "name" ? e.target.value : e.target.value;
                if (field.key === "name") handleNameChange(val);
                else setForm((f) => ({ ...f, [field.key]: val }));
              }}
              style={inp()}
            />
          </div>
        ))}

        {/* Category */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: 5 }}>
            Category *
          </label>
          <select value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            style={inp()}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Badge */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: 5 }}>
            Badge
          </label>
          <select value={form.badge}
            onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
            style={inp()}>
            {BADGES.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: 5 }}>
            Full description
          </label>
          <textarea
            rows={4}
            placeholder="Detailed product description..."
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            style={{ ...inp(), resize: "vertical" }}
          />
        </div>

        {/* In stock toggle */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          marginBottom: 24,
        }}>
          <input type="checkbox" id="instock" checked={form.in_stock}
            onChange={(e) => setForm((f) => ({ ...f, in_stock: e.target.checked }))}
            style={{ width: 18, height: 18, cursor: "pointer" }}
          />
          <label htmlFor="instock" style={{ fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            In stock
          </label>
        </div>

        {/* Save button */}
        <button onClick={handleSave} disabled={saving || uploading} style={{
          width: "100%", background: saving ? "#e0c4cc" : "#c2185b",
          color: "#fff", border: "none", padding: "15px",
          borderRadius: 30, fontSize: 16, fontWeight: 700,
          cursor: saving ? "not-allowed" : "pointer",
          marginBottom: 40,
        }}>
          {saving ? "Saving..." : view === "edit" ? "Update product ✓" : "Add product ✓"}
        </button>
      </div>
    </div>
  );
}