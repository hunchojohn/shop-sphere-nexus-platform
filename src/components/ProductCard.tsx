
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
      <Card className="product-card overflow-hidden rounded-lg border-0 h-full flex flex-col transition-all duration-300 hover:shadow-md bg-white">
        <div className="relative group overflow-hidden">
          <div className="aspect-square bg-gray-50">
            <img 
              src={primaryImage} 
              alt={product.name} 
              className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {onQuickView && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5">
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white/90 hover:bg-white text-gray-800 shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                onClick={onQuickView}
              >
                <Eye className="h-4 w-4 mr-1" /> Quick View
              </Button>
            </div>
          )}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {product.discountPercentage > 0 && (
              <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">
                -{product.discountPercentage}%
              </span>
            )}
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                New
              </span>
            )}
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-medium line-clamp-2 text-gray-800 mb-1 hover:text-orange-600 transition-colors">
              {product.name}
            </h3>
            <div className="text-xs text-gray-500 mb-2">
              {primaryVariant.color} · {primaryVariant.size}
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-orange-600 font-semibold">
                {formatCurrencyStockX(primaryVariant.price)}
              </span>
              {product.originalPrice > 0 && (
                <span className="text-gray-400 text-xs line-through">
                  {formatCurrencyStockX(product.originalPrice)}
                </span>
              )}
            </div>
            <Button 
              className="w-full bg-orange-600 hover:bg-orange-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
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
