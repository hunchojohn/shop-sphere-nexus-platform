
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Search, ShoppingBag, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const categories = [
  { name: "New Releases", href: "/products?category=new" },
  { name: "Men", href: "/products?category=men" },
  { name: "Women", href: "/products?category=women" },
  { name: "Kids", href: "/products?category=kids" },
  { name: "Basketball", href: "/products?category=basketball" },
  { name: "Running", href: "/products?category=running" },
  { name: "Lifestyle", href: "/products?category=lifestyle" },
];

const Navbar = () => {
  const { openCart, getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and mobile menu */}
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden mr-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">PapiKicks</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex mx-4 flex-1 justify-center">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <Link
                          to={category.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{category.name}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/products" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Products
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {isAuthenticated && (
                <NavigationMenuItem>
                  <Link to="/admin" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Admin
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar (centered on desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex md:w-64 lg:w-80">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 w-full bg-gray-100 border-gray-200 focus-visible:ring-blue-600"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full text-gray-500"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Right side icons */}
          <div className="flex items-center space-x-1">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-700">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border border-gray-200">
                  <DropdownMenuItem className="font-medium text-gray-800">
                    {user?.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
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

        {/* Mobile Search - displayed below main navbar */}
        <div className="md:hidden mt-2">
          <form onSubmit={handleSearch} className="relative w-full">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 w-full bg-gray-100 border-gray-200 focus-visible:ring-blue-600"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full text-gray-500"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 pb-2 border-t border-gray-100 pt-2">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="px-2 py-1 hover:bg-gray-100 rounded-md">Home</Link>
              <Link to="/products" className="px-2 py-1 hover:bg-gray-100 rounded-md">All Products</Link>
              {categories.map((category) => (
                <Link 
                  key={category.name} 
                  to={category.href}
                  className="px-2 py-1 hover:bg-gray-100 rounded-md text-sm"
                >
                  {category.name}
                </Link>
              ))}
              {isAuthenticated && (
                <Link to="/admin" className="px-2 py-1 hover:bg-gray-100 rounded-md">Admin</Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
