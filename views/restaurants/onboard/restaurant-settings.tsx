import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  handleNext: () => void;
  handlePrevious: () => void;
}
function RestaurantSettings({ handleNext, handlePrevious }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Restaurant Settings</CardTitle>
        <CardDescription>Configure the restaurant's menu and reservation settings</CardDescription>
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
  );
}

export default RestaurantSettings;
