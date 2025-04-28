
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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

    if (user) {
      checkAdminAccess();
    } else {
      navigate('/auth');
    }
  }, [user, navigate, toast]);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Admin dashboard content will be implemented here */}
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <Button onClick={() => navigate('/admin/users')}>Manage Users</Button>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          <Button onClick={() => navigate('/admin/orders')}>View Orders</Button>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <Button onClick={() => navigate('/admin/products')}>Manage Products</Button>
        </div>
      </div>
    </div>
  );
}
