import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ProductVariant } from '../types/product';

interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, variant) => {
        set((state) => {
          const existingItem = state.items.find(
            item => item.product.id === product.id && item.variant.id === variant.id
          );

          if (existingItem) {
            return {
              items: state.items.map(item =>
                item === existingItem
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          }

          return {
            items: [...state.items, { product, variant, quantity: 1 }]
          };
        });
      },
      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            item => !(item.product.id === productId && item.variant.id === variantId)
          )
        }));
      },
      updateQuantity: (productId, variantId, quantity) => {
        set((state) => ({
          items: state.items.map(item =>
            item.product.id === productId && item.variant.id === variantId
              ? { ...item, quantity }
              : item
          )
        }));
      },
      clearCart: () => set({ items: [] }),
      total: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0);
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);