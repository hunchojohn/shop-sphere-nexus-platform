
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductByID } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ShoppingCart, ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductByID(id || "");
  const { addItem } = useCart();
  
  const [selectedVariant, setSelectedVariant] = useState(
    product ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  if (!product || !selectedVariant) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Product Not Found</h2>
          <p className="text-gray-500">
            Sorry, the product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/")} className="mt-4">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Get unique colors and sizes from variants
  const colors = [...new Set(product.variants.filter(v => v.color).map(v => v.color))];
  const sizes = [...new Set(product.variants.filter(v => v.size).map(v => v.size))];

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12 bg-white">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <img
              src={selectedVariant.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {selectedVariant.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {selectedVariant.images.map((image, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-md overflow-hidden shadow cursor-pointer hover:opacity-80 transition-opacity">
                  <img src={image} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
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
                <span className="ml-2 text-gray-600">
                  {product.rating} Rating
                </span>
              </div>
            </div>
          </div>

          <p className="text-2xl font-medium text-blue-600">${selectedVariant.price.toFixed(2)}</p>
          
          <Separator className="bg-gray-200" />
          
          <div className="space-y-4">
            <p className="text-gray-600">{product.description}</p>
            
            {/* Color Selection */}
            {colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3 text-gray-700">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => {
                    // Find a variant with this color and the currently selected size (if any)
                    const variant = product.variants.find(
                      v => v.color === color && (!sizes.length || v.size === selectedVariant.size)
                    );
                    
                    if (!variant) return null;
                    
                    return (
                      <Button
                        key={color}
                        variant={selectedVariant.color === color ? "default" : "outline"}
                        size="sm"
                        className={selectedVariant.color === color ? "bg-blue-600 hover:bg-blue-700" : ""}
                        onClick={() => setSelectedVariant(variant)}
                      >
                        {color}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Size Selection */}
            {sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3 text-gray-700">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => {
                    // Find a variant with this size and the currently selected color (if any)
                    const variant = product.variants.find(
                      v => v.size === size && (!colors.length || v.color === selectedVariant.color)
                    );
                    
                    if (!variant) return null;
                    
                    return (
                      <Button
                        key={size}
                        variant={selectedVariant.size === size ? "default" : "outline"}
                        size="sm"
                        className={selectedVariant.size === size ? "bg-blue-600 hover:bg-blue-700" : ""}
                        onClick={() => setSelectedVariant(variant)}
                      >
                        {size}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Quantity Selection */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-700">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                  disabled={quantity >= selectedVariant.stock}
                >
                  +
                </Button>
                <span className="ml-4 text-sm text-gray-500">
                  {selectedVariant.stock} available
                </span>
              </div>
            </div>
          </div>
          
          <Button
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
            size="lg"
            onClick={handleAddToCart}
            disabled={selectedVariant.stock <= 0}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
          
          {/* Product Details */}
          <Card className="mt-6 border border-gray-200 rounded-lg shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3 text-gray-800">Product Details</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-500">Category</span>
                  <span>{product.category}</span>
                </div>
                {selectedVariant.color && (
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-500">Color</span>
                    <span>{selectedVariant.color}</span>
                  </div>
                )}
                {selectedVariant.size && (
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-500">Size</span>
                    <span>{selectedVariant.size}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
