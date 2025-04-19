"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import OnboardingStep from "@/views/restaurants/onboard/onboarding-step";
import BasicInfo from "@/views/restaurants/onboard/basic-info";
import OwnerInfo from "@/views/restaurants/onboard/owner-info";
import RestaurantSettings from "@/views/restaurants/onboard/restaurant-settings";
import InfoReview from "@/views/restaurants/onboard/info-review";
import { Restaurant, Step } from "@/types/restaurants";
import { defaultRestaurant } from "@/views/restaurants/onboard/schemas";

export default function OnboardRestaurantPage() {
  const [currentStep, setCurrentStep] = useState<Step>("1");
  const [restaurantData, setRestaurantData] = useState<Partial<Restaurant>>(defaultRestaurant);

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

      <OnboardingStep currentStep={currentStep} />

      <Tabs value={currentStep} className="w-full">
        <TabsContent value="1">
          <OwnerInfo restaurant={restaurantData} setRestaurant={setRestaurantData} setCurrentStep={setCurrentStep} />
        </TabsContent>
        <TabsContent value="2">
          <BasicInfo restaurant={restaurantData} setRestaurant={setRestaurantData} setCurrentStep={setCurrentStep} />
        </TabsContent>
        <TabsContent value="3">
          <RestaurantSettings restaurant={restaurantData} setRestaurant={setRestaurantData} setCurrentStep={setCurrentStep} />
        </TabsContent>

        {/* <TabsContent value="4">
          <BillingInfo handleNext={handleNext} handlePrevious={handlePrevious} />
        </TabsContent> */}

        <TabsContent value="4">
          <InfoReview restaurant={restaurantData} setRestaurant={setRestaurantData} setCurrentStep={setCurrentStep} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
