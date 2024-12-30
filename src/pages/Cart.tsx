import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function Cart() {
  const { user } = useAuthStore();
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();

  const handleCheckout = () => {
    // Format cart items for WhatsApp message
    const itemsList = items.map(item => 
      `${item.product.name} (${item.variant.weight}g) x${item.quantity} - R${(item.variant.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const message = `New Order:\n\n${itemsList}\n\nTotal: R${total().toFixed(2)}`;
    
    // Create WhatsApp link with pre-filled message
    const whatsappLink = `https://wa.me/277639439771?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappLink, '_blank');
    
    // Clear the cart after sending to WhatsApp
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            to="/shop"
            className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="divide-y">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.variant.id}`} className="py-4 flex justify-between items-center">
              <div className="flex space-x-4">
                <img 
                  src={item.product.image_url} 
                  alt={item.product.name} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-gray-600">{item.variant.weight}g</p>
                  <p className="text-gray-600">R{item.variant.price.toFixed(2)} each</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.variant.id, Math.max(0, item.quantity - 1))}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="font-semibold w-24 text-right">
                  R{(item.variant.price * item.quantity).toFixed(2)}
                </p>
                
                <button
                  onClick={() => removeItem(item.product.id, item.variant.id)}
                  className="p-1 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-6">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>R{total().toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Proceed to WhatsApp Checkout
          </button>
        </div>
      </div>
    </div>
  );
}