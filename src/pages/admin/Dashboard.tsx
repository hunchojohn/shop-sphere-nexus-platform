
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

// Sample data for charts
const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
  { name: 'Jul', revenue: 7000 },
];

// Sample data for top products
const topProducts = [
  { id: 1, name: 'Air Max 270', sold: 234, revenue: 29250 },
  { id: 2, name: 'Ultra Boost 21', sold: 187, revenue: 24310 },
  { id: 3, name: 'Jordan Retro 4', sold: 156, revenue: 21840 },
  { id: 4, name: 'Yeezy 350', sold: 142, revenue: 25560 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store's performance</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+20.1% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+12% from last week</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+249</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>+18.7% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-muted-foreground">Products below threshold</div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly revenue for the current year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>Your best performing products this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-medium">Product</th>
                  <th className="py-3 text-right font-medium">Units Sold</th>
                  <th className="py-3 text-right font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product) => (
                  <tr key={product.id} className="border-b last:border-0">
                    <td className="py-3">{product.name}</td>
                    <td className="py-3 text-right">{product.sold}</td>
                    <td className="py-3 text-right">${product.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent activity and alerts section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({length: 5}).map((_, i) => (
              <div key={i} className="flex justify-between pb-2 border-b last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">Order #{23454 + i}</p>
                  <p className="text-sm text-muted-foreground">John Doe</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$129.99</p>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Alerts & Notifications</CardTitle>
            <CardDescription>Important updates you should know about</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-orange-100 dark:bg-orange-950 border-l-4 border-orange-500 p-3 rounded">
              <p className="font-semibold text-orange-700 dark:text-orange-300">Low stock alert</p>
              <p className="text-sm text-orange-600 dark:text-orange-400">Air Max 270 (Size 9) has only 3 units left</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-950 border-l-4 border-blue-500 p-3 rounded">
              <p className="font-semibold text-blue-700 dark:text-blue-300">New review received</p>
              <p className="text-sm text-blue-600 dark:text-blue-400">Someone rated Jordan Retro 4 (5 stars)</p>
            </div>
            <div className="bg-red-100 dark:bg-red-950 border-l-4 border-red-500 p-3 rounded">
              <p className="font-semibold text-red-700 dark:text-red-300">Payment failed</p>
              <p className="text-sm text-red-600 dark:text-red-400">Order #23459 payment was declined</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
