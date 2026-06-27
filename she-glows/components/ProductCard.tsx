"use client";

import Link from "next/link";
import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const stars = "★".repeat(product.stars) + "☆".repeat(5 - product.stars);

  return (
    <Link
      href={`/products/${product.slug}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid #e8e0e4",
          borderRadius: 12,
          overflow: "hidden",
          cursor: "pointer",
          transition: "all .15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "#c2185b";
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 2px 12px rgba(194,24,91,.10)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "#e8e0e4";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        <div
          style={{
            width: "100%",
            height: 120,
            background: "linear-gradient(135deg,#fce4ec,#fff8e1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
          }}
        >
          {product.emoji}
        </div>

        <div style={{ padding: "10px 12px" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 10,
              background: "#fff8e1",
              color: "#7a5800",
              padding: "2px 8px",
              borderRadius: 10,
              marginBottom: 5,
              fontWeight: 500,
            }}
          >
            {product.badge}
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.3,
              marginBottom: 3,
            }}
          >
            {product.name}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#c2185b" }}>
            ৳{product.price.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: "#f9a825", marginTop: 3 }}>
            {stars}{" "}
            <span style={{ color: "#9e9e9e" }}>({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}