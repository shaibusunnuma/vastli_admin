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
function ContactInfo({ handleNext, handlePrevious }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Enter the restaurant's contact details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="owner-name">Owner Name</Label>
            <Input id="owner-name" placeholder="Full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner-email">Owner Email</Label>
            <Input id="owner-email" type="email" placeholder="Email address" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="Phone number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" placeholder="https://" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="operating-hours">Operating Hours</Label>
          <textarea
            id="operating-hours"
            placeholder="e.g. Mon-Fri: 11am-10pm, Sat-Sun: 10am-11pm"
            className="w-full min-h-[100px] rounded-md border border-gray-200 dark:border-gray-800 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
          />
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

export default ContactInfo;
