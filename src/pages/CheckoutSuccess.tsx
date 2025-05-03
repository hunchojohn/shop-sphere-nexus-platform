
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import { Check, ShoppingBag } from "lucide-react";
import { Helmet } from "react-helmet";

export default function CheckoutSuccess() {
  const { items } = useCart();
  const navigate = useNavigate();

  // Redirect if the page is accessed directly without going through checkout
  useEffect(() => {
    if (items.length > 0) {
      navigate("/checkout");
    }
  }, [items.length, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>PapiKicks - Order Confirmation</title>
        <meta name="description" content="Your order has been successfully placed!" />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto max-w-2xl py-16 px-4 flex-1 flex items-center justify-center">
        <div className="w-full bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-emerald-100 rounded-full p-4">
              <Check size={48} className="text-emerald-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">Thank you for your purchase at PapiKicks.</p>
          
          <div className="bg-blue-50 p-5 rounded-md mb-8">
            <h2 className="font-semibold text-blue-800 mb-2">What happens next?</h2>
            <ol className="text-left text-blue-700 space-y-2 list-decimal list-inside">
              <li>You'll receive a confirmation email with your order details.</li>
              <li>Our team will process your order and prepare it for shipping.</li>
              <li>You'll receive another notification when your order is on its way.</li>
              <li>Enjoy your new kicks!</li>
            </ol>
          </div>
          
          <div className="space-y-4">
            <Link to="/orders">
              <Button variant="outline" className="w-full">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View My Orders
              </Button>
            </Link>
            
            <Link to="/products">
              <Button className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
