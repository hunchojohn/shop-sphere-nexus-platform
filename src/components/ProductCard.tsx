
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/data";
import { formatCurrencyStockX } from "@/utils/formatters";

interface ProductCardProps {
  product: Product;
  onQuickView?: (e: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addItem } = useCart();
  
  // Just use the first variant for the card display
  const primaryVariant = product.variants[0];
  const primaryImage = primaryVariant.images[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, primaryVariant, 1);
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <Card className="stockx-card overflow-hidden border-0 rounded-none product-card h-full relative group">
        <div className="overflow-hidden bg-[#f7f7f7] dark:bg-gray-800">
          <img 
            src={primaryImage} 
            alt={product.name} 
            className="product-image"
          />
          {onQuickView && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-black/70 hover:bg-black text-white"
                onClick={onQuickView}
              >
                <Eye className="h-3 w-3 mr-2" /> Quick View
              </Button>
            </div>
          )}
        </div>
        <div className="p-3 dark:bg-gray-900">
          <div className="mb-1">
            <h3 className="stockx-product-title line-clamp-1 dark:text-gray-100">{product.name}</h3>
          </div>
          <div className="flex flex-col">
            <div className="stockx-price">
              {formatCurrencyStockX(primaryVariant.price)}
            </div>
            <div className="stockx-ask mt-1">
              Last Sale: {formatCurrencyStockX(primaryVariant.price * 0.95)}
            </div>
          </div>
          <Button 
            className="w-full mt-3 bg-stockx-green hover:bg-stockx-green/90"
            size="sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-3 w-3 mr-2" /> Add to Cart
          </Button>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
