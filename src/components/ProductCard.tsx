
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/data";
import { formatCurrencyStockX } from "@/utils/formatters";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  onQuickView?: (e: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  // Just use the first variant for the card display
  const primaryVariant = product.variants[0];
  const primaryImage = primaryVariant.images[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, primaryVariant, 1);
    
    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      variant: "success",
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <Card className="overflow-hidden rounded-lg border border-gray-200 h-full flex flex-col transition-all duration-300 hover:shadow-md hover:border-blue-200">
        <div className="relative group overflow-hidden">
          <div className="aspect-square bg-gray-100">
            <img 
              src={primaryImage} 
              alt={product.name} 
              className="w-full h-full object-contain object-center"
            />
          </div>
          {onQuickView && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white/90 hover:bg-white text-gray-800 shadow-sm"
                onClick={onQuickView}
              >
                <Eye className="h-4 w-4 mr-1" /> Quick View
              </Button>
            </div>
          )}
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-medium line-clamp-2 text-gray-800 mb-1">{product.name}</h3>
            <div className="text-xs text-gray-500 mb-2">
              {primaryVariant.color} · {primaryVariant.size}
            </div>
          </div>
          <div className="mt-auto">
            <div className="text-blue-600 font-semibold mb-2">
              {formatCurrencyStockX(primaryVariant.price)}
            </div>
            <Button 
              className="w-full"
              size="sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
