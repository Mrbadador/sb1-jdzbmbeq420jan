/*
  # Add product categories and items

  1. Schema Changes
    - Add category column to products table
    - Create product_variants table
    
  2. Data
    - Add all menu items with their prices and descriptions
    - Add product variants with different weights and prices
    
  3. Security
    - Enable RLS on product_variants table
    - Add public read access policy
*/

-- Add category column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS category text;

-- Insert product categories
INSERT INTO products (id, name, description, price, image_url, category)
VALUES 
  -- Indoor Strains
  (gen_random_uuid(), 'Zoap', 'A sweet and fruity blend with uplifting effects.', 150.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'indoor'),
  (gen_random_uuid(), 'Soup', 'A comforting strain with earthy flavors and relaxing properties.', 150.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'indoor'),
  (gen_random_uuid(), 'Cream Cake', 'Dessert-like sweetness with a balanced high, perfect for unwinding.', 150.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'indoor'),
  (gen_random_uuid(), 'Gelato 44', 'A rich flavor profile combining fruity and creamy notes with euphoric effects.', 150.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'indoor'),
  (gen_random_uuid(), 'Monster Skittles', 'Bursting with fruity flavors, this strain offers a delightful experience.', 150.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'indoor'),
  (gen_random_uuid(), 'Banana Cream Cake', 'A smooth and sweet strain that delivers a cheerful vibe.', 150.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'indoor'),
  (gen_random_uuid(), 'Grand Daddy Purple', 'Renowned for its deep purple hues and relaxing, sedative effects.', 150.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'indoor'),
  (gen_random_uuid(), 'Blunicorn', 'A mystical blend with balanced effects and a sweet, floral aroma.', 150.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'indoor'),
  (gen_random_uuid(), 'Purple Twilight', 'Offers a relaxing high, great for evening use with a fruity taste.', 150.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'indoor'),

  -- Greenhouse Strains
  (gen_random_uuid(), 'Biscotti Mintz', 'A sweet, minty flavor that delivers a calming effect.', 60.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'greenhouse'),
  (gen_random_uuid(), 'Black Label', 'A bold and rich strain with potent effects for relaxation.', 60.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'greenhouse'),

  -- AAA Seedless Greenhouse
  (gen_random_uuid(), 'Blueberry Mintz', 'A delightful blend of blueberry sweetness and minty freshness.', 65.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'seedless_greenhouse'),

  -- Special Bundles
  (gen_random_uuid(), 'Indoor + Greenhouse Bundle', '5g Indoor + 10g Greenhouse', 1000.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'bundle'),
  (gen_random_uuid(), '20g Indoor Bundle', '20g of premium indoor strain', 1900.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'bundle'),
  (gen_random_uuid(), 'Sweet Tooth Special', '3g Cream Cake + 3g Gelato 44 + 3g Blueberry Mintz', 1150.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'bundle'),
  (gen_random_uuid(), 'Cream Cake & Blueberry Combo', '5g Cream Cake + 5g Blueberry Mintz + Pre-Rolled Joint', 1000.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'bundle'),

  -- Limited Time Specials
  (gen_random_uuid(), 'Cream Cake 10g Bundle', '10g of Cream Cake', 900.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'limited_time'),
  (gen_random_uuid(), 'Holiday Bundle', '10g Indoor + 10g Greenhouse + 20g Outdoor', 1600.00, 'https://images.unsplash.com/photo-1603034203013-d532350372c6', 'limited_time');

-- Create product variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id),
  weight integer NOT NULL,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

-- Create policy for product variants
CREATE POLICY "Public product variants access"
  ON product_variants
  FOR SELECT TO public
  USING (true);

-- Insert variants for indoor strains
INSERT INTO product_variants (product_id, weight, price)
SELECT 
  id,
  unnest(ARRAY[1, 5, 10, 20]) as weight,
  unnest(ARRAY[150.00, 650.00, 1100.00, 1900.00]) as price
FROM products
WHERE category = 'indoor';

-- Insert variants for greenhouse strains
INSERT INTO product_variants (product_id, weight, price)
SELECT 
  id,
  unnest(ARRAY[5, 10, 20]) as weight,
  unnest(ARRAY[300.00, 500.00, 900.00]) as price
FROM products
WHERE category = 'greenhouse';

-- Insert variants for seedless greenhouse strains
INSERT INTO product_variants (product_id, weight, price)
SELECT 
  id,
  unnest(ARRAY[10, 20]) as weight,
  unnest(ARRAY[650.00, 1200.00]) as price
FROM products
WHERE category = 'seedless_greenhouse';