"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Calendar, CreditCard, Edit, MoreHorizontal, Store, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RestaurantDetailPage({ params }: { params: { restaurantId: string } }) {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for a restaurant
  const restaurant = {
    id: params.restaurantId,
    name: "Bella Italia",
    type: "Italian",
    description: "Authentic Italian cuisine in the heart of San Francisco.",
    address: "123 Main St, San Francisco, CA 94105, United States",
    phone: "(555) 123-4567",
    email: "info@bellaitalia.com",
    website: "https://bellaitalia.com",
    status: "Active",
    joinedDate: "Mar 15, 2025",
    owner: "John Doe",
    ownerEmail: "john@bellaitalia.com",
    cuisine: "Italian",
    priceRange: "$$",
    seating: 50,
    reservationInterval: 30,
    plan: "Standard",
    billingCycle: "Monthly",
    nextBillingDate: "Apr 15, 2025",
    paymentMethod: "Visa ending in 4242",
  };
  
  // Mock data for customers
  const customers = [
    { id: "cust-001", name: "Alice Johnson", email: "alice@example.com", reservations: 8, lastVisit: "Mar 24, 2025" },
    { id: "cust-002", name: "Bob Smith", email: "bob@example.com", reservations: 5, lastVisit: "Mar 20, 2025" },
    { id: "cust-003", name: "Carol Williams", email: "carol@example.com", reservations: 12, lastVisit: "Mar 25, 2025" },
    { id: "cust-004", name: "David Brown", email: "david@example.com", reservations: 3, lastVisit: "Mar 15, 2025" },
    { id: "cust-005", name: "Eve Davis", email: "eve@example.com", reservations: 7, lastVisit: "Mar 22, 2025" },
  ];
  
  // Mock data for reservations
  const reservations = [
    { id: "res-001", customer: "Alice Johnson", date: "Mar 28, 2025", time: "7:00 PM", party: 4, status: "Confirmed" },
    { id: "res-002", customer: "Bob Smith", date: "Mar 29, 2025", time: "6:30 PM", party: 2, status: "Confirmed" },
    { id: "res-003", customer: "Carol Williams", date: "Mar 27, 2025", time: "8:00 PM", party: 6, status: "Pending" },
    { id: "res-004", customer: "David Brown", date: "Mar 30, 2025", time: "7:30 PM", party: 3, status: "Confirmed" },
    { id: "res-005", customer: "Eve Davis", date: "Mar 31, 2025", time: "6:00 PM", party: 2, status: "Cancelled" },
  ];
  
  // Mock data for billing history
  const billingHistory = [
    { id: "bill-001", date: "Mar 15, 2025", amount: "$99.00", status: "Paid", description: "Monthly subscription" },
    { id: "bill-002", date: "Feb 15, 2025", amount: "$99.00", status: "Paid", description: "Monthly subscription" },
    { id: "bill-003", date: "Jan 15, 2025", amount: "$99.00", status: "Paid", description: "Monthly subscription" },
    { id: "bill-004", date: "Dec 15, 2024", amount: "$99.00", status: "Paid", description: "Monthly subscription" },
    { id: "bill-005", date: "Nov 15, 2024", amount: "$99.00", status: "Paid", description: "Monthly subscription" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Link href="/restaurants">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Restaurants
          </Button>
        </Link>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center">
            <Store className="h-6 w-6 text-violet-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            <p className="text-gray-500">{restaurant.type} • {restaurant.address}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Reset Password</DropdownMenuItem>
              <DropdownMenuItem>Send Welcome Email</DropdownMenuItem>
              <DropdownMenuItem>Export Data</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Deactivate Account</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Status
            </CardTitle>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              restaurant.status === "Active" 
                ? "bg-green-100 text-green-800" 
                : restaurant.status === "Pending" 
                ? "bg-yellow-100 text-yellow-800" 
                : "bg-gray-100 text-gray-800"
            }`}>
              {restaurant.status}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500">
              Since {restaurant.joinedDate}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Customers
            </CardTitle>
            <Users className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">
              +12 this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reservations
            </CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">
              +8 this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Subscription
            </CardTitle>
            <CreditCard className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{restaurant.plan}</div>
            <p className="text-xs text-muted-foreground">
              Next billing: {restaurant.nextBillingDate}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Details</CardTitle>
                <CardDescription>
                  Basic information about the restaurant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                    <dd className="mt-1 text-sm">{restaurant.description}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="mt-1 text-sm">{restaurant.address}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium text-gray-500">Phone</dt>
                      <dd className="mt-1 text-sm">{restaurant.phone}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm">{restaurant.email}</dd>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">Website</dt>
                    <dd className="mt-1 text-sm">
                      <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {restaurant.website}
                      </a>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Owner Information</CardTitle>
                <CardDescription>
                  Details about the restaurant owner
                </CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">Owner Name</dt>
                    <dd className="mt-1 text-sm">{restaurant.owner}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm">{restaurant.ownerEmail}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Menu Settings</CardTitle>
                <CardDescription>
                  Restaurant menu and reservation settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium text-gray-500">Cuisine</dt>
                      <dd className="mt-1 text-sm">{restaurant.cuisine}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium text-gray-500">Price Range</dt>
                      <dd className="mt-1 text-sm">{restaurant.priceRange}</dd>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium text-gray-500">Seating Capacity</dt>
                      <dd className="mt-1 text-sm">{restaurant.seating} seats</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium text-gray-500">Reservation Interval</dt>
                      <dd className="mt-1 text-sm">{restaurant.reservationInterval} minutes</dd>
                    </div>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
                <CardDescription>
                  Billing and subscription information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium text-gray-500">Plan</dt>
                      <dd className="mt-1 text-sm">{restaurant.plan}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium text-gray-500">Billing Cycle</dt>
                      <dd className="mt-1 text-sm">{restaurant.billingCycle}</dd>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium text-gray-500">Next Billing Date</dt>
                      <dd className="mt-1 text-sm">{restaurant.nextBillingDate}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                      <dd className="mt-1 text-sm">{restaurant.paymentMethod}</dd>
                    </div>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>
                View and manage customers for {restaurant.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <input 
                    type="text" 
                    placeholder="Search customers..." 
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Reservations</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.reservations}</TableCell>
                      <TableCell>{customer.lastVisit}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reservations">
          <Card>
            <CardHeader>
              <CardTitle>Reservation Management</CardTitle>
              <CardDescription>
                View and manage reservations for {restaurant.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <input 
                    type="text" 
                    placeholder="Search reservations..." 
                    className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Party Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium">{reservation.customer}</TableCell>
                      <TableCell>{reservation.date}</TableCell>
                      <TableCell>{reservation.time}</TableCell>
                      <TableCell>{reservation.party}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reservation.status === "Confirmed" 
                            ? "bg-green-100 text-green-800" 
                            : reservation.status === "Pending" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {reservation.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Management</CardTitle>
              <CardDescription>
                View and manage billing for {restaurant.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 rounded-md border border-gray-200 dark:border-gray-800">
                <h3 className="font-medium mb-2">Subscription Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 block">Current Plan</span>
                    <span className="font-medium">{restaurant.plan}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Billing Cycle</span>
                    <span className="font-medium">{restaurant.billingCycle}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Next Billing Date</span>
                    <span className="font-medium">{restaurant.nextBillingDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Payment Method</span>
                    <span className="font-medium">{restaurant.paymentMethod}</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">Change Plan</Button>
                  <Button variant="outline" size="sm">Update Payment Method</Button>
                </div>
              </div>

              <h3 className="font-medium mb-2">Billing History</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell>{bill.date}</TableCell>
                      <TableCell>{bill.description}</TableCell>
                      <TableCell>{bill.amount}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          bill.status === "Paid" 
                            ? "bg-green-100 text-green-800" 
                            : bill.status === "Pending" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {bill.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View Invoice
                        </Button>
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
