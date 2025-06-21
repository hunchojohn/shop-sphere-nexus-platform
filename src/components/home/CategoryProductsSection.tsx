
import React from "react";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import { Product } from "@/lib/data";

interface CategoryProductsSectionProps {
  categories: string[];
  selectedCategory: string;
  displayedProducts: Product[];
  onCategorySelect: (category: string) => void;
  onSearch: (term: string) => void;
}

const CategoryProductsSection: React.FC<CategoryProductsSectionProps> = ({
  categories,
  selectedCategory,
  displayedProducts,
  onCategorySelect,
  onSearch,
}) => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Shop By Category</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our wide range of products organized by category to help you find exactly what you need.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <CategoryFilter 
                categories={categories} 
                activeCategory={selectedCategory}
                onSelectCategory={onCategorySelect}
              />
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="mb-8 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
                  {selectedCategory} Products
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {displayedProducts.length} {displayedProducts.length === 1 ? 'product' : 'products'} available
                </p>
              </div>
              <div className="w-full sm:w-auto">
                <SearchBar onSearch={onSearch} />
              </div>
            </div>
            
            {displayedProducts.length > 0 ? (
              <ProductGrid products={displayedProducts} />
            ) : (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">No products found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryProductsSection;
