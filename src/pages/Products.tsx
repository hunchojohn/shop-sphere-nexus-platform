
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchResults, setSearchResults] = useState<null | any[]>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      
      if (data) {
        setAllProducts(data);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map(product => product.category))
        );
        setCategories(["All", ...uniqueCategories]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-orange-50">
        <Navbar />
        <CartSidebar />
        <div className="flex h-full items-center justify-center p-12">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-orange-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-orange-50">
      <Navbar />
      <CartSidebar />
      
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">All Products</h1>
        
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
                <h3 className="text-lg font-medium text-gray-800">{selectedCategory} Products</h3>
                <p className="text-gray-500 text-sm">
                  {displayedProducts.length} products available
                </p>
              </div>
              <SearchBar onSearch={handleSearch} />
            </div>
            
            {displayedProducts.length > 0 ? (
              <ProductGrid products={displayedProducts} />
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2 text-gray-800">No products found</h3>
                <p className="text-gray-500">
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
