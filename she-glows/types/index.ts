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
  reviewCount: number;
  shortDesc: string;
  description: string;
}