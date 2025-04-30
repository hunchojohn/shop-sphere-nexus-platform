
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getFeaturedProducts, getProductsByCategory, categories } from "@/lib/data";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchResults, setSearchResults] = useState<null | any[]>(null);

  const featuredProducts = getFeaturedProducts();
  const categoryProducts = getProductsByCategory(selectedCategory);
  
  const displayedProducts = searchResults !== null 
    ? searchResults 
    : categoryProducts;

  const handleSearch = (term: string) => {
    if (!term) {
      setSearchResults(null);
      return;
    }
    
    // Simple search implementation
    const results = categoryProducts.filter(product => 
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.description.toLowerCase().includes(term.toLowerCase()) ||
      product.category.toLowerCase().includes(term.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchResults(null); // Clear search results when changing category
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <CartSidebar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-purple-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-repeat-space"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Discover Exclusive <span className="text-yellow-300">Premium</span> Products
              </h1>
              <p className="text-lg mb-8 text-blue-100 dark:text-blue-200 max-w-md">
                Shop the latest trends with confidence. Authentic products, competitive prices, and lightning-fast delivery.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-500">
                    Shop Now
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="/placeholder.svg" 
                  alt="Featured Products" 
                  className="w-full h-auto rounded shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold dark:text-white">Featured Products</h2>
            <Link to="/products" className="text-blue-600 dark:text-blue-400 hover:underline">
              View All
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
      
      <Separator className="container mx-auto max-w-6xl" />
      
      {/* Main Products Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 dark:text-white">Shop By Category</h2>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/5">
              <CategoryFilter 
                categories={categories} 
                activeCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
              />
            </div>
            
            {/* Products Grid */}
            <div className="lg:w-4/5">
              <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                  <h3 className="text-lg font-medium dark:text-white">{selectedCategory} Products</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {displayedProducts.length} products available
                  </p>
                </div>
                <SearchBar onSearch={handleSearch} />
              </div>
              
              {displayedProducts.length > 0 ? (
                <ProductGrid products={displayedProducts} />
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-2 dark:text-white">No products found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Collection Highlights */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">Collection Highlights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="New Arrivals" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 dark:text-white">New Arrivals</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Check out the latest additions to our catalog.</p>
                <Link to="/products">
                  <Button variant="outline" className="w-full dark:border-gray-600 dark:text-white">Explore</Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Best Sellers" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Best Sellers</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Our most popular products that customers love.</p>
                <Link to="/products">
                  <Button variant="outline" className="w-full dark:border-gray-600 dark:text-white">Shop Now</Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Limited Editions" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Limited Editions</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Exclusive items available for a limited time only.</p>
                <Link to="/products">
                  <Button variant="outline" className="w-full dark:border-gray-600 dark:text-white">View Collection</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-blue-50 dark:bg-gray-800 py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Join Our Newsletter</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Subscribe to get updates on new products, special offers, and more.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white px-3 py-2 text-sm"
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12 px-4 mt-auto">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">ShopSphere</h3>
              <p className="text-gray-400">
                Your one-stop shop for all your shopping needs with competitive prices and exceptional service.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><Link to="/products" className="hover:text-white">All Products</Link></li>
                <li><Link to="/products" className="hover:text-white">Featured</Link></li>
                <li><Link to="/products" className="hover:text-white">New Arrivals</Link></li>
                <li><Link to="/products" className="hover:text-white">Special Offers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
                <li><Link to="/shipping" className="hover:text-white">Shipping Policy</Link></li>
                <li><Link to="/returns" className="hover:text-white">Returns & Exchanges</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>© 2023 ShopSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
