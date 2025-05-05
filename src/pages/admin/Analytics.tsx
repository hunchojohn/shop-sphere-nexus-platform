
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, LineChart, Line, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for charts
const salesData = [
  { name: 'Jan', sales: 4000, traffic: 2400 },
  { name: 'Feb', sales: 3000, traffic: 1398 },
  { name: 'Mar', sales: 5000, traffic: 9800 },
  { name: 'Apr', sales: 4500, traffic: 3908 },
  { name: 'May', sales: 6000, traffic: 4800 },
  { name: 'Jun', sales: 5500, traffic: 3800 },
  { name: 'Jul', sales: 7000, traffic: 4300 },
];

const categoryData = [
  { name: 'Running', value: 400 },
  { name: 'Casual', value: 300 },
  { name: 'Basketball', value: 300 },
  { name: 'Training', value: 200 },
  { name: 'Lifestyle', value: 150 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const deviceData = [
  { name: 'Desktop', value: 55 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 10 },
];

const trafficSourceData = [
  { name: 'Direct', visits: 1200 },
  { name: 'Search', visits: 2300 },
  { name: 'Social', visits: 900 },
  { name: 'Email', visits: 700 },
  { name: 'Referral', visits: 500 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Detailed analytics and statistics for your store</p>
      </div>

      <Tabs defaultValue="sales">
        <TabsList className="grid grid-cols-4 w-[400px]">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
              <CardDescription>Monthly sales performance for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Distribution of sales across product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate</CardTitle>
                <CardDescription>Visitors to customers conversion</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-[300px]">
                <div className="text-6xl font-bold text-green-500">4.7%</div>
                <p className="text-sm text-muted-foreground mt-2">+0.8% from last month</p>
                <div className="mt-8 w-full">
                  <div className="text-sm font-medium">Goal: 5.0%</div>
                  <div className="h-2 w-full bg-muted mt-1 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="traffic" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Website Traffic</CardTitle>
              <CardDescription>Monthly website visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="traffic" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Traffic by Device</CardTitle>
                <CardDescription>Distribution of traffic across devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors come from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trafficSourceData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="visits" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Analytics</CardTitle>
              <CardDescription>Detailed insights for your product catalog</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center py-8 text-muted-foreground">Product analytics content will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
              <CardDescription>Insights about your customer base</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center py-8 text-muted-foreground">Customer analytics content will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
