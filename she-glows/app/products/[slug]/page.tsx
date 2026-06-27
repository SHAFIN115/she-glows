"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const CATEGORIES = ["Skincare", "Sunscreen", "Hair Care", "Makeup", "Lip Care", "Eye Care"];

function ProductsContent() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("category") || "All";
  const [active, setActive] = useState(initial);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("in_stock", true)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error loading products:", error);
          setProducts([]);
        } else {
          setProducts(data || []);
        }
      } catch (err) {
        console.error("Failed to load products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filters = ["All", ...CATEGORIES];
  const filtered = active === "All" 
    ? products 
    : products.filter((p) => p.category === active);

  return (
    <>
      <div style={{
        display: "flex", 
        gap: 8, 
        padding: "12px 20px",
        overflowX: "auto", 
        borderBottom: "1px solid #f0e0e8",
        background: "#fff", 
        position: "sticky", 
        top: 57, 
        zIndex: 40,
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}>
        {filters.map((f) => (
          <button 
            key={f} 
            onClick={() => setActive(f)} 
            style={{
              whiteSpace: "nowrap", 
              padding: "6px 16px", 
              borderRadius: 20,
              border: "1px solid", 
              fontSize: 13, 
              cursor: "pointer", 
              fontWeight: active === f ? 600 : 400,
              borderColor: active === f ? "#c2185b" : "#f0e0e8",
              background: active === f ? "#c2185b" : "#fff",
              color: active === f ? "#fff" : "#6b6b6b",
              transition: "all .15s",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "#9e9e9e" }}>
          Loading products...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "#9e9e9e" }}>
          No products found in this category.
        </div>
      ) : (
        <div style={{
          display: "grid", 
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12, 
          padding: "20px",
        }}>
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
      <Footer />
    </>
  );
}

export default function ProductsPage() {
  return <Suspense><ProductsContent /></Suspense>;
}