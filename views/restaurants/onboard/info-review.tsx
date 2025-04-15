import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Check } from "lucide-react";
import { Restaurant, Step } from "@/types/restaurants";
import { useAddRestaurantMutation } from "@/lib/services/restaurants/restaurantApiSlice";
import logger from "@/lib/logger";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  restaurant: Partial<Restaurant>;
  setRestaurant: React.Dispatch<React.SetStateAction<Partial<Restaurant>>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
}

function InfoReview({ restaurant, setRestaurant, setCurrentStep }: Props) {
  const router = useRouter();
  const {
    name,
    cuisine,
    priceRange,
    capacity,
    address,
    contact,
    reservationSettings,
    operatingHours,
    webId,
    imageUrl,
    logoUrl,
    description,
    ownerId,
  } = restaurant;
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const [createRestaurant] = useAddRestaurantMutation();

  const submit = async () => {
    try {
      setIsLoading(true);
      await createRestaurant(restaurant);
      toast.success("Restaurant created successfully!");
      router.push("/restaurants");
    } catch (error: any) {
      logger.error(error);
      const msg = error.data.message || "Error creating customer";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review & Submit</CardTitle>
        <CardDescription>Review the restaurant information before submitting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Info */}
        <div className="rounded-md border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-medium mb-2">Basic Information</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Name:</span>
              <span className="ml-2">{name || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500">Cuisine:</span>
              <span className="ml-2">{cuisine || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500">Price Range:</span>
              <span className="ml-2">{priceRange || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500">Capacity:</span>
              <span className="ml-2">{capacity || "—"}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">Description:</span>
              <span className="ml-2">{description || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500">Web ID:</span>
              <span className="ml-2">{webId || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500">Logo URL:</span>
              <span className="ml-2">{logoUrl || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500">Image URL:</span>
              <span className="ml-2">{imageUrl || "—"}</span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="rounded-md border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-medium mb-2">Address</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Street:</span>
              <span className="ml-2">{address?.street || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500">City:</span>
              <span className="ml-2">{address?.city || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500">State:</span>
              <span className="ml-2">{address?.state || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500">Postal Code:</span>
              <span className="ml-2">{address?.postalCode || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500">Country:</span>
              <span className="ml-2">{address?.country || "—"}</span>
            </div>
          </div>
        </div>

        {/* Contact */}
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

        {/* Reservation Settings */}
        <div className="rounded-md border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-medium mb-2">Reservation Settings</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Time Slot Interval:</span>
              <span className="ml-2">{reservationSettings?.timeSlotInterval} minutes</span>
            </div>
            <div>
              <span className="text-gray-500">Max Booking Days:</span>
              <span className="ml-2">{reservationSettings?.maxBookingDaysInAdvance}</span>
            </div>
            <div>
              <span className="text-gray-500">Guests Per Reservation:</span>
              <span className="ml-2">
                {reservationSettings?.minGuestsPerReservation} - {reservationSettings?.maxGuestsPerReservation}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Allow Self Booking:</span>
              <span className="ml-2">{reservationSettings?.allowSelfBookingManagement ? "Yes" : "No"}</span>
            </div>
            <div>
              <span className="text-gray-500">Auto Confirm Reservations:</span>
              <span className="ml-2">{reservationSettings?.autoConfirmReservations ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="rounded-md border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-medium mb-2">Operating Hours</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {operatingHours?.useIndividualDaySettings ? (
              <>
                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                  <div key={day}>
                    <span className="text-gray-500 capitalize">{day}:</span>
                    <span className="ml-2">{(operatingHours as any)?.[day] || "—"}</span>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div>
                  <span className="text-gray-500">Weekdays:</span>
                  <span className="ml-2">{operatingHours?.weekdays || "—"}</span>
                </div>
                <div>
                  <span className="text-gray-500">Weekends:</span>
                  <span className="ml-2">{operatingHours?.weekends || "—"}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Owner */}
        {/* <div className="rounded-md border border-gray-200 dark:border-gray-800 p-4">
          <h3 className="font-medium mb-2">Owner</h3>
          <div className="text-sm">
            <span className="text-gray-500">Owner ID:</span>
            <span className="ml-2">{ownerId || "—"}</span>
          </div>
        </div> */}

        {/* Billing (placeholder) */}
        {/* <div className="rounded-md border border-gray-200 dark:border-gray-800 p-4">
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
        </div> */}

        {/* Confirmation */}
        <div className="flex items-center space-x-2">
          <Checkbox onCheckedChange={(checked) => setChecked(checked as boolean)} id="terms" />
          <Label htmlFor="terms" className="text-sm">
            I confirm that all information provided is accurate and I agree to the terms and conditions
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={() => setCurrentStep("3")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button onClick={submit}>
          {isLoading ? "Submitting..." : "Submit"}
          <Check className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default InfoReview;
