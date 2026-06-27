// types/index.ts
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  emoji?: string;
  badge: string;
  tags: string[];
  stars: number;
  review_count: number;     // ✅ snake_case
  short_desc: string;       // ✅ snake_case
  description: string;
  image_url: string;
  in_stock: boolean;
  created_at?: string;
}