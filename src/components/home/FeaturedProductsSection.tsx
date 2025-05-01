
import React from "react";
import { Link } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/lib/data";
import { Button } from "@/components/ui/button";

interface FeaturedProductsSectionProps {
  products: Product[];
}

const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({ products }) => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-6xl animate-fade-in">
        <div className="flex justify-between items-center mb-12">
          <h2 className="section-title">PapiKicks Featured</h2>
          <Link to="/products">
            <Button 
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors button-effect"
            >
              View All Products
            </Button>
          </Link>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
