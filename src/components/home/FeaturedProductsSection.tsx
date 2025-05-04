
import React from "react";
import { Link } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FeaturedProductsSectionProps {
  products: Product[];
}

const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({ products }) => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-800">Featured Products</h2>
            <p className="text-gray-600">Our handpicked selection of premium footwear</p>
          </div>
          <Link to="/products" className="mt-4 md:mt-0">
            <Button 
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white group"
            >
              View All Products
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
