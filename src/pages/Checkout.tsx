
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { formatCurrency, formatCurrencyDetailed } from "@/utils/formatters";
import { Helmet } from "react-helmet";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPinIcon, CreditCardIcon, BanknoteIcon, PhoneIcon } from "lucide-react";

// Shipping regions with rates
const shippingRegions = [
  { id: "cbd", name: "Nairobi CBD", rate: 200 },
  { id: "eastlands", name: "Eastlands", rate: 250 },
  { id: "westlands", name: "Westlands", rate: 300 },
  { id: "karen", name: "Karen", rate: 350 },
  { id: "kiambu", name: "Kiambu", rate: 400 },
  { id: "thika", name: "Thika", rate: 450 },
  { id: "mombasa", name: "Mombasa", rate: 600 },
  { id: "kisumu", name: "Kisumu", rate: 550 },
  { id: "nakuru", name: "Nakuru", rate: 500 },
];

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  mpesaPhone: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

export default function Checkout() {
  const { items, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [shippingCost, setShippingCost] = useState(200);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CheckoutFormData>({
    defaultValues: {
      fullName: "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "Nairobi",
      region: "cbd",
      mpesaPhone: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: ""
    }
  });

  useEffect(() => {
    // Redirect to cart if cart is empty
    if (items.length === 0) {
      navigate("/");
    }
    
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to checkout",
        variant: "destructive"
      });
      navigate("/auth");
    }
  }, [items.length, navigate, isAuthenticated, toast]);

  // Handle shipping region change
  const handleRegionChange = (regionId: string) => {
    const region = shippingRegions.find(r => r.id === regionId);
    if (region) {
      setShippingCost(region.rate);
      form.setValue("region", regionId);
    }
  };

  const subtotal = getCartTotal();
  const total = subtotal + shippingCost;

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle different payment methods
      if (paymentMethod === "mpesa") {
        toast({
          title: "M-Pesa payment initiated",
          description: `A prompt has been sent to ${data.mpesaPhone}. Please complete the payment.`
        });
      } else if (paymentMethod === "card") {
        toast({
          title: "Card payment successful",
          description: "Your order has been placed successfully!"
        });
      } else if (paymentMethod === "cod") {
        toast({
          title: "Order confirmed",
          description: "Your order will be delivered for cash payment."
        });
      }
      
      // Clear cart and redirect to success page
      clearCart();
      navigate("/checkout-success");
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>PapiKicks - Checkout</title>
        <meta name="description" content="Complete your order and payment on PapiKicks." />
      </Helmet>
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Shipping Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        {...form.register("fullName", { required: true })}
                        className="focus-visible:ring-blue-600" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        {...form.register("email", { required: true })}
                        className="focus-visible:ring-blue-600" 
                        defaultValue={user?.email || ""}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        {...form.register("phone", { required: true })}
                        className="focus-visible:ring-blue-600" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        {...form.register("address", { required: true })}
                        className="focus-visible:ring-blue-600" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        {...form.register("city", { required: true })}
                        className="focus-visible:ring-blue-600" 
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <Select 
                        defaultValue="cbd"
                        onValueChange={handleRegionChange}
                      >
                        <SelectTrigger className="w-full focus-visible:ring-blue-600">
                          <SelectValue placeholder="Select a region" />
                        </SelectTrigger>
                        <SelectContent>
                          {shippingRegions.map((region) => (
                            <SelectItem key={region.id} value={region.id}>
                              {region.name} ({formatCurrency(region.rate)} shipping)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                {/* Payment Methods */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  <Tabs defaultValue="mpesa" onValueChange={setPaymentMethod}>
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="mpesa" className="data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white">
                        <PhoneIcon className="h-4 w-4 mr-2" /> M-Pesa
                      </TabsTrigger>
                      <TabsTrigger value="card" className="data-[state=active]:bg-[#0066b2] data-[state=active]:text-white">
                        <CreditCardIcon className="h-4 w-4 mr-2" /> Card
                      </TabsTrigger>
                      <TabsTrigger value="cod" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
                        <BanknoteIcon className="h-4 w-4 mr-2" /> Cash on Delivery
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="mpesa" className="mt-0">
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          Enter the M-Pesa phone number to receive payment request:
                        </p>
                        <div className="space-y-2">
                          <Label htmlFor="mpesaPhone">M-Pesa Phone Number</Label>
                          <Input 
                            id="mpesaPhone" 
                            {...form.register("mpesaPhone", { 
                              required: paymentMethod === "mpesa",
                              pattern: {
                                value: /^(254|0)[17]\d{8}$/,
                                message: "Please enter a valid Kenyan phone number"
                              }
                            })}
                            placeholder="e.g., 254712345678" 
                            className="focus-visible:ring-blue-600" 
                          />
                          {form.formState.errors.mpesaPhone && (
                            <p className="text-red-500 text-xs">Please enter a valid phone number</p>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="card" className="mt-0">
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          Enter your card details for secure payment:
                        </p>
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber" 
                            {...form.register("cardNumber", { 
                              required: paymentMethod === "card" 
                            })}
                            placeholder="1234 5678 9012 3456" 
                            className="focus-visible:ring-blue-600" 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardExpiry">Expiration Date</Label>
                            <Input 
                              id="cardExpiry" 
                              {...form.register("cardExpiry", { 
                                required: paymentMethod === "card" 
                              })}
                              placeholder="MM/YY" 
                              className="focus-visible:ring-blue-600" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardCvc">CVC</Label>
                            <Input 
                              id="cardCvc" 
                              {...form.register("cardCvc", { 
                                required: paymentMethod === "card" 
                              })}
                              placeholder="123" 
                              className="focus-visible:ring-blue-600" 
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="cod" className="mt-0">
                      <div className="space-y-4">
                        <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                          <p className="text-sm text-amber-800">
                            <strong>Note:</strong> You'll pay in cash when your order is delivered.
                            Please ensure you have the exact amount ready: <strong>{formatCurrencyDetailed(total)}</strong>
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <Button 
                  type="submit"
                  size="lg"
                  variant={paymentMethod === "mpesa" ? "mpesa" : paymentMethod === "card" ? "credit" : "cod"}
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : `Pay ${formatCurrencyDetailed(total)}`}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.variant.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 mr-3">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.variant.size} / {item.variant.color} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">{formatCurrency(item.variant.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 py-4 border-t border-b border-gray-100">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium">{formatCurrency(subtotal)}</p>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1 text-gray-500" />
                  <p className="text-gray-600">Shipping</p>
                </div>
                <p className="font-medium">{formatCurrency(shippingCost)}</p>
              </div>
            </div>
            
            <div className="flex justify-between py-4">
              <p className="font-bold">Total</p>
              <p className="font-bold text-lg">{formatCurrency(total)}</p>
            </div>
            
            <div className="pt-4 text-xs text-gray-500">
              <p>By completing your purchase, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
