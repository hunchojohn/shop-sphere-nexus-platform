
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import AdminDashboard from './admin/Dashboard';
import { Loader2 } from 'lucide-react';

export default function Admin() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Authentication Required",
          description: "Please login to access the admin area",
        });
        navigate('/auth');
        return;
      }

      try {
        // If using the isAdmin from context - primary way to check
        if (isAdmin) {
          console.log("Admin access granted via isAdmin flag");
          setIsLoading(false);
          return; // Allow access immediately
        }

        // Special case for admin@example.com
        if (user.email === 'admin@example.com') {
          console.log("Admin access granted for admin@example.com");
          setIsLoading(false);
          return; // Allow access immediately
        }

        // Otherwise check the role in the database
        const { data, error } = await supabase
          .rpc('has_role', { requested_role: 'admin' })
          .single();

        if (error) {
          console.error("Error checking admin role:", error);
          throw error;
        }

        if (!data) {
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have permission to access this page",
          });
          navigate('/');
        } else {
          console.log("Admin access granted via database role check");
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while checking your permissions",
        });
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
  }, [user, navigate, toast, isAdmin]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <AdminDashboard />;
}
