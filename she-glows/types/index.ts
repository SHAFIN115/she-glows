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
  review_count: number;    // Note: snake_case to match Supabase
  short_desc: string;      // Note: snake_case to match Supabase
  description: string;
  image_url: string;
  in_stock: boolean;
  created_at?: string;
}