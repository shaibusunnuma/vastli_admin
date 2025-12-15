"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { adminApi } from "@/lib/auth/admin-api";

const phoneSchema = z.object({
  phone: z.string().min(10, "Please enter a valid phone number"),
});

type PhoneFormData = z.infer<typeof phoneSchema>;

interface AddPhoneFormProps {
  onSuccess: (phone: { phoneNumber: string; verified: boolean }) => void;
  onCancel: () => void;
}

export function AddPhoneForm({ onSuccess, onCancel }: AddPhoneFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
  });

  const onSubmit = async (data: PhoneFormData) => {
    setIsLoading(true);
    try {
      const result = await adminApi.addPhone(data.phone);
      toast.success("Verification code sent to your phone");
      onSuccess(result.phoneNumber);
    } catch (error: any) {
      toast.error(error?.message || "Failed to add phone number");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          placeholder="Enter phone number"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Phone
        </Button>
      </div>
    </div>
  );
}
