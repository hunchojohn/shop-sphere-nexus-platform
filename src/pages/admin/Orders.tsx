
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ShoppingCart,
  Filter,
  Eye,
  Printer,
  CheckCircle,
  XCircle,
  Clock,
  TruckIcon,
  PackageX
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample order data
const orders = [
  {
    id: 'ORD-39382',
    customer: 'John Doe',
    date: '2023-05-07',
    total: 230.50,
    status: 'delivered',
    items: 3,
    email: 'john@example.com'
  },
  {
    id: 'ORD-28934',
    customer: 'Sarah Johnson',
    date: '2023-05-06',
    total: 129.99,
    status: 'processing',
    items: 1,
    email: 'sarah@example.com'
  },
  {
    id: 'ORD-19283',
    customer: 'Michael Brown',
    date: '2023-05-05',
    total: 345.00,
    status: 'shipped',
    items: 2,
    email: 'mike@example.com'
  },
  {
    id: 'ORD-39381',
    customer: 'Emma Wilson',
    date: '2023-05-04',
    total: 79.99,
    status: 'cancelled',
    items: 1,
    email: 'emma@example.com'
  },
  {
    id: 'ORD-93827',
    customer: 'James Smith',
    date: '2023-05-03',
    total: 187.50,
    status: 'pending',
    items: 4,
    email: 'james@example.com'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'delivered':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
        <CheckCircle className="w-3 h-3 mr-1" /> Delivered
      </Badge>;
    case 'processing':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
        <Clock className="w-3 h-3 mr-1" /> Processing
      </Badge>;
    case 'shipped':
      return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
        <TruckIcon className="w-3 h-3 mr-1" /> Shipped
      </Badge>;
    case 'cancelled':
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
        <XCircle className="w-3 h-3 mr-1" /> Cancelled
      </Badge>;
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
        <Clock className="w-3 h-3 mr-1" /> Pending
      </Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function AdminOrders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        // Special case for admin@example.com
        if (user.email === 'admin@example.com') {
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
      }
    };

    checkAdminAccess();
  }, [user, navigate, toast]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <ShoppingCart className="mr-2 h-6 w-6" /> Order Management
        </h1>
        <p className="text-muted-foreground">Manage and process customer orders</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <Input 
            placeholder="Search orders..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Filter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        
        {/* Status filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          <Select defaultValue="all" onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader className="py-5">
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            View and manage all customer orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div>{order.customer}</div>
                        <div className="text-xs text-muted-foreground">{order.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="text-right font-medium">
                      ${order.total.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      <div className="flex flex-col items-center text-muted-foreground">
                        <PackageX className="h-10 w-10 mb-2" />
                        <p>No orders found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
