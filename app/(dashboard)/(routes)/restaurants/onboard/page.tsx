"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export default function OnboardRestaurantPage() {
  const [currentStep, setCurrentStep] = useState("basic-info");
  
  const handleNext = () => {
    if (currentStep === "basic-info") setCurrentStep("contact-info");
    else if (currentStep === "contact-info") setCurrentStep("menu-settings");
    else if (currentStep === "menu-settings") setCurrentStep("billing-info");
    else if (currentStep === "billing-info") setCurrentStep("review");
  };
  
  const handlePrevious = () => {
    if (currentStep === "contact-info") setCurrentStep("basic-info");
    else if (currentStep === "menu-settings") setCurrentStep("contact-info");
    else if (currentStep === "billing-info") setCurrentStep("menu-settings");
    else if (currentStep === "review") setCurrentStep("billing-info");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Link href="/restaurants">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Restaurants
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Onboard New Restaurant</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
            currentStep === "basic-info" || currentStep === "contact-info" || currentStep === "menu-settings" || currentStep === "billing-info" || currentStep === "review"
              ? "bg-violet-500 text-white"
              : "bg-gray-200 text-gray-500"
          }`}>
            {currentStep === "basic-info" || currentStep === "contact-info" || currentStep === "menu-settings" || currentStep === "billing-info" || currentStep === "review" ? <Check className="h-4 w-4" /> : "1"}
          </div>
          <div className="h-1 w-12 bg-gray-200">
            <div className={`h-full ${
              currentStep === "contact-info" || currentStep === "menu-settings" || currentStep === "billing-info" || currentStep === "review"
                ? "bg-violet-500"
                : "bg-gray-200"
            }`} />
          </div>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
            currentStep === "contact-info" || currentStep === "menu-settings" || currentStep === "billing-info" || currentStep === "review"
              ? "bg-violet-500 text-white"
              : "bg-gray-200 text-gray-500"
          }`}>
            {currentStep === "contact-info" || currentStep === "menu-settings" || currentStep === "billing-info" || currentStep === "review" ? <Check className="h-4 w-4" /> : "2"}
          </div>
          <div className="h-1 w-12 bg-gray-200">
            <div className={`h-full ${
              currentStep === "menu-settings" || currentStep === "billing-info" || currentStep === "review"
                ? "bg-violet-500"
                : "bg-gray-200"
            }`} />
          </div>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
            currentStep === "menu-settings" || currentStep === "billing-info" || currentStep === "review"
              ? "bg-violet-500 text-white"
              : "bg-gray-200 text-gray-500"
          }`}>
            {currentStep === "menu-settings" || currentStep === "billing-info" || currentStep === "review" ? <Check className="h-4 w-4" /> : "3"}
          </div>
          <div className="h-1 w-12 bg-gray-200">
            <div className={`h-full ${
              currentStep === "billing-info" || currentStep === "review"
                ? "bg-violet-500"
                : "bg-gray-200"
            }`} />
          </div>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
            currentStep === "billing-info" || currentStep === "review"
              ? "bg-violet-500 text-white"
              : "bg-gray-200 text-gray-500"
          }`}>
            {currentStep === "billing-info" || currentStep === "review" ? <Check className="h-4 w-4" /> : "4"}
          </div>
          <div className="h-1 w-12 bg-gray-200">
            <div className={`h-full ${
              currentStep === "review"
                ? "bg-violet-500"
                : "bg-gray-200"
            }`} />
          </div>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
            currentStep === "review"
              ? "bg-violet-500 text-white"
              : "bg-gray-200 text-gray-500"
          }`}>
            {currentStep === "review" ? <Check className="h-4 w-4" /> : "5"}
          </div>
        </div>
      </div>

      <Tabs value={currentStep} className="w-full">
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the restaurant's basic details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-name">Restaurant Name</Label>
                  <Input id="restaurant-name" placeholder="Enter restaurant name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restaurant-type">Restaurant Type</Label>
                  <Input id="restaurant-type" placeholder="e.g. Italian, Japanese, etc." />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea 
                  id="description" 
                  placeholder="Brief description of the restaurant"
                  className="w-full min-h-[100px] rounded-md border border-gray-200 dark:border-gray-800 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Street address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="State" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="ZIP Code" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="Country" defaultValue="United States" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" disabled>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact-info">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Enter the restaurant's contact details
              </CardDescription>
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
        </TabsContent>
        
        <TabsContent value="menu-settings">
          <Card>
            <CardHeader>
              <CardTitle>Menu Settings</CardTitle>
              <CardDescription>
                Configure the restaurant's menu and reservation settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cuisine-type">Cuisine Type</Label>
                <Input id="cuisine-type" placeholder="e.g. Italian, Japanese, Mexican" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price-range">Price Range</Label>
                <select 
                  id="price-range" 
                  className="w-full rounded-md border border-gray-200 dark:border-gray-800 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
                >
                  <option value="">Select price range</option>
                  <option value="$">$ (Inexpensive)</option>
                  <option value="$$">$$ (Moderate)</option>
                  <option value="$$$">$$$ (Expensive)</option>
                  <option value="$$$$">$$$$ (Very Expensive)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="seating-capacity">Seating Capacity</Label>
                <Input id="seating-capacity" type="number" placeholder="Number of seats" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reservation-interval">Reservation Interval (minutes)</Label>
                <Input id="reservation-interval" type="number" placeholder="e.g. 15, 30, 60" defaultValue="30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="menu-upload">Upload Menu (PDF)</Label>
                <Input id="menu-upload" type="file" accept=".pdf" />
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
        </TabsContent>
        
        <TabsContent value="billing-info">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Set up the restaurant's billing details
              </CardDescription>
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
        </TabsContent>
        
        <TabsContent value="review">
          <Card>
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>
                Review the restaurant information before submitting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-gray-200 dark:border-gray-800 p-4">
                <h3 className="font-medium mb-2">Basic Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Restaurant Name:</span>
                    <span className="ml-2">Sample Restaurant</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Restaurant Type:</span>
                    <span className="ml-2">Italian</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Address:</span>
                    <span className="ml-2">123 Main St, San Francisco, CA 94105, United States</span>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md border border-gray-200 dark:border-gray-800 p-4">
                <h3 className="font-medium mb-2">Contact Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Owner:</span>
                    <span className="ml-2">John Doe</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <span className="ml-2">john@example.com</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <span className="ml-2">(555) 123-4567</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Website:</span>
                    <span className="ml-2">https://example.com</span>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md border border-gray-200 dark:border-gray-800 p-4">
                <h3 className="font-medium mb-2">Menu Settings</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Cuisine:</span>
                    <span className="ml-2">Italian</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Price Range:</span>
                    <span className="ml-2">$$</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Seating:</span>
                    <span className="ml-2">50</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Reservation Interval:</span>
                    <span className="ml-2">30 minutes</span>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md border border-gray-200 dark:border-gray-800 p-4">
                <h3 className="font-medium mb-2">Billing Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Plan:</span>
                    <span className="ml-2">Standard ($99/month)</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Payment Method:</span>
                    <span className="ml-2">Visa ending in 4242</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                />
                <Label htmlFor="terms" className="text-sm">
                  I confirm that all information provided is accurate and I agree to the terms and conditions
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={handlePrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Link href="/restaurants">
                <Button>
                  Submit
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
