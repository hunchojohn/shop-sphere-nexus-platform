
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tag } from "lucide-react";
import gsap from "gsap";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const dealRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Don't run animations on initial render, only when refs are available
    if (!heroRef.current || !dealRef.current || !textRef.current) return;
    
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
    
    // Setup deals animation with improved timing
    const dealTl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });
    
    // More subtle float animation
    dealTl.to(dealRef.current, {
      y: -15,
      duration: 2.5,
      ease: "sine.inOut",
    });
    
    // Enhanced glow pulse animation
    gsap.to(".deal-glow", {
      opacity: 0.6,
      scale: 1.15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    
    return () => {
      dealTl.kill();
      gsap.killTweensOf(dealRef.current);
      gsap.killTweensOf(".deal-glow");
    };
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative overflow-hidden bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100 py-20 md:py-28"
    >
      {/* Modern dot pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] bg-[size:20px_20px] opacity-10"></div>
      
      {/* Abstract gradient shapes */}
      <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-gradient-to-br from-amber-300/20 to-orange-300/30 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4"></div>
      <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-amber-300/20 to-orange-300/20 rounded-full blur-3xl translate-y-1/3 translate-x-1/4"></div>
      
      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div ref={textRef} className="md:w-1/2 mb-12 md:mb-0">
            <span className="text-orange-600 font-medium text-sm md:text-base bg-gradient-to-r from-amber-100 to-amber-200 px-4 py-1.5 rounded-full inline-block mb-4 animate-item shadow-sm">
              Your #1 Online Discount Store in Kenya
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text text-transparent animate-item">
              Shop Smart. <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Save Big.</span>
            </h1>
            <p className="text-base md:text-lg mb-8 text-gray-600 max-w-lg leading-relaxed animate-item">
              Unbeatable deals on everyday essentials — delivered to your doorstep at bei poa.
            </p>
            <div className="flex flex-wrap gap-4 animate-item">
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white transition-all shadow-lg hover:shadow-orange-300/30 rounded-full"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/products">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 bg-white/80 backdrop-blur-sm text-orange-600 border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition-all rounded-full"
                >
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center items-center relative z-20">
            <div className="relative h-72 w-72 md:h-96 md:w-96">
              {/* Enhanced glow effect with gradient */}
              <div className="deal-glow absolute inset-0 bg-gradient-to-br from-orange-400/30 via-amber-400/30 to-yellow-400/20 rounded-full blur-3xl"></div>
              
              {/* Animated deals showcase - Fixed positioning to prevent overlap */}
              <div 
                ref={dealRef}
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  perspective: "1000px",
                  transformStyle: "preserve-3d" 
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Deal tags with improved positioning */}
                  <div className="bg-white p-6 rounded-xl shadow-xl rotate-3 transform -translate-y-20 -translate-x-10 absolute z-10">
                    <div className="flex items-center gap-3">
                      <Tag className="h-10 w-10 text-orange-500" />
                      <div>
                        <p className="font-bold text-gray-800">Flash Sale!</p>
                        <p className="text-orange-600 text-xl font-bold">50% OFF</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-xl shadow-lg -rotate-6 transform translate-x-20 translate-y-28 absolute z-10">
                    <div className="flex items-center gap-2">
                      <Tag className="h-8 w-8 text-amber-500" />
                      <div>
                        <p className="font-medium text-sm text-gray-800">Limited Time</p>
                        <p className="text-amber-600 text-lg font-bold">Buy 1 Get 1</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Main product image with adjusted position */}
                  <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-5 rounded-xl shadow-2xl rotate-1 transform translate-y-0 relative z-0 w-64 md:w-80">
                    <div className="flex items-center justify-center">
                      <img 
                        src="/images/wholesale-products.png" 
                        alt="Discount Wholesale Products" 
                        className="max-h-[220px] w-auto drop-shadow-xl rounded-lg"
                      />
                    </div>
                    <div className="mt-3 bg-white/80 backdrop-blur-sm p-2 rounded-lg text-center">
                      <p className="font-bold text-gray-800">Wholesale Prices</p>
                      <p className="text-orange-600 font-bold">Bei Poa Deals!</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Modern, subtle particles */}
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-r from-orange-300 to-amber-400"
                    style={{
                      width: Math.random() * 8 + 3 + "px",
                      height: Math.random() * 8 + 3 + "px",
                      left: Math.random() * 100 + "%",
                      top: Math.random() * 100 + "%",
                      opacity: Math.random() * 0.5 + 0.3,
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
