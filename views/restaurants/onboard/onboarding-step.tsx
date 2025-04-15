import { Check } from "lucide-react";
import React from "react";

function OnboardingStep({ currentStep }: { currentStep: string }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            Number(currentStep) > 1 ? "bg-violet-500 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          {Number(currentStep) > 1 ? <Check className="h-4 w-4" /> : "1"}
        </div>
        <div className="h-1 w-12 bg-gray-200">
          <div className={`h-full ${Number(currentStep) > 1 ? "bg-violet-500" : "bg-gray-200"}`} />
        </div>
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            Number(currentStep) > 2 ? "bg-violet-500 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          {Number(currentStep) > 2 ? <Check className="h-4 w-4" /> : "2"}
        </div>
        <div className="h-1 w-12 bg-gray-200">
          <div className={`h-full ${Number(currentStep) > 2 ? "bg-violet-500" : "bg-gray-200"}`} />
        </div>
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            Number(currentStep) > 3 ? "bg-violet-500 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          {Number(currentStep) > 3 ? <Check className="h-4 w-4" /> : "3"}
        </div>
        <div className="h-1 w-12 bg-gray-200">
          <div className={`h-full ${Number(currentStep) > 3 ? "bg-violet-500" : "bg-gray-200"}`} />
        </div>
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            Number(currentStep) > 4 ? "bg-violet-500 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          {Number(currentStep) > 4 ? <Check className="h-4 w-4" /> : "4"}
        </div>
        {/* <div className="h-1 w-12 bg-gray-200">
          <div className={`h-full ${currentStep === "review" ? "bg-violet-500" : "bg-gray-200"}`} />
        </div>
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            currentStep === "5" ? "bg-violet-500 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          {currentStep === "5" ? <Check className="h-4 w-4" /> : "5"}
        </div> */}
      </div>
    </div>
  );
}

export default OnboardingStep;
