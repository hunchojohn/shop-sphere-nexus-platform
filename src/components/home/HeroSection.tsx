
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [rotateY, setRotateY] = useState(0);
  const [floating, setFloating] = useState(0);
  
  useEffect(() => {
    // Rotation animation
    const rotationInterval = setInterval(() => {
      setRotateY(prev => (prev + 1) % 360);
    }, 50);
    
    // Floating animation
    let direction = 1;
    const floatingInterval = setInterval(() => {
      setFloating(prev => {
        const newValue = prev + (0.1 * direction);
        
        // Change direction when reaching limits
        if (newValue > 10) direction = -1;
        if (newValue < -10) direction = 1;
        
        return newValue;
      });
    }, 50);
    
    return () => {
      clearInterval(rotationInterval);
      clearInterval(floatingInterval);
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90 z-0"></div>
      <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] bg-repeat opacity-10 z-0"></div>
      
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight text-white">
              Premium <span className="text-yellow-300">Footwear</span> Collection
            </h1>
            <p className="text-base mb-6 text-blue-100 max-w-md">
              Discover the latest trends in authentic designer shoes. Quality materials, competitive prices, and fast delivery.
            </p>
            <div className="flex flex-wrap gap-3">
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
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="relative h-64 md:h-80 w-64 md:w-80">
              {/* Animated glow background */}
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
              
              {/* Animated shoe */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `perspective(1000px) rotateY(${rotateY}deg) translateY(${floating}px)`,
                  transition: 'transform 0.05s ease-out'
                }}
              >
                <img 
                  src="/images/hero-shoes.png" 
                  alt="Premium Footwear Collection" 
                  className="max-h-[300px] w-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
