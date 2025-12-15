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

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface AddEmailFormProps {
  onSuccess: (email: { emailAddress: string; verified: boolean }) => void;
  onCancel: () => void;
}

export function AddEmailForm({ onSuccess, onCancel }: AddEmailFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to add email
      toast.info("Email verification coming soon");
      onSuccess({ emailAddress: data.email, verified: false });
    } catch (error: any) {
      toast.error(error?.message || "Failed to add email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Enter email address"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Email
        </Button>
      </div>
    </div>
  );
}
