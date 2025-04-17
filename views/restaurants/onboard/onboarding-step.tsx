import { Check } from "lucide-react";
import React from "react";

const TOTAL_STEPS = 4;

const getStepClasses = (stepState: "completed" | "current" | "upcoming") => {
  switch (stepState) {
    case "completed":
      return "bg-violet-500 text-white";
    case "current":
      return "bg-violet-100 text-violet-600 border-2 border-violet-500 font-semibold";
    case "upcoming":
    default:
      return "bg-gray-200 text-gray-500";
  }
};

const getLineClasses = (isCompleted: boolean) => {
  return isCompleted ? "bg-violet-500" : "bg-gray-200";
};

export function OnboardingStep({ currentStep }: { currentStep: string | number }) {
  const currentStepNumber = Number(currentStep);
  const steps = Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center w-full mb-6 px-4">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = step < currentStepNumber;
          const isCurrent = step === currentStepNumber;

          let stepState: "completed" | "current" | "upcoming";
          if (isCompleted) {
            stepState = "completed";
          } else if (isCurrent) {
            stepState = "current";
          } else {
            stepState = "upcoming";
          }

          const showLine = index < steps.length - 1;
          const isLineActive = isCompleted;

          return (
            <React.Fragment key={step}>
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm shrink-0 ${getStepClasses(stepState)}`}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : step}
              </div>

              {showLine && <div className={`h-1 w-12 mx-1 ${getLineClasses(isLineActive)}`} />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default OnboardingStep;
