
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import AdminDashboard from './admin/Dashboard';

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

  return <AdminDashboard />;
}
