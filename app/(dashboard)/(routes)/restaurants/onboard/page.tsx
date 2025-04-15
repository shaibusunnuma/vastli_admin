"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import OnboardingStep from "@/views/restaurants/onboard/onboarding-step";
import BasicInfo from "./basic-info";
import OwnerInfo from "./owner-info";
import MenuSettings from "./menu-settings";
import BillingInfo from "./billing-info";
import InfoReview from "./info-review";
import { Restaurant } from "@/types/restaurants";
import { defaultRestaurant } from "./schemas";

export default function OnboardRestaurantPage() {
  const [currentStep, setCurrentStep] = useState("basic-info");
  const [restaurantData, setRestaurantData] = useState<Partial<Restaurant>>(defaultRestaurant);

  const handleNext = () => {
    if (currentStep === "basic-info") setCurrentStep("owner-info");
    else if (currentStep === "owner-info") setCurrentStep("menu-settings");
    else if (currentStep === "menu-settings") setCurrentStep("billing-info");
    else if (currentStep === "billing-info") setCurrentStep("review");
  };

  const handlePrevious = () => {
    if (currentStep === "owner-info") setCurrentStep("basic-info");
    else if (currentStep === "menu-settings") setCurrentStep("owner-info");
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

      <OnboardingStep currentStep={currentStep} />

      <Tabs value={currentStep} className="w-full">
        <TabsContent value="basic-info">
          <BasicInfo restaurant={restaurantData} setRestaurant={setRestaurantData} setCurrentStep={setCurrentStep} />
        </TabsContent>

        <TabsContent value="owner-info">
          <OwnerInfo restaurant={restaurantData} setRestaurant={setRestaurantData} setCurrentStep={setCurrentStep} />
        </TabsContent>

        <TabsContent value="menu-settings">
          <MenuSettings handleNext={handleNext} handlePrevious={handlePrevious} />
        </TabsContent>

        <TabsContent value="billing-info">
          <BillingInfo handleNext={handleNext} handlePrevious={handlePrevious} />
        </TabsContent>

        <TabsContent value="review">
          <InfoReview handlePrevious={handlePrevious} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
