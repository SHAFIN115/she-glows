import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#880e4f",
        color: "#fff",
        padding: "32px 24px",
        textAlign: "center",
        marginTop: 40,
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
        SheGlows ✨
      </div>
      <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 16 }}>
        Original cosmetics, fast delivery.
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 24,
          marginBottom: 16,
        }}
      >
        {["/", "/products", "/contact"].map((href, i) => (
          <Link
            key={href}
            href={href}
            style={{ color: "#fff", opacity: 0.8, fontSize: 13, textDecoration: "none" }}
          >
            {["Home", "Shop", "Contact"][i]}
          </Link>
        ))}
      </div>
      <div style={{ fontSize: 12, opacity: 0.4 }}>
        © {new Date().getFullYear()} SheGlows · All rights reserved
      </div>
    </footer>
  );
}