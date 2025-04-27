
import React from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const { 
    items, 
    isCartOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    clearCart,
    getCartTotal 
  } = useCart();

  // Early return if cart is closed
  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl transform transition-transform ease-in-out duration-300">
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b">
            <h2 className="text-xl font-semibold flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" /> 
              Your Cart
            </h2>
            <Button variant="ghost" size="icon" onClick={closeCart}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <ShoppingCart className="h-12 w-12 text-gray-300 mb-2" />
                <h3 className="font-medium text-lg">Your cart is empty</h3>
                <p className="text-gray-500 mt-1">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <Button onClick={closeCart} className="mt-4">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  // Determine the variant details to display
                  const variantDetails = [
                    item.variant.size && `Size: ${item.variant.size}`,
                    item.variant.color && `Color: ${item.variant.color}`,
                  ].filter(Boolean).join(", ");
                  
                  return (
                    <div key={item.variant.id} className="flex border rounded-md p-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.variant.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium line-clamp-1">{item.product.name}</h4>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => removeItem(item.variant.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        {variantDetails && (
                          <p className="text-sm text-gray-500">{variantDetails}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                              disabled={item.quantity >= item.variant.stock}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-medium">
                            ${(item.variant.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Taxes</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <Button className="w-full" asChild>
                  <Link to="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
