
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Percent, Tag, Mail, Filter } from 'lucide-react';

// Sample promotions data
const promotions = [
  { 
    id: 'PROMO-001', 
    name: 'Summer Sale', 
    type: 'Discount', 
    value: '15%', 
    startDate: '2023-06-01', 
    endDate: '2023-08-31', 
    status: 'Active'
  },
  { 
    id: 'PROMO-002', 
    name: 'Back to School', 
    type: 'Fixed Amount', 
    value: 'KSh 500', 
    startDate: '2023-01-15', 
    endDate: '2023-01-31', 
    status: 'Upcoming'
  },
  { 
    id: 'PROMO-003', 
    name: 'Black Friday', 
    type: 'Discount', 
    value: '25%', 
    startDate: '2022-11-25', 
    endDate: '2022-11-28', 
    status: 'Expired'
  },
];

// Sample email campaigns data
const campaigns = [
  { 
    id: 'EMAIL-001', 
    name: 'July Newsletter', 
    subject: 'New arrivals this month!', 
    sentDate: '2023-07-01', 
    recipients: 2450, 
    openRate: '32%', 
    clickRate: '8%'
  },
  { 
    id: 'EMAIL-002', 
    name: 'Flash Sale Alert', 
    subject: '24-hour sale: 30% off everything!', 
    sentDate: '2023-06-15', 
    recipients: 3200, 
    openRate: '41%', 
    clickRate: '15%'
  },
];

export default function AdminMarketing() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Marketing</h1>
        <p className="text-muted-foreground">Manage promotions, discounts and email campaigns</p>
      </div>

      <Tabs defaultValue="promotions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="email">Email Campaigns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="promotions" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <Button className="bg-primary">
                <Percent className="mr-2 h-4 w-4" /> New Discount
              </Button>
              <Button variant="outline">
                <Tag className="mr-2 h-4 w-4" /> New Coupon
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Input 
                placeholder="Search promotions..." 
                className="w-[200px]"
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Active Promotions</CardTitle>
              <CardDescription>Manage your store's promotional offers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotions.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-medium">{promo.id}</TableCell>
                      <TableCell>{promo.name}</TableCell>
                      <TableCell>{promo.type}</TableCell>
                      <TableCell>{promo.value}</TableCell>
                      <TableCell>{promo.startDate}</TableCell>
                      <TableCell>{promo.endDate}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          promo.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          promo.status === 'Upcoming' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {promo.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Create New Promotion</CardTitle>
              <CardDescription>Set up a new discount or promotion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="promo-name">Promotion Name</Label>
                  <Input id="promo-name" placeholder="e.g. Summer Sale" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="promo-type">Promotion Type</Label>
                  <select id="promo-type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background mt-1">
                    <option>Percentage Discount</option>
                    <option>Fixed Amount Discount</option>
                    <option>Buy One Get One</option>
                    <option>Free Shipping</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="promo-value">Value</Label>
                  <Input id="promo-value" placeholder="e.g. 15" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="promo-code">Promo Code (Optional)</Label>
                  <Input id="promo-code" placeholder="e.g. SUMMER15" className="mt-1" />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="promo-desc">Description</Label>
                  <Textarea id="promo-desc" placeholder="Enter promotion details" className="mt-1" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create Promotion</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4">
          <div className="flex justify-between items-center">
            <Button className="bg-primary">
              <Mail className="mr-2 h-4 w-4" /> New Email Campaign
            </Button>
            
            <div className="flex items-center space-x-2">
              <Input 
                placeholder="Search campaigns..." 
                className="w-[200px]"
              />
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Email Campaigns</CardTitle>
              <CardDescription>Track and manage your email marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Click Rate</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.id}</TableCell>
                      <TableCell>{campaign.name}</TableCell>
                      <TableCell>{campaign.subject}</TableCell>
                      <TableCell>{campaign.sentDate}</TableCell>
                      <TableCell>{campaign.recipients}</TableCell>
                      <TableCell>{campaign.openRate}</TableCell>
                      <TableCell>{campaign.clickRate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Duplicate</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
