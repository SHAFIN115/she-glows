"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 24px",
        borderBottom: "1px solid #e8e0e4",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <span
          style={{ fontWeight: 700, fontSize: 20, color: "#880e4f" }}
        >
          She
          <span style={{ fontWeight: 300, color: "#c2185b" }}>Glows</span>
        </span>
      </Link>

      <div style={{ display: "flex", gap: 24 }}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              fontSize: 14,
              textDecoration: "none",
              fontWeight: path === l.href ? 600 : 400,
              color: path === l.href ? "#880e4f" : "#6b6b6b",
              borderBottom:
                path === l.href ? "2px solid #c2185b" : "2px solid transparent",
              paddingBottom: 2,
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}