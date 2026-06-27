"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const stars = "★".repeat(Math.round(product.stars || 0)) + "☆".repeat(5 - Math.round(product.stars || 0));

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
          height: "100%",
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
            overflow: "hidden",
            position: "relative",
          }}
        >
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 50vw, 200px"
            />
          ) : (
            product.emoji || "📦"
          )}
        </div>
        <div style={{ padding: "12px" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#c2185b",
              marginBottom: 2,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {product.category}
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 4,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.name}
          </div>
          <div style={{ fontSize: 12, color: "#f9a825", marginBottom: 4 }}>
            {stars}
            <span style={{ color: "#9e9e9e", fontSize: 11, marginLeft: 4 }}>
              ({product.review_count || 0})
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 700, color: "#c2185b" }}>
              ৳{product.price.toLocaleString()}
            </div>
            {product.badge && (
              <span
                style={{
                  background: "#c2185b",
                  color: "#fff",
                  padding: "2px 10px",
                  borderRadius: 10,
                  fontSize: 9,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {product.badge}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}