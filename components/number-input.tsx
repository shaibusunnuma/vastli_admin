import React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names
import { Button } from "@/components/ui/button"; // Use Shadcn Button
import { Input } from "@/components/ui/input"; // Use Shadcn Input
import { Minus, Plus } from "lucide-react"; // Use lucide-react for web

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  onChange: (value: number) => void;
  value: number | string; // Allow string for intermediate input state
  onBlur?: React.FocusEventHandler<HTMLInputElement>; // Standard onBlur type
  max?: number;
  min?: number;
  interval?: number;
  containerClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

const NumberInput = React.forwardRef<HTMLInputElement, Props>(
  ({
    onChange,
    value,
    onBlur,
    max = 100, // Default max
    min = 1,   // Default min
    interval = 1, // Default interval
    className, // Pass className to the input itself
    containerClassName,
    inputClassName,
    buttonClassName,
    disabled,
    ...props // Pass remaining input props
  }, ref) => {

    const handleIncrement = () => {
      const numericValue = Number(value);
      if (isNaN(numericValue)) {
        onChange(min); // Start from min if current value is not a number
        return;
      }
      const newValue = numericValue + interval;
      if (newValue <= max) {
        onChange(newValue);
      }
    };

    const handleDecrement = () => {
      const numericValue = Number(value);
      if (isNaN(numericValue)) {
        onChange(min); // Start from min if current value is not a number
        return;
      }
      const newValue = numericValue - interval;
      if (newValue >= min) {
        onChange(newValue);
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const textValue = event.target.value;
        // Allow empty string or only numbers (potentially with a leading minus for negative values if min allows)
        if (textValue === '' || (min < 0 && textValue === '-') || /^-?\d*\.?\d*$/.test(textValue)) {
            // If it's just a minus sign and min is negative, keep it as string for now
            if (textValue === '-' && min < 0) {
                 onChange(NaN); // Or handle intermediate state differently if needed
                 // Or maybe pass the string directly if the parent can handle it?
                 // For simplicity, let's treat invalid intermediate state as NaN for calculation
                 // but allow the input field to show the minus sign.
                 // The parent component should probably handle the final numeric conversion.
                 // Let's refine: pass the raw string if it's potentially valid, otherwise parse
                 if (props.type !== 'number') { // If type isn't strictly number, allow intermediate strings
                    // This part is tricky. Let's stick to passing numbers via onChange
                    // and let the input display the current text.
                 }
            }

            const numberValue = Number(textValue);
             // Check if the number is within bounds ONLY if it's a valid number
            if (!isNaN(numberValue)) {
                 if (numberValue > max) {
                    onChange(max);
                 } else if (textValue !== '' && numberValue < min) { // Don't clamp to min if input is empty
                    // Allow typing numbers smaller than min temporarily, clamp onBlur or button press?
                    // Let's clamp immediately for consistency
                    onChange(min);
                 }
                 else {
                    onChange(numberValue);
                 }
            } else if (textValue === '') {
                 onChange(NaN); // Represent empty as NaN or another sentinel value if needed
            }
             // If it's not a valid number (e.g., just "-"), do nothing with onChange,
             // but the input field itself will update visually.
        }
    };

     const handleInputBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
        let numericValue = Number(event.target.value);

        if (isNaN(numericValue) || event.target.value === '' || (event.target.value === '-' && min >= 0)) {
            numericValue = min; // Default to min if invalid or empty on blur
        } else if (numericValue < min) {
            numericValue = min;
        } else if (numericValue > max) {
            numericValue = max;
        }
        onChange(numericValue); // Ensure value is valid number within bounds on blur

        // Call original onBlur if provided
        if (onBlur) {
            onBlur(event);
        }
    };


    // Prepare value for display (handle NaN case)
    const displayValue = isNaN(Number(value)) ? '' : String(value);


    return (
      <div className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
        disabled && "cursor-not-allowed opacity-50", // Handle disabled state styling
        containerClassName
      )}>
        <Button
          type="button" // Prevent form submission
          variant="ghost"
          size="icon"
          className={cn("h-6 w-6", buttonClassName)}
          onClick={handleDecrement}
          disabled={disabled || Number(value) <= min}
          aria-label="Decrement value"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <Input
          ref={ref}
          type="text" // Use text type for better control over input characters
          inputMode="numeric" // Hint for mobile keyboards
          className={cn(
            "flex-1 border-0 shadow-none focus-visible:ring-0 text-center h-auto p-0 bg-transparent", // Remove default input styling
            inputClassName,
            className // Allow overriding via className prop
          )}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleInputBlur} // Use the combined blur handler
          disabled={disabled}
          min={min} // Set min/max attributes for semantics, though logic handles enforcement
          max={max}
          step={interval} // Set step attribute
          {...props} // Spread remaining props like placeholder, etc.
        />

        <Button
          type="button" // Prevent form submission
          variant="ghost"
          size="icon"
          className={cn("h-6 w-6", buttonClassName)}
          onClick={handleIncrement}
          disabled={disabled || Number(value) >= max}
          aria-label="Increment value"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput"; // Add display name for DevTools

export default NumberInput;

