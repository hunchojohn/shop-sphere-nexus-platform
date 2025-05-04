
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90 z-0"></div>
      <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] bg-repeat opacity-10 z-0"></div>
      
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Premium <span className="text-yellow-300">Footwear</span> Collection
            </h1>
            <p className="text-base md:text-lg mb-8 text-blue-100 max-w-md">
              Discover the latest trends in authentic designer shoes. Quality materials, competitive prices, and fast delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all shadow-md">
                  Shop Now
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="border-2 bg-transparent text-white border-white hover:bg-white/20 hover:scale-105 transition-all">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-3xl"></div>
              <img 
                src="/images/hero-shoes.png" 
                alt="Premium Footwear Collection" 
                className="relative z-10 max-h-[400px] w-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
