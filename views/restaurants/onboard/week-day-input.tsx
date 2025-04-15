import React from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { OperatingHoursType } from "@/views/restaurants/onboard/schemas"; // Adjust path
import { TimeIntervalInput } from "@/components/TimeIntervalInput";

interface WeekdayInputProps {
  day: keyof Omit<OperatingHoursType, "weekdays" | "weekends" | "useIndividualDaySettings">;
}

const WeekdayInput: React.FC<WeekdayInputProps> = ({ day }) => {
  const { control } = useFormContext<OperatingHoursType>();

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <FormField
      control={control}
      name={day}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <FormLabel>{capitalize(day)}</FormLabel>
          </div>
          <FormControl className="w-40">
            <TimeIntervalInput {...field} value={field.value ?? ""} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default WeekdayInput;
