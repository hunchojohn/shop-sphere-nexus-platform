
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/data";
import { formatCurrencyStockX } from "@/utils/formatters";

interface ProductQuickViewProps {
  product: Product;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product }) => {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(selectedVariant.images[0]);
  
  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 max-h-[70vh] overflow-auto">
      <div className="w-full md:w-1/2">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
        </div>
        
        {selectedVariant.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2 mt-4">
            {selectedVariant.images.map((image, i) => (
              <div 
                key={i} 
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${image === selectedImage ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-medium text-gray-800">{product.name}</h2>
        <div className="flex items-center mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "text-amber-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-gray-600 text-sm">
              {product.rating} Rating
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="text-xl font-medium text-blue-600">
            {formatCurrencyStockX(selectedVariant.price)}
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-600 text-sm">{product.description}</p>
        </div>
        
        {/* Variants Selection */}
        {product.variants.length > 1 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Variants</h3>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant, idx) => (
                <Button
                  key={idx}
                  variant={selectedVariant === variant ? "default" : "outline"}
                  size="sm"
                  className={selectedVariant === variant ? "bg-blue-600 hover:bg-blue-700" : ""}
                  onClick={() => {
                    setSelectedVariant(variant);
                    setSelectedImage(variant.images[0]);
                  }}
                >
                  {variant.color || `Variant ${idx + 1}`}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Quantity Selection */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Quantity</h3>
          <div className="flex items-center mt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="border-gray-300"
            >
              -
            </Button>
            <span className="w-10 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
              disabled={quantity >= selectedVariant.stock}
              className="border-gray-300"
            >
              +
            </Button>
            <span className="ml-4 text-sm text-gray-500">
              {selectedVariant.stock} available
            </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          
          <Link to={`/product/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full border-gray-300">
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
