import { Check } from "lucide-react";
import React from "react";

function OnboardingStep({ currentStep }: { currentStep: string }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            currentStep === "basic-info" ||
            currentStep === "owner-info" ||
            currentStep === "restaurant-settings" ||
            currentStep === "billing-info" ||
            currentStep === "review"
              ? "bg-violet-500 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {currentStep === "basic-info" ||
          currentStep === "owner-info" ||
          currentStep === "restaurant-settings" ||
          currentStep === "billing-info" ||
          currentStep === "review" ? (
            <Check className="h-4 w-4" />
          ) : (
            "1"
          )}
        </div>
        <div className="h-1 w-12 bg-gray-200">
          <div
            className={`h-full ${
              currentStep === "owner-info" || currentStep === "restaurant-settings" || currentStep === "billing-info" || currentStep === "review"
                ? "bg-violet-500"
                : "bg-gray-200"
            }`}
          />
        </div>
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            currentStep === "owner-info" || currentStep === "restaurant-settings" || currentStep === "billing-info" || currentStep === "review"
              ? "bg-violet-500 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {currentStep === "owner-info" || currentStep === "restaurant-settings" || currentStep === "billing-info" || currentStep === "review" ? (
            <Check className="h-4 w-4" />
          ) : (
            "2"
          )}
        </div>
        <div className="h-1 w-12 bg-gray-200">
          <div
            className={`h-full ${
              currentStep === "restaurant-settings" || currentStep === "billing-info" || currentStep === "review" ? "bg-violet-500" : "bg-gray-200"
            }`}
          />
        </div>
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            currentStep === "restaurant-settings" || currentStep === "billing-info" || currentStep === "review"
              ? "bg-violet-500 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {currentStep === "restaurant-settings" || currentStep === "billing-info" || currentStep === "review" ? <Check className="h-4 w-4" /> : "3"}
        </div>
        <div className="h-1 w-12 bg-gray-200">
          <div className={`h-full ${currentStep === "billing-info" || currentStep === "review" ? "bg-violet-500" : "bg-gray-200"}`} />
        </div>
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            currentStep === "billing-info" || currentStep === "review" ? "bg-violet-500 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          {currentStep === "billing-info" || currentStep === "review" ? <Check className="h-4 w-4" /> : "4"}
        </div>
        <div className="h-1 w-12 bg-gray-200">
          <div className={`h-full ${currentStep === "review" ? "bg-violet-500" : "bg-gray-200"}`} />
        </div>
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            currentStep === "review" ? "bg-violet-500 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          {currentStep === "review" ? <Check className="h-4 w-4" /> : "5"}
        </div>
      </div>
    </div>
  );
}

export default OnboardingStep;
