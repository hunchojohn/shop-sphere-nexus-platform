
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
      <Card className="overflow-hidden border rounded-lg product-card h-full relative group transition-all duration-300 hover:shadow-lg">
        <div className="overflow-hidden bg-gray-100">
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
                className="bg-white/80 hover:bg-white text-gray-800 shadow-md"
                onClick={onQuickView}
              >
                <Eye className="h-3 w-3 mr-2" /> Quick View
              </Button>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="mb-1">
            <h3 className="text-sm font-medium line-clamp-1 text-gray-800">{product.name}</h3>
          </div>
          <div className="flex flex-col">
            <div className="text-blue-600 font-medium">
              {formatCurrencyStockX(primaryVariant.price)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Last Sale: {formatCurrencyStockX(primaryVariant.price * 0.95)}
            </div>
          </div>
          <Button 
            className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
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
