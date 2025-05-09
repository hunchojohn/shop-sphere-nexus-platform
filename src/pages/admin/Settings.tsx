
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

export default function AdminSettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    bio: '',
  });
  const [storeSettings, setStoreSettings] = useState({
    name: 'BeiPoaHub',
    description: 'Your #1 Online Discount Store in Kenya',
    currency: 'KES',
    country: 'KE',
    maintenanceMode: false,
  });
  
  useEffect(() => {
    // Fetch profile data if user exists
    if (user) {
      fetchProfileData();
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      setProfileLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      if (data) {
        setProfileData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          phone: data.phone || '',
          bio: data.bio || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load profile data",
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          phone: profileData.phone,
          bio: profileData.bio,
          updated_at: new Date().toISOString(),
        });
      
      if (error) throw error;
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSaveStoreSettings = () => {
    setIsLoading(true);
    
    // Simulate API call - in a real app, this would update store settings in the database
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Store Settings Updated",
        description: "Your store settings have been updated successfully.",
      });
    }, 1000);
  };
  
  const handleUpdatePassword = () => {
    toast({
      title: "Password Reset Email Sent",
      description: "Please check your email to complete the password reset process.",
    });
  };
  
  const getInitials = () => {
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'AD';
  };

  if (profileLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and store settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.user_metadata?.avatar_url || ''} alt="Profile picture" />
                  <AvatarFallback className="bg-orange-200 text-orange-800 text-2xl">{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Profile Picture</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Upload New</Button>
                    <Button variant="outline" size="sm" className="text-red-500">Remove</Button>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="first-name">First Name</Label>
                  <Input 
                    id="first-name" 
                    value={profileData.firstName} 
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input 
                    id="last-name" 
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})} 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user?.email || ''} disabled className="mt-1 bg-muted" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="+254 7XX XXX XXX" 
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="mt-1" 
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell us about yourself" 
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="mt-1" 
                />
                <p className="text-xs text-muted-foreground mt-1">This information will be displayed publicly.</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={handleSaveProfile} 
                disabled={isLoading}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" className="mt-1" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleUpdatePassword} className="bg-orange-600 hover:bg-orange-700">
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Store Settings */}
        <TabsContent value="store" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Manage your store details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="h-24 w-24 rounded-md border-2 border-dashed border-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Logo</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Store Logo</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Upload New</Button>
                    <Button variant="outline" size="sm" className="text-red-500">Remove</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="store-name">Store Name</Label>
                <Input 
                  id="store-name" 
                  value={storeSettings.name}
                  onChange={(e) => setStoreSettings({...storeSettings, name: e.target.value})}
                  className="mt-1" 
                />
              </div>
              
              <div>
                <Label htmlFor="store-description">Store Description</Label>
                <Textarea 
                  id="store-description" 
                  value={storeSettings.description}
                  onChange={(e) => setStoreSettings({...storeSettings, description: e.target.value})}
                  className="mt-1" 
                />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select 
                    value={storeSettings.currency}
                    onValueChange={(value) => setStoreSettings({...storeSettings, currency: value})}
                  >
                    <SelectTrigger id="currency" className="mt-1">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KES">Kenyan Shilling (KSh)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="GBP">British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select 
                    value={storeSettings.country}
                    onValueChange={(value) => setStoreSettings({...storeSettings, country: value})}
                  >
                    <SelectTrigger id="country" className="mt-1">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KE">Kenya</SelectItem>
                      <SelectItem value="TZ">Tanzania</SelectItem>
                      <SelectItem value="UG">Uganda</SelectItem>
                      <SelectItem value="ET">Ethiopia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <Switch 
                    id="maintenance-mode" 
                    checked={storeSettings.maintenanceMode}
                    onCheckedChange={(value) => setStoreSettings({...storeSettings, maintenanceMode: value})}
                  />
                </div>
                <p className="text-xs text-muted-foreground">When enabled, customers will see a maintenance page.</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={handleSaveStoreSettings} 
                disabled={isLoading}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Payment Settings */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure your store's payment options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-16 rounded-md bg-muted flex items-center justify-center text-sm font-medium">
                      M-PESA
                    </div>
                    <div>
                      <h3 className="font-medium">M-PESA</h3>
                      <p className="text-sm text-muted-foreground">Mobile money payments</p>
                    </div>
                  </div>
                  <Switch id="mpesa" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-16 rounded-md bg-muted flex items-center justify-center text-sm font-medium">
                      Card
                    </div>
                    <div>
                      <h3 className="font-medium">Credit/Debit Cards</h3>
                      <p className="text-sm text-muted-foreground">Accept Visa and Mastercard</p>
                    </div>
                  </div>
                  <Switch id="cards" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-16 rounded-md bg-muted flex items-center justify-center text-sm font-medium">
                      Cash
                    </div>
                    <div>
                      <h3 className="font-medium">Cash on Delivery</h3>
                      <p className="text-sm text-muted-foreground">Pay when receiving the order</p>
                    </div>
                  </div>
                  <Switch id="cash" defaultChecked />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">M-PESA Integration Settings</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="business-number">Business Short Code</Label>
                    <Input id="business-number" placeholder="e.g. 174379" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="consumer-key">Consumer Key</Label>
                    <Input id="consumer-key" type="password" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="consumer-secret">Consumer Secret</Label>
                    <Input id="consumer-secret" type="password" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="passkey">Passkey</Label>
                    <Input id="passkey" type="password" className="mt-1" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Payment Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">New Orders</h4>
                    <p className="text-sm text-muted-foreground">Get notified when a new order is placed</p>
                  </div>
                  <Switch id="order-notification" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Low Stock Alerts</h4>
                    <p className="text-sm text-muted-foreground">Get notified when product stock is low</p>
                  </div>
                  <Switch id="stock-notification" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Customer Messages</h4>
                    <p className="text-sm text-muted-foreground">Get notified when a customer sends a message</p>
                  </div>
                  <Switch id="message-notification" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Reports</h4>
                    <p className="text-sm text-muted-foreground">Receive weekly marketing performance reports</p>
                  </div>
                  <Switch id="report-notification" />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">SMS Notifications</h3>
                <div>
                  <Label htmlFor="phone-notification">Phone Number</Label>
                  <Input id="phone-notification" placeholder="+254 7XX XXX XXX" className="mt-1" />
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <h4 className="font-medium">Order Status SMS</h4>
                    <p className="text-sm text-muted-foreground">Receive SMS alerts for urgent order updates</p>
                  </div>
                  <Switch id="sms-notification" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
