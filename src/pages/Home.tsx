import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Music, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="relative">
        <div 
          className="h-[600px] bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1527195575508-5b138d14a35b?auto=format&fit=crop&q=80")',
            backgroundPosition: '50% 20%'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 to-green-900/70 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-6xl font-bold mb-6 font-serif">420 Goods</h1>
              <p className="text-3xl mb-2">Delivered All Day</p>
              <p className="text-xl mb-8 italic">"Drop it like it's hot"</p>
              <Link
                to="/shop"
                className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-lg"
              >
                <ShoppingBag className="mr-2" />
                Shop Now Fo' Shizzle
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-4 bg-gradient-to-b from-purple-50 to-green-50">
        <h2 className="text-4xl font-bold text-center mb-12 font-serif">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Star className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-2xl font-semibold mb-4">VIP Treatment</h3>
            <p className="text-gray-600">Earn points daily just by logging in. Stack them papers!</p>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-2xl font-semibold mb-4">Quick Delivery</h3>
            <p className="text-gray-600">No registration needed. We keep it simple and smooth.</p>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Music className="w-12 h-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-2xl font-semibold mb-4">Loyalty Rewards</h3>
            <p className="text-gray-600">Get R100 off when you hit 1000 points. That's the chronic deal!</p>
          </div>
        </div>
      </div>
    </div>
  );
}