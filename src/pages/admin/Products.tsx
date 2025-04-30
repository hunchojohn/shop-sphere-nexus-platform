
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Package, Plus } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';
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

type Product = Database['public']['Tables']['products']['Row'];
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
    const checkAdminAccess = async () => {
      const { data, error } = await supabase
        .rpc('has_role', { requested_role: 'admin' })
        .single();

      if (error || !data) {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have permission to access this page",
        });
        navigate('/');
      }
    };

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch products",
        });
        return;
      }

      setProducts(data || []);
      setLoading(false);
    };

    if (user) {
      checkAdminAccess();
      fetchProducts();
    } else {
      navigate('/auth');
    }
  }, [user, navigate, toast]);

  const handleCreate = async (productData: ProductInput) => {
    const { error } = await supabase
      .from('products')
      .insert([productData]);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create product",
      });
      return;
    }

    // Refresh products list
    const { data: newProducts } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    setProducts(newProducts || []);
    setOpenDialog(false);
    
    toast({
      title: "Success",
      description: "Product created successfully",
    });
  };

  const handleUpdate = async (updates: ProductInput) => {
    if (!selectedProduct) return;
    
    const { error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', selectedProduct.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update product",
      });
      return;
    }

    setProducts(products.map(p => 
      p.id === selectedProduct.id ? { ...p, ...updates } : p
    ));
    setOpenDialog(false);
    setSelectedProduct(null);
    
    toast({
      title: "Success",
      description: "Product updated successfully",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirmAction("Are you sure you want to delete this product?")) return;
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product",
      });
      return;
    }

    setProducts(products.filter(p => p.id !== id));
    
    toast({
      title: "Success",
      description: "Product deleted successfully",
    });
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
      <div className="container mx-auto py-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6" />
            <div>
              <CardTitle>Product Management</CardTitle>
              <CardDescription>Add, edit, and manage your products</CardDescription>
            </div>
          </div>
          <Button onClick={() => setOpenDialog(true)}>
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
