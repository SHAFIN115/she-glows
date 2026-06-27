"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

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

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) {
          console.error("Product not found:", error);
          router.push("/products");
          return;
        }

        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err);
        router.push("/products");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug, router]);

  function buildWhatsAppURL(productName: string, price: number, qty: number, category: string): string {
    const total = price * qty;
    const message = `Hello SheGlows! 👋

I'd like to order:

🛍 *${productName}*
Category: ${category}
Qty: ${qty}
Price: ৳${price.toLocaleString()} × ${qty} = *৳${total.toLocaleString()}*

Please confirm availability and delivery details. Thank you!`;

    const phone = "8801577677921";
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "#9e9e9e" }}>
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h2>Product not found</h2>
        <Link href="/products" style={{ color: "#c2185b" }}>Back to products</Link>
      </div>
    );
  }

  return (
    <>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
        {/* Back button */}
        <Link href="/products" style={{
          display: "inline-block",
          color: "#c2185b",
          textDecoration: "none",
          marginBottom: 20,
          fontSize: 14,
        }}>
          ← Back to products
        </Link>

        {/* Product Image */}
        <div style={{
          background: "#fafafa",
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 20,
          position: "relative",
        }}>
          {product.badge && (
            <span style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "#c2185b",
              color: "#fff",
              padding: "4px 12px",
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 600,
              zIndex: 2,
            }}>
              {product.badge}
            </span>
          )}
          <Image
            src={product.image_url}
            alt={product.name}
            width={600}
            height={400}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </div>

        {/* Product Info */}
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", marginBottom: 6 }}>
          {product.name}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ color: "#f9a825", fontSize: 16 }}>
            {"★".repeat(Math.round(product.stars || 0))}
          </span>
          <span style={{ fontSize: 13, color: "#9e9e9e" }}>
            ({product.review_count || 0} reviews)
          </span>
          <span style={{
            background: "#e8f5e9",
            color: "#2e7d32",
            padding: "2px 10px",
            borderRadius: 10,
            fontSize: 12,
          }}>
            {product.in_stock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <p style={{ fontSize: 14, color: "#6b6b6b", lineHeight: 1.6, marginBottom: 16 }}>
          {product.short_desc || product.description}
        </p>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 0",
          borderTop: "1px solid #f0e0e8",
          borderBottom: "1px solid #f0e0e8",
          marginBottom: 16,
        }}>
          <div>
            <span style={{ fontSize: 13, color: "#9e9e9e" }}>Price</span>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#c2185b" }}>
              ৳{product.price.toLocaleString()}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid #e0e0e0",
                background: "#fff",
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              −
            </button>
            <span style={{ fontSize: 18, fontWeight: 600, minWidth: 30, textAlign: "center" }}>
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid #e0e0e0",
                background: "#fff",
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* WhatsApp Order Button */}
        <a
          href={buildWhatsAppURL(product.name, product.price, qty, product.category)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            width: "100%",
            background: "#25D366",
            color: "#fff",
            padding: "16px",
            borderRadius: 30,
            fontSize: 16,
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.563 4.14 1.541 5.875L.057 23.86a.5.5 0 0 0 .614.644l6.132-1.607A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.502-5.193-1.378l-.371-.218-3.849 1.009 1.028-3.737-.241-.385A9.946 9.946 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Order on WhatsApp
        </a>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {product.tags.map((tag) => (
              <span key={tag} style={{
                background: "#fce4ec",
                color: "#880e4f",
                padding: "4px 12px",
                borderRadius: 12,
                fontSize: 12,
              }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}