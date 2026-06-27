// types/index.ts
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  emoji: string;
  badge: string;
  tags: string[];
  stars: number;
  reviewCount: number;    // ✅ Matches products.ts
  shortDesc: string;      // ✅ Matches products.ts
  description: string;
  in_stock?: boolean;     // Optional, if you want to add later
  image_url?: string;     // Optional, for future image support
}