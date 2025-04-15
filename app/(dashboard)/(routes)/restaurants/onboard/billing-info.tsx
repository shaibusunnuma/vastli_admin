import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface Props {
  handleNext: () => void;
  handlePrevious: () => void;
}
function BillingInfo({ handleNext, handlePrevious }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
        <CardDescription>Set up the restaurant's billing details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subscription-plan">Subscription Plan</Label>
          <select
            id="subscription-plan"
            className="w-full rounded-md border border-gray-200 dark:border-gray-800 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
          >
            <option value="">Select a plan</option>
            <option value="basic">Basic ($49/month)</option>
            <option value="standard">Standard ($99/month)</option>
            <option value="premium">Premium ($199/month)</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="billing-name">Name on Card</Label>
          <Input id="billing-name" placeholder="Full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="card-number">Card Number</Label>
          <Input id="card-number" placeholder="XXXX XXXX XXXX XXXX" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry-date">Expiry Date</Label>
            <Input id="expiry-date" placeholder="MM/YY" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input id="cvv" placeholder="XXX" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="billing-address">Billing Address</Label>
          <Input id="billing-address" placeholder="Street address" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="billing-city">City</Label>
            <Input id="billing-city" placeholder="City" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-state">State</Label>
            <Input id="billing-state" placeholder="State" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-zip">ZIP Code</Label>
            <Input id="billing-zip" placeholder="ZIP Code" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={handlePrevious}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button onClick={handleNext}>
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default BillingInfo;
