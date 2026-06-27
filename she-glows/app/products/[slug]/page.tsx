"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("category") || "All";
  const [active, setActive] = useState(initial);

  const filters = ["All", ...categories.map((c) => c.label)];
  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <>
      {/* Filter bar */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "12px 24px",
          overflowX: "auto",
          borderBottom: "1px solid #e8e0e4",
          background: "#fff",
          position: "sticky",
          top: 57,
          zIndex: 40,
        }}
      >
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            style={{
              whiteSpace: "nowrap",
              padding: "6px 16px",
              borderRadius: 20,
              border: "1px solid",
              borderColor: active === f ? "#c2185b" : "#e8e0e4",
              background: active === f ? "#c2185b" : "#fff",
              color: active === f ? "#fff" : "#6b6b6b",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: active === f ? 600 : 400,
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
          padding: "20px 24px",
        }}
      >
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "#9e9e9e", padding: "40px 0" }}>
          No products in this category yet.
        </p>
      )}

      <Footer />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}