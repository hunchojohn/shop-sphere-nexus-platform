
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const shoeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Don't run animations on initial render, only when refs are available
    if (!heroRef.current || !shoeRef.current || !textRef.current) return;
    
    // Create a timeline for sequential animations
    const tl = gsap.timeline();
    
    // Animate hero content with a more modern staggered effect
    tl.from(textRef.current.querySelectorAll(".animate-item"), {
      opacity: 0,
      y: 20,
      duration: 0.7,
      stagger: 0.15,
      ease: "power3.out",
    });
    
    // Setup shoe animation with improved timing
    const shoeTl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });
    
    // More subtle float animation
    shoeTl.to(shoeRef.current, {
      y: -15,
      duration: 2.5,
      ease: "sine.inOut",
    });
    
    // Smoother rotation
    gsap.to(shoeRef.current, {
      rotateY: 360,
      duration: 25,
      repeat: -1,
      ease: "none",
    });
    
    // Enhanced glow pulse animation
    gsap.to(".shoe-glow", {
      opacity: 0.6,
      scale: 1.15,
      duration: 2.5,
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
    <section 
      ref={heroRef} 
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-28"
    >
      {/* Modern dot pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] bg-[size:20px_20px] opacity-50"></div>
      
      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div ref={textRef} className="md:w-1/2 mb-12 md:mb-0">
            <span className="text-blue-600 font-medium text-sm md:text-base bg-blue-50 px-4 py-1.5 rounded-full inline-block mb-4 animate-item">
              New Season Collection
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-800 animate-item">
              Premium <span className="text-blue-600">Footwear</span> For Your Journey
            </h1>
            <p className="text-base md:text-lg mb-8 text-gray-600 max-w-lg leading-relaxed animate-item">
              Discover the latest trends in authentic designer shoes crafted with premium materials. Quality that speaks for itself, with comfort that lasts all day.
            </p>
            <div className="flex flex-wrap gap-4 animate-item">
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg hover:shadow-blue-200 rounded-full"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/products">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 bg-transparent text-blue-600 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all rounded-full"
                >
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="relative h-72 w-72 md:h-96 md:w-96">
              {/* Enhanced glow effect */}
              <div className="shoe-glow absolute inset-0 bg-gradient-to-br from-blue-300/30 to-indigo-300/30 rounded-full blur-3xl"></div>
              
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
              
              {/* Modern, subtle particles */}
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-r from-blue-200 to-indigo-200"
                    style={{
                      width: Math.random() * 6 + 2 + "px",
                      height: Math.random() * 6 + 2 + "px",
                      left: Math.random() * 100 + "%",
                      top: Math.random() * 100 + "%",
                      opacity: Math.random() * 0.5 + 0.2,
                      animation: `floatParticle ${Math.random() * 15 + 8}s linear infinite`
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
        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-15px) translateX(8px);
          }
          50% {
            transform: translateY(-5px) translateX(16px);
          }
          75% {
            transform: translateY(12px) translateX(8px);
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
