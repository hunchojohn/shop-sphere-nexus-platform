
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
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 dark:text-white">Shop By Category</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/5">
            <CategoryFilter 
              categories={categories} 
              activeCategory={selectedCategory}
              onSelectCategory={onCategorySelect}
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
              <SearchBar onSearch={onSearch} />
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
  );
};

export default CategoryProductsSection;
