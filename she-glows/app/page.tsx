import Link from "next/link";
import Image from "next/image";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const featured = products.slice(0, 4);
const bestSellers = products.filter((p) =>
  ["Bestseller", "Fan Favorite", "Dermatologist Pick"].includes(p.badge)
);

const reviews = [
  {
    initials: "RK",
    name: "Rahnuma Khan",
    time: "3 days ago",
    stars: 5,
    product: "Beauty of Joseon Sunscreen",
    text: "Arrived next day, 100% original with hologram sticker. Absolutely love it — no white cast at all!",
  },
  {
    initials: "SM",
    name: "Sadia M.",
    time: "1 week ago",
    stars: 5,
    product: "CeraVe Moisturizing Cream",
    text: "Cleared my dry patches in two weeks. SheGlows is the only shop I trust for authentic products in Dhaka.",
  },
  {
    initials: "TH",
    name: "Tasnim H.",
    time: "2 weeks ago",
    stars: 5,
    product: "Laneige Lip Sleeping Mask",
    text: "Woke up with the softest lips! Fast delivery and beautifully packaged. Will definitely reorder.",
  },
];

const trustBadges = [
  { icon: "✅", title: "100% Original", sub: "Hologram verified" },
  { icon: "🚚", title: "Fast Delivery", sub: "1–2 days in Dhaka" },
  { icon: "💳", title: "bKash & COD", sub: "Easy payment" },
  { icon: "🔄", title: "Easy Returns", sub: "7-day return policy" },
];

