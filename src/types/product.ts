export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: 'indoor' | 'greenhouse' | 'seedless_greenhouse' | 'bundle' | 'limited_time';
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  weight: number;
  price: number;
}