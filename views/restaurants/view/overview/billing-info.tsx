import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import React from "react";

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

export default function BillingInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Details</CardTitle>
        <CardDescription>Billing and subscription information</CardDescription>
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
  );
}
