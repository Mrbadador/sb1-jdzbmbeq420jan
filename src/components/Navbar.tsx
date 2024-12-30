import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Package, LogIn, LogOut, Cannabis } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const { user, signOut } = useAuthStore();

  return (
    <nav className="bg-gradient-to-r from-purple-900 to-green-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Cannabis className="h-8 w-8" />
            <span>420 Goods</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/shop" className="text-white hover:text-green-400 transition-colors">
              Shop
            </Link>
            
            <Link to="/cart" className="text-white hover:text-green-400 transition-colors">
              <ShoppingCart className="h-6 w-6" />
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="text-white hover:text-green-400 transition-colors">
                  <User className="h-6 w-6" />
                </Link>
                <Link to="/orders" className="text-white hover:text-green-400 transition-colors">
                  <Package className="h-6 w-6" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-white hover:text-green-400 transition-colors"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : (
              <Link to="/profile" className="text-white hover:text-green-400 transition-colors">
                <LogIn className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;