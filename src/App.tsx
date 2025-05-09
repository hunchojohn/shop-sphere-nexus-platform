
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";
import AdminMarketing from "./pages/admin/Marketing";
import AdminLayout from "./components/admin/AdminLayout";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";
import { useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

// Create a protected route component for admin routes
const AdminRoute = ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{element}</>;
};

// Home route 
const HomeRoute = () => {
  return <Index />;
};

// App component needs to be separated from routes to use hooks
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/products" element={<Products />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminRoute element={<Admin />} />} />
        <Route path="users" element={<AdminRoute element={<AdminUsers />} />} />
        <Route path="orders" element={<AdminRoute element={<AdminOrders />} />} />
        <Route path="products" element={<AdminRoute element={<AdminProducts />} />} />
        <Route path="analytics" element={<AdminRoute element={<AdminAnalytics />} />} />
        <Route path="marketing" element={<AdminRoute element={<AdminMarketing />} />} />
        <Route path="settings" element={<AdminRoute element={<AdminSettings />} />} />
      </Route>
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Helmet>
            <title>BeiPoaHub - Wholesale Discount Store</title>
            <meta name="description" content="Shop smart and save big at BeiPoaHub. Unbeatable deals on everyday essentials with fast shipping across Kenya." />
            <meta name="keywords" content="online shopping, discount store, wholesale prices, bei poa, Kenya, affordable products" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <meta property="og:title" content="BeiPoaHub - Wholesale Discount Store" />
            <meta property="og:description" content="Shop smart and save big at BeiPoaHub. Unbeatable deals on everyday essentials." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://beipoahub.com" />
            <meta property="og:image" content="/og-image.jpg" />
            <link rel="canonical" href="https://beipoahub.com" />
          </Helmet>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
