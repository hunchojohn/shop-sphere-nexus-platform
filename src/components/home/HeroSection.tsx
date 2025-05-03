
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-stockx-green text-white py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-repeat-space opacity-10"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 animate-slide-up">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your <span className="text-yellow-300">Perfect</span> Style
            </h1>
            <p className="text-lg mb-8 text-blue-100 max-w-md">
              Shop the latest trends with confidence. Authentic products, competitive prices, and lightning-fast delivery. Join thousands of satisfied customers today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all border border-white/50 shadow-md">
                  Shop Now
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="bg-blue-600/20 text-white border-white hover:bg-white/20 hover:scale-105 transition-all shadow-md">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-2xl transform hover:rotate-0 transition-transform duration-500 border border-white/20 hover:shadow-blue-500/20">
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
