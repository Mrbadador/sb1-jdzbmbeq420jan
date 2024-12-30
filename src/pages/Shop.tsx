import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Product, ProductVariant } from '../types/product';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchProducts() {
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*');
      
      if (productsError) {
        console.error('Error fetching products:', productsError);
        return;
      }

      // Fetch variants for each product
      const productsWithVariants = await Promise.all(
        productsData.map(async (product) => {
          const { data: variants } = await supabase
            .from('product_variants')
            .select('*')
            .eq('product_id', product.id);
          
          return {
            ...product,
            variants: variants || []
          };
        })
      );
      
      setProducts(productsWithVariants);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(product => product.category === category);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Our Products</h1>
        
        <div className="flex space-x-4 overflow-x-auto pb-4">
          <button
            onClick={() => setCategory('all')}
            className={`px-4 py-2 rounded-lg ${
              category === 'all' 
                ? 'bg-black text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setCategory('indoor')}
            className={`px-4 py-2 rounded-lg ${
              category === 'indoor' 
                ? 'bg-black text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Indoor Strains
          </button>
          <button
            onClick={() => setCategory('greenhouse')}
            className={`px-4 py-2 rounded-lg ${
              category === 'greenhouse' 
                ? 'bg-black text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Greenhouse
          </button>
          <button
            onClick={() => setCategory('seedless_greenhouse')}
            className={`px-4 py-2 rounded-lg ${
              category === 'seedless_greenhouse' 
                ? 'bg-black text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Seedless Greenhouse
          </button>
          <button
            onClick={() => setCategory('bundle')}
            className={`px-4 py-2 rounded-lg ${
              category === 'bundle' 
                ? 'bg-black text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Bundles
          </button>
          <button
            onClick={() => setCategory('limited_time')}
            className={`px-4 py-2 rounded-lg ${
              category === 'limited_time' 
                ? 'bg-black text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Limited Time
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={(product, variant) => {
              // TODO: Implement cart functionality
              console.log('Added to cart:', product.name, variant);
            }}
          />
        ))}
      </div>
    </div>
  );
}