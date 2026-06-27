export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  emoji?: string;           // ✅ Optional - not in Supabase
  badge: string;
  tags: string[];
  stars: number;
  review_count: number;     // ✅ snake_case (matches Supabase)
  short_desc: string;       // ✅ snake_case (matches Supabase)
  description: string;
  image_url: string;        // ✅ from Supabase
  in_stock: boolean;        // ✅ from Supabase
  created_at?: string;      // Optional - from Supabase
}