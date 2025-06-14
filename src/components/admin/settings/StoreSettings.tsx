
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function StoreSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    storeName: 'BeiPoaHub',
    storeDescription: 'Your #1 Online Discount Store in Kenya',
    contactEmail: 'info@beipoahub.com',
    contactPhone: '+254 700 000 000',
    address: 'Nairobi, Kenya',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Store Settings Updated",
        description: "Your store settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update store settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Settings</CardTitle>
        <CardDescription>
          Configure your store information and contact details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input
              id="storeName"
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              placeholder="Enter your store name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="storeDescription">Store Description</Label>
            <Textarea
              id="storeDescription"
              name="storeDescription"
              value={formData.storeDescription}
              onChange={handleInputChange}
              placeholder="Enter your store description"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleInputChange}
                placeholder="Enter contact email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                placeholder="Enter contact phone"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Store Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter store address"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isLoading ? "Updating..." : "Update Store Settings"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
