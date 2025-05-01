
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/admin/Users";
import AdminOrders from "./pages/admin/Orders";
import AdminProducts from "./pages/admin/Products";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Helmet>
            <title>PapiKicks - Premium Footwear Shopping</title>
            <meta name="description" content="Shop the latest trends in footwear at PapiKicks. Enjoy premium quality shoes with fast shipping and excellent customer service." />
            <meta name="keywords" content="online shopping, shoes, footwear, sneakers, premium products, PapiKicks" />
            <meta property="og:title" content="PapiKicks - Premium Footwear Shopping" />
            <meta property="og:description" content="Shop the latest trends in footwear at PapiKicks." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://papikicks.com" />
            <meta property="og:image" content="/og-image.jpg" />
            <link rel="canonical" href="https://papikicks.com" />
          </Helmet>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