export default function HomePage() {
  return (
    <div style={{ fontFamily: "inherit", color: "#1a1a1a" }}>
      
      {/* ── HERO ── */}
      <section
        style={{
          background: "linear-gradient(160deg, #fff0f6 0%, #fffbf0 60%, #fff8e1 100%)",
          padding: "0",
          overflow: "hidden",
          borderBottom: "1px solid #f0e0e8",
          minHeight: 480,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* decorative circles */}
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 220, height: 220, borderRadius: "50%",
          background: "rgba(194,24,91,0.05)", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", bottom: -40, left: -40,
          width: 160, height: 160, borderRadius: "50%",
          background: "rgba(249,168,37,0.07)", zIndex: 0,
        }} />

        <div style={{ position: "relative", zIndex: 1, padding: "56px 24px 40px" }}>
          {/* Logo */}
          <div style={{ marginBottom: 20 }}>
            <Image
              src="/logo.jpg"
              alt="She Glows logo"
              width={100}
              height={100}
              style={{ borderRadius: "50%", objectFit: "cover", border: "3px solid #f8bbd0" }}
            />
          </div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#fff", border: "1px solid #f8bbd0",
            color: "#880e4f", fontSize: 12, padding: "5px 14px",
            borderRadius: 20, marginBottom: 18, fontWeight: 500,
            boxShadow: "0 2px 8px rgba(194,24,91,0.10)",
          }}>
            ✨ Authentic · Original · Trusted
          </div>

          <h1 style={{
            fontSize: 36, fontWeight: 800, color: "#880e4f",
            marginBottom: 12, lineHeight: 1.2,
            letterSpacing: "-0.5px",
          }}>
            Glow from within ✨
          </h1>
          <p style={{
            color: "#7b5e6a", fontSize: 16, maxWidth: 360,
            margin: "0 auto 28px", lineHeight: 1.65,
          }}>
            Pure, gentle skincare & cosmetics for radiant, healthy skin.
            100% original products delivered to your door.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/products" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#c2185b", color: "#fff",
              padding: "14px 30px", borderRadius: 30,
              fontSize: 15, fontWeight: 700, textDecoration: "none",
              boxShadow: "0 4px 16px rgba(194,24,91,0.30)",
            }}>
              🛍 Shop now
            </Link>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#fff", color: "#c2185b",
              border: "1.5px solid #f8bbd0",
              padding: "14px 24px", borderRadius: 30,
              fontSize: 15, fontWeight: 600, textDecoration: "none",
            }}>
              💬 Order on WhatsApp
            </Link>
          </div>

          {/* social proof */}
          <div style={{
            marginTop: 28, display: "flex", alignItems: "center",
            justifyContent: "center", gap: 12,
          }}>
            <div style={{ display: "flex" }}>
              {["RK","SM","TH","NA"].map((i) => (
                <div key={i} style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "#fce4ec", border: "2px solid #fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, color: "#880e4f",
                  marginLeft: -6,
                }}>{i}</div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: "#7b5e6a" }}>
              <strong style={{ color: "#880e4f" }}>89+ happy customers</strong> · ★★★★★ rated
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section style={{
        background: "#fff",
        borderBottom: "1px solid #f0e0e8",
        padding: "20px 16px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8,
          maxWidth: 640,
          margin: "0 auto",
        }}>
          {trustBadges.map((b) => (
            <div key={b.title} style={{ textAlign: "center", padding: "8px 4px" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{b.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#880e4f" }}>{b.title}</div>
              <div style={{ fontSize: 11, color: "#9e9e9e" }}>{b.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section style={{ padding: "32px 20px", background: "#fafafa" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#880e4f", marginBottom: 4 }}>
            Shop by category
          </h2>
          <p style={{ fontSize: 13, color: "#9e9e9e" }}>Find what your skin needs</p>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          maxWidth: 480,
          margin: "0 auto",
        }}>
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={`/products?category=${cat.label}`}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                background: "#fff",
                border: "1.5px solid #f8d7e3",
                borderRadius: 16,
                padding: "18px 10px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all .15s",
              }}>
                <div style={{ fontSize: 26, marginBottom: 6 }}>{cat.emoji}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#880e4f" }}>{cat.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED BANNER ── */}
      <section style={{
        margin: "0 20px",
        borderRadius: 20,
        background: "linear-gradient(135deg, #880e4f, #c2185b)",
        padding: "28px 24px",
        color: "#fff",
        textAlign: "center",
        marginTop: 8,
        marginBottom: 8,
      }}>
        <div style={{ fontSize: 13, opacity: .8, marginBottom: 6 }}>Limited time</div>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
          Free delivery on first order 🎁
        </div>
        <div style={{ fontSize: 14, opacity: .85, marginBottom: 18 }}>
          Order on WhatsApp and mention <strong>FIRSTORDER</strong>
        </div>
        <a href="https://wa.me/8801577677921?text=Hi! I want to place my first order. Code: FIRSTORDER"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-block", background: "#fff",
            color: "#c2185b", fontWeight: 700, fontSize: 14,
            padding: "11px 24px", borderRadius: 30, textDecoration: "none",
          }}>
          Claim offer →
        </a>
      </section>

      {/* ── BESTSELLERS ── */}
      <section style={{ padding: "32px 20px" }}>
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", marginBottom: 16,
        }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#880e4f", marginBottom: 2 }}>
              Bestsellers ⭐
            </h2>
            <p style={{ fontSize: 13, color: "#9e9e9e" }}>Most loved by our customers</p>
          </div>
          <Link href="/products" style={{
            fontSize: 13, color: "#c2185b", fontWeight: 600,
            textDecoration: "none", whiteSpace: "nowrap",
          }}>
            View all →
          </Link>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
        }}>
          {bestSellers.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── ALL FEATURED ── */}
      <section style={{
        padding: "32px 20px",
        background: "#fafafa",
        borderTop: "1px solid #f0e0e8",
      }}>
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", marginBottom: 16,
        }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#880e4f", marginBottom: 2 }}>
              New arrivals 🆕
            </h2>
            <p style={{ fontSize: 13, color: "#9e9e9e" }}>Fresh in stock</p>
          </div>
          <Link href="/products" style={{
            fontSize: 13, color: "#c2185b", fontWeight: 600,
            textDecoration: "none", whiteSpace: "nowrap",
          }}>
            See all →
          </Link>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
        }}>
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── WHY SHEGLOWS ── */}
      <section style={{ padding: "36px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#880e4f", marginBottom: 6 }}>
          Why choose SheGlows?
        </h2>
        <p style={{ fontSize: 13, color: "#9e9e9e", marginBottom: 24 }}>
          We&apos;re not just a shop — we care about your skin
        </p>
        {[
          {
            icon: "🔬",
            title: "Dermatologist-approved picks",
            desc: "Every product is carefully selected for safety and effectiveness.",
          },
          {
            icon: "📦",
            title: "Safe & secure packaging",
            desc: "Products arrive sealed, intact, and exactly as shown.",
          },
          {
            icon: "💬",
            title: "Real human support",
            desc: "Chat with us on WhatsApp — we reply within minutes.",
          },
          {
            icon: "⭐",
            title: "Trusted by 89+ customers",
            desc: "Growing community of happy, glowing customers across Bangladesh.",
          },
        ].map((item) => (
          <div key={item.title} style={{
            display: "flex", alignItems: "flex-start", gap: 14,
            background: "#fff", border: "1px solid #f0e0e8",
            borderRadius: 14, padding: "16px", marginBottom: 10,
            textAlign: "left",
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "#fce4ec", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 20, flexShrink: 0,
            }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: "#6b6b6b", lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </section>

      {/* ── REVIEWS ── */}
      <section style={{
        padding: "32px 20px",
        background: "linear-gradient(160deg, #fff0f6, #fffbf0)",
        borderTop: "1px solid #f0e0e8",
      }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#880e4f", marginBottom: 4 }}>
            Customer love 💕
          </h2>
          <div style={{ fontSize: 22, color: "#f9a825", marginBottom: 4 }}>★★★★★</div>
          <p style={{ fontSize: 13, color: "#9e9e9e" }}>Real reviews from real people</p>
        </div>
        {reviews.map((r) => (
          <div key={r.name} style={{
            background: "#fff",
            border: "1px solid #f8d7e3",
            borderRadius: 16,
            padding: "16px",
            marginBottom: 12,
            boxShadow: "0 2px 12px rgba(194,24,91,0.06)",
          }}>
            <div style={{
              display: "flex", alignItems: "center",
              gap: 10, marginBottom: 10,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: "#fce4ec", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, color: "#880e4f",
                flexShrink: 0,
              }}>
                {r.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: "#9e9e9e" }}>{r.time}</div>
              </div>
              <div style={{ color: "#f9a825", fontSize: 13 }}>
                {"★".repeat(r.stars)}
              </div>
            </div>
            <div style={{
              fontSize: 11, background: "#fce4ec", color: "#880e4f",
              padding: "3px 10px", borderRadius: 10, display: "inline-block",
              marginBottom: 8, fontWeight: 500,
            }}>
              {r.product}
            </div>
            <p style={{ fontSize: 13, color: "#6b6b6b", lineHeight: 1.6, margin: 0 }}>
              &ldquo;{r.text}&rdquo;
            </p>
          </div>
        ))}
      </section>

      {/* ── WHATSAPP CTA ── */}
      <section style={{
        padding: "36px 20px",
        textAlign: "center",
        background: "#fff",
        borderTop: "1px solid #f0e0e8",
      }}>
        <div style={{ fontSize: 32, marginBottom: 10 }}>💬</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>
          Ready to order?
        </h2>
        <p style={{ fontSize: 14, color: "#6b6b6b", marginBottom: 24, maxWidth: 320, margin: "0 auto 24px" }}>
          Just tap below and we&apos;ll help you pick the right products for your skin type.
        </p>
        
        <a
          href="https://wa.me/8801577677921?text=Hi SheGlows! I'd like to browse your products and place an order 😊"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#25D366", color: "#fff",
            padding: "15px 32px", borderRadius: 30,
            fontSize: 16, fontWeight: 700, textDecoration: "none",
            boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.563 4.14 1.541 5.875L.057 23.86a.5.5 0 0 0 .614.644l6.132-1.607A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.502-5.193-1.378l-.371-.218-3.849 1.009 1.028-3.737-.241-.385A9.946 9.946 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Chat on WhatsApp
        </a>
      </section>

      <Footer />
    </div>
  );
}