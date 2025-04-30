
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import { getAllProducts, categories } from "@/lib/data";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchResults, setSearchResults] = useState<null | any[]>(null);

  const allProducts = getAllProducts();
  const filteredProducts = selectedCategory === "All" 
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory);
  
  const displayedProducts = searchResults !== null 
    ? searchResults 
    : filteredProducts;

  const handleSearch = (term: string) => {
    if (!term) {
      setSearchResults(null);
      return;
    }
    
    // Simple search implementation
    const results = filteredProducts.filter(product => 
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
      
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">All Products</h1>
        
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
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2 dark:text-white">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
