import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Restaurant } from "@/types/restaurants";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Props {
  restaurant?: Restaurant;
}

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
export default function Billing() {
  const billingHistory = [
    { id: "bill-001", date: "Mar 15, 2025", amount: "$99.00", status: "Paid", description: "Monthly subscription" },
    { id: "bill-002", date: "Feb 15, 2025", amount: "$99.00", status: "Paid", description: "Monthly subscription" },
    { id: "bill-003", date: "Jan 15, 2025", amount: "$99.00", status: "Paid", description: "Monthly subscription" },
    { id: "bill-004", date: "Dec 15, 2024", amount: "$99.00", status: "Paid", description: "Monthly subscription" },
    { id: "bill-005", date: "Nov 15, 2024", amount: "$99.00", status: "Paid", description: "Monthly subscription" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Management</CardTitle>
        <CardDescription>View and manage billing for {restaurant?.name}</CardDescription>
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
            <Button variant="outline" size="sm">
              Change Plan
            </Button>
            <Button variant="outline" size="sm">
              Update Payment Method
            </Button>
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
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bill.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : bill.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
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
  );
}
