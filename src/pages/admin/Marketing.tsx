
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Percent, 
  CalendarPlus, 
  Tag, 
  Mail,
  Plus
} from 'lucide-react';

export default function AdminMarketing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        // Special case for admin@example.com
        if (user.email === 'admin@example.com') {
          setIsLoading(false);
          return; // Allow access immediately
        }

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
  }, [user, navigate, toast]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Marketing Campaigns</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Campaign
        </Button>
      </div>

      <Tabs defaultValue="promotions" className="w-full">
        <TabsList>
          <TabsTrigger value="promotions">
            <Percent className="mr-2 h-4 w-4" /> Promotions
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="mr-2 h-4 w-4" /> Email Campaigns
          </TabsTrigger>
          <TabsTrigger value="discounts">
            <Tag className="mr-2 h-4 w-4" /> Discount Codes
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            <CalendarPlus className="mr-2 h-4 w-4" /> Scheduled
          </TabsTrigger>
        </TabsList>

        <TabsContent value="promotions" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Promotions</CardTitle>
              <CardDescription>Manage your active promotional campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Sample promotions */}
                {[1, 2, 3].map((id) => (
                  <Card key={id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Summer Sale 2025</h3>
                        <p className="text-sm text-muted-foreground">30% off all summer items</p>
                        <div className="flex mt-2 text-xs text-muted-foreground">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">Active</span>
                          <span>Ends: Aug 31, 2025</span>
                        </div>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="destructive">End</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns</CardTitle>
              <CardDescription>Create and manage email marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">Email campaign management coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discounts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Discount Codes</CardTitle>
              <CardDescription>Create and manage special discount codes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left font-medium">Code</th>
                      <th className="py-3 text-left font-medium">Type</th>
                      <th className="py-3 text-left font-medium">Value</th>
                      <th className="py-3 text-left font-medium">Usage</th>
                      <th className="py-3 text-left font-medium">Expires</th>
                      <th className="py-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['WELCOME25', 'SUMMER30', 'LOYALTY10'].map((code, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3 font-mono font-bold">{code}</td>
                        <td className="py-3">{i % 2 === 0 ? 'Percentage' : 'Fixed'}</td>
                        <td className="py-3">{i % 2 === 0 ? '25%' : '$10.00'}</td>
                        <td className="py-3">{Math.floor(Math.random() * 100)} / {100 + Math.floor(Math.random() * 200)}</td>
                        <td className="py-3">Aug 31, 2025</td>
                        <td className="py-3">
                          <div className="space-x-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="destructive">Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Campaigns</CardTitle>
              <CardDescription>Future campaigns scheduled to go live</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">No scheduled campaigns</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
