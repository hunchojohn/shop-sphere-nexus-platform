
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Search, ShoppingBag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const { openCart, getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">PapiKicks</h1>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Products
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Categories
          </Link>
          {isAuthenticated && (
            <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-gray-100 border-gray-200 focus-visible:ring-blue-600"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 text-gray-500"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border border-gray-200">
                <DropdownMenuItem className="font-medium text-gray-700">
                  {user?.email}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-600">
                  <Link to="/account" className="w-full">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-600">
                  <Link to="/orders" className="w-full">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  logout();
                  navigate('/auth');
                }} className="text-gray-600">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" onClick={() => navigate('/auth')} className="text-gray-700">
              Log In
            </Button>
          )}

          {isAuthenticated && getCartCount() > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/checkout')}
              className="relative text-gray-700"
              title="Go to checkout"
            >
              <ShoppingBag className="h-5 w-5" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={openCart}
            className="relative text-gray-700"
          >
            <ShoppingCart className="h-5 w-5" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {getCartCount()}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
