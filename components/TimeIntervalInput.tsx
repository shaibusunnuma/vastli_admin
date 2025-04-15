import React, { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input"; // Use Shadcn Input for web
import { cn } from "@/lib/utils"; // Import your cn utility

// Define the props for the web component
interface TimeIntervalInputProps {
  value: string; // Combined value like "HH:MM-HH:MM"
  onChange: (value: string) => void; // Callback with the combined value
  onBlur?: React.FocusEventHandler<HTMLInputElement>; // Standard web blur event
  placeholder?: {
    start?: string;
    end?: string;
  };
  hasError?: boolean; // To indicate validation error state
  className?: string; // Allow passing additional classes to the container
  inputClassName?: string; // Allow passing classes to individual inputs
}

const TimeIntervalInput = React.forwardRef<HTMLDivElement, TimeIntervalInputProps>(
  ({
    value,
    onChange,
    onBlur,
    placeholder = { start: "09:00", end: "18:00" },
    hasError,
    className,
    inputClassName,
  }, ref) => {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const startInputRef = useRef<HTMLInputElement>(null);
    const endInputRef = useRef<HTMLInputElement>(null);

    // Parse the combined value when component mounts or value changes externally
    useEffect(() => {
      if (value && typeof value === 'string') {
        const timeParts = value.split("-");
        if (timeParts.length === 2) {
          const start = timeParts[0].trim();
          const end = timeParts[1].trim();
          // Only update state if the parsed value differs from current state
          // to avoid infinite loops if parent component updates value on every change
          if (start !== startTime) setStartTime(start);
          if (end !== endTime) setEndTime(end);
        } else if (value === '') { // Handle empty string case
            if (startTime !== '') setStartTime('');
            if (endTime !== '') setEndTime('');
        }
      } else {
        if (startTime !== '') setStartTime('');
        if (endTime !== '') setEndTime('');
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]); // Dependency only on external value prop


    // Combine start and end times into the final format and call onChange
    const triggerChange = (start: string, end: string) => {
        // Only call onChange if both parts are potentially valid or empty
        // This prevents sending incomplete values like "10:-" during typing
        const newCombinedValue = (start || end) ? `${start}-${end}` : "";
        // Prevent calling onChange if the value hasn't actually changed
        if (newCombinedValue !== value) {
            onChange(newCombinedValue);
        }
    };

    // Format time input and automatically add colon after hours
    const formatTimeInput = (input: string): string => {
      const digitsOnly = input.replace(/\D/g, "");

      if (digitsOnly.length <= 2) {
        // Allow typing hours (e.g., "0", "9", "10", "23")
        return digitsOnly;
      } else if (digitsOnly.length === 3) {
        // Add colon after hours (e.g., "09:", "14:")
        return `${digitsOnly.substring(0, 2)}:${digitsOnly.substring(2, 3)}`;
      } else {
        // Format as HH:MM (e.g., "09:30", "14:55")
        return `${digitsOnly.substring(0, 2)}:${digitsOnly.substring(2, 4)}`;
      }
    };

    // Validate time format (HH:MM)
    const isValidTimeFormat = (time: string): boolean => {
        // Allow empty string
        if (!time) return true;
        // Basic check for HH:MM format
        const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return timePattern.test(time);
    };

    // More lenient validation during typing
     const isPotentiallyValidTime = (time: string): boolean => {
        if (!time) return true;
        // Allows HH, HH:, HH:M, HH:MM during input
        const timePattern = /^([01]?\d|2[0-3])(:?([0-5]?\d)?)?$/;
        return timePattern.test(time);
    };


    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value;
      const formattedTime = formatTimeInput(text);

      if (isPotentiallyValidTime(formattedTime)) {
        setStartTime(formattedTime);
        triggerChange(formattedTime, endTime); // Update combined value

        // Auto-focus to end time field if fully entered (HH:MM)
        if (formattedTime.match(/^\d{2}:\d{2}$/)) {
          endInputRef.current?.focus();
        }
      }
    };

    const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value;
      const formattedTime = formatTimeInput(text);

      if (isPotentiallyValidTime(formattedTime)) {
        setEndTime(formattedTime);
        triggerChange(startTime, formattedTime); // Update combined value
      }
    };

    // Validate on blur and potentially correct format
    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
        const { name } = event.target;
        let currentStart = startTime;
        let currentEnd = endTime;

        if (name === 'startTime') {
            if (!isValidTimeFormat(startTime) && startTime) {
                // Optionally reset or try to correct invalid input on blur
                // For simplicity, we might just leave it as is for Zod to catch,
                // or reset it:
                // setStartTime("");
                // currentStart = "";
            }
        } else if (name === 'endTime') {
             if (!isValidTimeFormat(endTime) && endTime) {
                // setEndTime("");
                // currentEnd = "";
            }
        }

        // Ensure the combined value is updated on blur
        triggerChange(currentStart, currentEnd);

        // Call the original onBlur prop if provided
        if (onBlur) {
            onBlur(event);
        }
    };


    return (
      // Use div with flex for layout, forward the ref here
      <div ref={ref} className={cn("flex items-center gap-1", className)}>
        <Input
          ref={startInputRef}
          name="startTime" // Add name for blur handler identification
          placeholder={placeholder.start}
          value={startTime}
          onChange={handleStartTimeChange}
          onBlur={handleBlur} // Use combined blur handler
          className={cn(
            "flex-1 w-full text-center", // Basic styling
            { "border-destructive": hasError }, // Apply error border
            inputClassName
          )}
          inputMode="numeric" // Hint for numeric keyboard on mobile
          maxLength={5} // HH:MM
          autoComplete="off"
        />
        <span className="px-1 text-muted-foreground">-</span>
        <Input
          ref={endInputRef}
          name="endTime" // Add name for blur handler identification
          placeholder={placeholder.end}
          value={endTime}
          onChange={handleEndTimeChange}
          onBlur={handleBlur} // Use combined blur handler
          className={cn(
            "flex-1 w-full text-center", // Basic styling
            { "border-destructive": hasError }, // Apply error border
            inputClassName
          )}
          inputMode="numeric" // Hint for numeric keyboard on mobile
          maxLength={5} // HH:MM
          autoComplete="off"
        />
      </div>
    );
  }
);

TimeIntervalInput.displayName = "TimeIntervalInput";

export { TimeIntervalInput }; // Export using named export for consistency
