
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your store settings and preferences</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-4 w-[600px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Basic information about your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input id="storeName" defaultValue="PapiKicks" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input id="storeEmail" type="email" defaultValue="contact@papikicks.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Store Phone</Label>
                  <Input id="storePhone" defaultValue="+1 (800) 555-1234" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeTimezone">Timezone</Label>
                  <Select defaultValue="utc-8">
                    <SelectTrigger id="storeTimezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                      <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                      <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeAddress">Store Address</Label>
                <Input id="storeAddress" defaultValue="123 Main St" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <Input placeholder="City" defaultValue="Los Angeles" />
                  <Input placeholder="State" defaultValue="California" />
                  <Input placeholder="Zip" defaultValue="90001" />
                </div>
              </div>
              <div className="pt-4">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Currency & Locale</CardTitle>
              <CardDescription>Configure regional settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="jpy">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locale">Language/Locale</Label>
                  <Select defaultValue="en-us">
                    <SelectTrigger id="locale">
                      <SelectValue placeholder="Select locale" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-us">English (US)</SelectItem>
                      <SelectItem value="en-gb">English (UK)</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="pt-4">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the look and feel of your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme Mode</Label>
                    <div className="flex items-center space-x-4 mt-1">
                      <Button variant="outline" className="flex-1">Light</Button>
                      <Button variant="outline" className="flex-1">Dark</Button>
                      <Button variant="default" className="flex-1">System</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="grid grid-cols-6 gap-2 mt-1">
                      {['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-orange-500', 'bg-pink-500'].map((color) => (
                        <div key={color} className={`${color} w-10 h-10 rounded-full cursor-pointer`}></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label>Logo Settings</Label>
                    <div className="p-6 border-2 border-dashed rounded-lg flex flex-col items-center justify-center">
                      <p className="text-sm text-muted-foreground">Upload your store logo</p>
                      <Button variant="outline" className="mt-2">Upload Image</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  {[
                    { id: 'new-order', label: 'New Order' },
                    { id: 'low-stock', label: 'Low Stock Alert' },
                    { id: 'customer-sign-up', label: 'New Customer Sign-up' },
                    { id: 'product-review', label: 'New Product Review' },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2">
                      <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                      <Switch id={item.id} defaultChecked={true} />
                    </div>
                  ))}
                </div>
                <h3 className="text-lg font-medium pt-4">Push Notifications</h3>
                <div className="space-y-2">
                  {[
                    { id: 'push-new-order', label: 'New Order' },
                    { id: 'push-low-stock', label: 'Low Stock Alert' },
                    { id: 'push-customer-sign-up', label: 'New Customer Sign-up' },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2">
                      <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                      <Switch id={item.id} defaultChecked={item.id === 'push-new-order'} />
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>Manage integrations with external services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { 
                  name: 'Google Analytics',
                  description: 'Track website traffic and user behavior',
                  status: 'Connected',
                  isConnected: true
                },
                { 
                  name: 'Mailchimp',
                  description: 'Email marketing automation',
                  status: 'Not connected',
                  isConnected: false
                },
                { 
                  name: 'PayPal',
                  description: 'Payment processing',
                  status: 'Connected',
                  isConnected: true
                },
                { 
                  name: 'Facebook Ads',
                  description: 'Social media advertising',
                  status: 'Not connected',
                  isConnected: false
                },
              ].map((service) => (
                <div key={service.name} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm mr-4 ${service.isConnected ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {service.status}
                    </span>
                    <Button variant={service.isConnected ? "outline" : "default"}>
                      {service.isConnected ? 'Configure' : 'Connect'}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
