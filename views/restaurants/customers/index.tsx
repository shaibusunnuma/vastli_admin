import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
const restaurant = {
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
export default function Customers() {
  const customers = [
    { id: "cust-001", name: "Alice Johnson", email: "alice@example.com", reservations: 8, lastVisit: "Mar 24, 2025" },
    { id: "cust-002", name: "Bob Smith", email: "bob@example.com", reservations: 5, lastVisit: "Mar 20, 2025" },
    { id: "cust-003", name: "Carol Williams", email: "carol@example.com", reservations: 12, lastVisit: "Mar 25, 2025" },
    { id: "cust-004", name: "David Brown", email: "david@example.com", reservations: 3, lastVisit: "Mar 15, 2025" },
    { id: "cust-005", name: "Eve Davis", email: "eve@example.com", reservations: 7, lastVisit: "Mar 22, 2025" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Management</CardTitle>
        <CardDescription>View and manage customers for {restaurant.name}</CardDescription>
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
  );
}
