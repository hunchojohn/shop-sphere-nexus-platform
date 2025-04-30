
import React from "react";
import { Link } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/lib/data";

interface FeaturedProductsSectionProps {
  products: Product[];
}

const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({ products }) => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold dark:text-white">Featured Products</h2>
          <Link to="/products" className="text-blue-600 dark:text-blue-400 hover:underline">
            View All
          </Link>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
