
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Package, Plus, Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProductList from '@/components/admin/products/ProductList';
import ProductForm from '@/components/admin/products/ProductForm';
import { confirmAction } from '@/utils/formatters';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

type ProductInput = Omit<Product, 'id' | 'created_at' | 'updated_at'>;

export default function AdminProducts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setProducts(data || []);
    } catch (error: any) {
      console.error("Error fetching products:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch products. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (productData: ProductInput) => {
    try {
      const { error } = await supabase
        .from('products')
        .insert([productData]);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Product created successfully",
      });
      
      await fetchProducts();
      setOpenDialog(false);
    } catch (error: any) {
      console.error("Error creating product:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create product",
      });
    }
  };

  const handleUpdate = async (updates: ProductInput) => {
    if (!selectedProduct) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', selectedProduct.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      
      await fetchProducts();
      setOpenDialog(false);
      setSelectedProduct(null);
    } catch (error: any) {
      console.error("Error updating product:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update product",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirmAction("Are you sure you want to delete this product?")) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      
      await fetchProducts();
    } catch (error: any) {
      console.error("Error deleting product:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete product",
      });
    }
  };

  const handleFormSubmit = (productData: ProductInput) => {
    if (selectedProduct) {
      handleUpdate(productData);
    } else {
      handleCreate(productData);
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-orange-600" />
            <div>
              <CardTitle>Product Management</CardTitle>
              <CardDescription>Add, edit, and manage your products</CardDescription>
            </div>
          </div>
          <Button onClick={() => setOpenDialog(true)} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <ProductList 
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <ProductForm
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleFormSubmit}
        product={selectedProduct}
      />
    </div>
  );
}
