
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const shoeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Don't run animations on initial render, only when refs are available
    if (!heroRef.current || !shoeRef.current) return;
    
    // Create a timeline for sequential animations
    const tl = gsap.timeline();
    
    // Animate hero content
    tl.from(".hero-text > *", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
    
    // Setup shoe animation
    const shoeTl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });
    
    // Float animation
    shoeTl.to(shoeRef.current, {
      y: -20,
      duration: 2,
      ease: "power1.inOut",
    });
    
    // Continuous rotation
    gsap.to(shoeRef.current, {
      rotateY: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });
    
    // Glow pulse animation
    gsap.to(".shoe-glow", {
      opacity: 0.5,
      scale: 1.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    
    return () => {
      shoeTl.kill();
      gsap.killTweensOf(shoeRef.current);
      gsap.killTweensOf(".shoe-glow");
    };
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] bg-repeat opacity-10"></div>
      
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 hero-text">
            <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight text-white">
              Premium <span className="text-yellow-300">Footwear</span> Collection
            </h1>
            <p className="text-base mb-6 text-blue-100 max-w-md">
              Discover the latest trends in authentic designer shoes. Quality materials, competitive prices, and fast delivery.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all shadow-md"
                >
                  Shop Now
                </Button>
              </Link>
              <Link to="/products">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 bg-transparent text-white border-white hover:bg-white/20 hover:scale-105 transition-all"
                >
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="relative h-72 w-72 md:h-96 md:w-96">
              {/* Animated glow background */}
              <div className="shoe-glow absolute inset-0 bg-blue-400/30 rounded-full blur-3xl"></div>
              
              {/* Animated shoe */}
              <div 
                ref={shoeRef}
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  perspective: "1000px",
                  transformStyle: "preserve-3d" 
                }}
              >
                <img 
                  src="/images/hero-shoes.png" 
                  alt="Premium Footwear Collection" 
                  className="max-h-[300px] w-auto drop-shadow-2xl"
                />
              </div>
              
              {/* Floating particles */}
              <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white/30"
                    style={{
                      width: Math.random() * 8 + 2 + "px",
                      height: Math.random() * 8 + 2 + "px",
                      left: Math.random() * 100 + "%",
                      top: Math.random() * 100 + "%",
                      opacity: Math.random() * 0.6 + 0.2,
                      animation: `float ${Math.random() * 10 + 10}s linear infinite`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for floating animation */}
      <style>
        {`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
