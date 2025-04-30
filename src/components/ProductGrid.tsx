
import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/data";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProductQuickView from "@/components/ProductQuickView";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [openProductId, setOpenProductId] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleQuickView = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenProductId(product.id);
    setQuickViewProduct(product);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-0 gap-y-6">
        {products.map(product => (
          <div key={product.id} className="p-1">
            <ProductCard 
              product={product}
              onQuickView={(e) => handleQuickView(e, product)} 
            />
          </div>
        ))}
      </div>

      <Dialog open={!!openProductId} onOpenChange={() => setOpenProductId(null)}>
        <DialogContent className="max-w-3xl">
          {quickViewProduct && <ProductQuickView product={quickViewProduct} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductGrid;
