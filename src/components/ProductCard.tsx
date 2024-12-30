import React, { useState } from 'react';
import type { Product, ProductVariant } from '../types/product';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        {product.variants && product.variants.length > 0 ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Weight
            </label>
            <select
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              onChange={(e) => {
                const variant = product.variants?.find(v => v.id === e.target.value);
                setSelectedVariant(variant || null);
              }}
              value={selectedVariant?.id || ''}
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.weight}g - R{variant.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className="text-xl font-bold mb-4">R{product.price.toFixed(2)}</p>
        )}

        <button
          onClick={() => selectedVariant && onAddToCart(product, selectedVariant)}
          disabled={product.variants && !selectedVariant}
          className="w-full bg-gradient-to-r from-purple-600 to-green-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-green-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}