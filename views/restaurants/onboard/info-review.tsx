import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { Restaurant, Step } from "@/types/restaurants";

interface Props {
  restaurant: Partial<Restaurant>;
  setRestaurant: React.Dispatch<React.SetStateAction<Partial<Restaurant>>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
}

function InfoReview({ restaurant, setRestaurant, setCurrentStep }: Props) {
  const {
    name,
    cuisine,
    priceRange,
    capacity,
    address,
    contact,
    reservationSettings,
  } = restaurant;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review & Submit</CardTitle>
        <CardDescription>
          Review the restaurant information before submitting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Info */}
        <div className="rounded-md border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-medium mb-2">Basic Information</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Restaurant Name:</span>
              <span className="ml-2">{name || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500">Cuisine:</span>
              <span className="ml-2">{cuisine || "—"}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">Address:</span>
              <span className="ml-2">
                {address
                  ? `${address.street || ""}, ${address.city || ""}, ${address.state || ""}, ${address.country || ""}`
                  : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="rounded-md border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-medium mb-2">Contact Information</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Email:</span>
              <span className="ml-2">{contact?.email || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500">Phone:</span>
              <span className="ml-2">{contact?.phone || "—"}</span>
            </div>
          </div>
        </div>

        {/* Menu & Reservation Settings */}
        <div className="rounded-md border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-medium mb-2">Menu & Reservation Settings</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Price Range:</span>
              <span className="ml-2">{priceRange || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500">Seating Capacity:</span>
              <span className="ml-2">{capacity || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500">Time Slot Interval:</span>
              <span className="ml-2">
                {reservationSettings?.timeSlotInterval
                  ? `${reservationSettings.timeSlotInterval} minutes`
                  : "—"}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Guests per Reservation:</span>
              <span className="ml-2">
                {reservationSettings?.minGuestsPerReservation ?? "—"} -{" "}
                {reservationSettings?.maxGuestsPerReservation ?? "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Billing */}
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

        {/* Terms */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
          />
          <Label htmlFor="terms" className="text-sm">
            I confirm that all information provided is accurate and I agree to
            the terms and conditions
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={() => setCurrentStep("3")}>
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
  );
}

export default InfoReview;
