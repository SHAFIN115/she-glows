import Footer from "@/components/Footer";

const faqs = [
  {
    q: "Are all products 100% original?",
    a: "Yes — we source directly from authorized distributors. Every product comes with an authenticity hologram or receipt.",
  },
  {
    q: "How do I place an order?",
    a: "Click 'Order on WhatsApp' on any product page. We'll confirm availability, collect your address, and arrange delivery.",
  },
  {
    q: "What are the delivery areas?",
    a: "We deliver all over Bangladesh. Dhaka: 1–2 days. Outside Dhaka: 3–5 days via courier.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash on delivery, bKash, Nagad, and Rocket. We confirm payment method on WhatsApp during order confirmation.",
  },
];

const contacts = [
  {
    icon: "💬",
    title: "WhatsApp",
    sub: "+880 1577-677921 · Fastest reply",
    href: "https://wa.me/8801577677921",
    bg: "#E8F5E9",
  },
  {
    icon: "📘",
    title: "Facebook Page",
    sub: "facebook.com/SheGlowsOfficial",
    href: "https://www.facebook.com/profile.php?id=61590652657063",
    bg: "#E3F2FD",
  },
  {
    icon: "✉️",
    title: "Email",
    sub: "hello@sheglows.com",
    href: "mailto:hello@sheglows.com",
    bg: "#fce4ec",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <div
        style={{
          background: "#fce4ec",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#880e4f",
            marginBottom: 6,
          }}
        >
          We&apos;re here for you 💬
        </h1>
        <p style={{ fontSize: 14, color: "#6b6b6b" }}>
          Order via WhatsApp or reach out any time. We reply fast!
        </p>
      </div>

      {/* Contact options */}
      <div style={{ padding: "24px" }}>
        {contacts.map((c) => (
          <a
            key={c.title}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "#fff",
              border: "1px solid #e8e0e4",
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: c.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {c.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: "#6b6b6b" }}>{c.sub}</div>
            </div>
            <span style={{ color: "#9e9e9e" }}>→</span>
          </a>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ padding: "0 24px 32px" }}>
        <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 16 }}>
          Frequently asked questions
        </h2>
        {faqs.map((f) => (
          <div
            key={f.q}
            style={{
              borderBottom: "1px solid #e8e0e4",
              padding: "14px 0",
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
              {f.q}
            </div>
            <div style={{ fontSize: 13, color: "#6b6b6b", lineHeight: 1.55 }}>
              {f.a}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}