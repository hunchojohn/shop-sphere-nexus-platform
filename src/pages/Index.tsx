
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { getFeaturedProducts, getProductsByCategory, categories } from "@/lib/data";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import CategoryProductsSection from "@/components/home/CategoryProductsSection";
import CollectionHighlights from "@/components/home/CollectionHighlights";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import Footer from "@/components/home/Footer";
import { Helmet } from "react-helmet";
import gsap from "gsap";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchResults, setSearchResults] = useState<null | any[]>(null);

  const featuredProducts = getFeaturedProducts();
  const categoryProducts = getProductsByCategory(selectedCategory);
  
  const displayedProducts = searchResults !== null 
    ? searchResults 
    : categoryProducts;

  useEffect(() => {
    // Initialize GSAP animations for the page
    gsap.fromTo(
      ".animate-on-load",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );
  }, []);

  const handleSearch = (term: string) => {
    if (!term) {
      setSearchResults(null);
      return;
    }
    
    // Simple search implementation
    const results = categoryProducts.filter(product => 
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.description.toLowerCase().includes(term.toLowerCase()) ||
      product.category.toLowerCase().includes(term.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchResults(null); // Clear search results when changing category
  };

  return (
    <>
      <Helmet>
        <title>PapiKicks - Premium Footwear Shopping</title>
        <meta name="description" content="Shop the latest trends in footwear at PapiKicks. Authentic products, competitive prices, and fast delivery." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <CartSidebar />
        
        <main>
          <HeroSection />
          
          <div className="animate-on-load">
            <FeaturedProductsSection products={featuredProducts} />
          </div>
          
          <Separator className="container mx-auto max-w-6xl my-4" />
          
          <div className="animate-on-load">
            <CollectionHighlights />
          </div>
          
          <div className="animate-on-load">
            <CategoryProductsSection 
              categories={categories}
              selectedCategory={selectedCategory}
              displayedProducts={displayedProducts}
              onCategorySelect={handleCategorySelect}
              onSearch={handleSearch}
            />
          </div>
          
          <TestimonialsSection />
          
          <NewsletterSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
