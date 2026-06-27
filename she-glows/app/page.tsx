import Link from "next/link";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const featured = products.slice(0, 4);

const reviews = [
  {
    initials: "RK",
    name: "Rahnuma Khan",
    time: "3 days ago",
    stars: 5,
    text: "Ordered the Beauty of Joseon sunscreen — arrived next day, 100% original with hologram sticker. Will order again!",
  },
  {
    initials: "SM",
    name: "Sadia M.",
    time: "1 week ago",
    stars: 5,
    text: "CeraVe cleared my dry patches in two weeks. SheGlows is the only shop I trust for authentic products in Dhaka.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg,#fff0f6 0%,#fff8e1 100%)",
          padding: "52px 24px",
          textAlign: "center",
          borderBottom: "1px solid #e8e0e4",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "#fce4ec",
            color: "#880e4f",
            fontSize: 12,
            padding: "4px 14px",
            borderRadius: 20,
            marginBottom: 16,
            fontWeight: 500,
          }}
        >
          ✨ 100% Original Products
        </div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#880e4f",
            marginBottom: 10,
            lineHeight: 1.25,
          }}
        >
          Skincare that <br />
          actually works
        </h1>
        <p
          style={{
            color: "#6b6b6b",
            fontSize: 15,
            maxWidth: 340,
            margin: "0 auto 28px",
          }}
        >
          Authentic Korean, drugstore & luxury cosmetics — delivered to your
          door.
        </p>
        <Link
          href="/products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#c2185b",
            color: "#fff",
            padding: "13px 28px",
            borderRadius: 30,
            fontSize: 15,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          ✨ Shop now
        </Link>
      </section>

      {/* Categories */}
      <section style={{ padding: "28px 24px" }}>
        <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>
          Shop by category
        </h2>
        <p style={{ fontSize: 13, color: "#6b6b6b", marginBottom: 16 }}>
          Find what your skin needs
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={`/products?category=${cat.label}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: "#fafafa",
                  border: "1px solid #e8e0e4",
                  borderRadius: 12,
                  padding: "14px 10px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 6 }}>{cat.emoji}</div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{cat.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section
        style={{
          padding: "28px 24px",
          background: "#fafafa",
          borderTop: "1px solid #e8e0e4",
          borderBottom: "1px solid #e8e0e4",
        }}
      >
        <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>
          Featured products
        </h2>
        <p style={{ fontSize: 13, color: "#6b6b6b", marginBottom: 16 }}>
          Most loved by our customers
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
          }}
        >
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link
            href="/products"
            style={{
              display: "inline-block",
              border: "1px solid #c2185b",
              color: "#c2185b",
              padding: "10px 24px",
              borderRadius: 30,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            View all products →
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: "28px 24px" }}>
        <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>
          What customers say
        </h2>
        <p style={{ fontSize: 13, color: "#6b6b6b", marginBottom: 16 }}>
          Real reviews from real people
        </p>
        {reviews.map((r) => (
          <div
            key={r.name}
            style={{
              background: "#fafafa",
              border: "1px solid #e8e0e4",
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "#fce4ec",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#880e4f",
                  flexShrink: 0,
                }}
              >
                {r.initials}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: "#9e9e9e" }}>
                  {r.time} · {"★".repeat(r.stars)}
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#6b6b6b", lineHeight: 1.55 }}>
              {r.text}
            </p>
          </div>
        ))}
      </section>

      <Footer />
    </>
  );
}