
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/data";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProductQuickView from "@/components/ProductQuickView";
import { useIsMobile } from "@/hooks/use-mobile";
import gsap from "gsap";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [openProductId, setOpenProductId] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const isMobile = useIsMobile();
  
  const handleQuickView = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenProductId(product.id);
    setQuickViewProduct(product);
  };
  
  useEffect(() => {
    // Initialize hover effects for product cards
    const productCards = document.querySelectorAll('.product-card-container');
    
    productCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.product-card'), {
          y: -8,
          boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.product-card'), {
          y: 0,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
    
    // Animate product cards on initial load
    gsap.fromTo(
      productCards,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.1, 
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.2
      }
    );
    
    return () => {
      // Clean up event listeners
      productCards.forEach((card) => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, [products]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {products.map(product => (
          <div key={product.id} className="product-card-container h-full">
            <ProductCard 
              product={product}
              onQuickView={(e) => handleQuickView(e, product)} 
            />
          </div>
        ))}
      </div>

      <Dialog open={!!openProductId} onOpenChange={() => setOpenProductId(null)}>
        <DialogContent className={isMobile ? "w-[95vw] max-w-3xl p-4 rounded-lg" : "max-w-3xl p-6 rounded-lg"}>
          {quickViewProduct && <ProductQuickView product={quickViewProduct} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductGrid;
