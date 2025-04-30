
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
