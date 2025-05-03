
import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/data";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProductQuickView from "@/components/ProductQuickView";
import { useIsMobile } from "@/hooks/use-mobile";

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

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {products.map(product => (
          <div key={product.id} className="h-full">
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
