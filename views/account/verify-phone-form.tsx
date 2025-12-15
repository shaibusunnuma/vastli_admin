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
import { useUser } from "@/lib/AuthProvider";

const codeSchema = z.object({
  code: z.string().min(6, "Please enter a valid code").max(6, "Code must be 6 digits"),
});

type CodeFormData = z.infer<typeof codeSchema>;

interface VerifyPhoneFormProps {
  phone: { phoneNumber: string; verified: boolean };
  onClose: () => void;
}

export function VerifyPhoneForm({ phone, onClose }: VerifyPhoneFormProps) {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeFormData>({
    resolver: zodResolver(codeSchema),
  });

  const onSubmit = async (data: CodeFormData) => {
    setIsLoading(true);
    try {
      await adminApi.verifyPhone(phone.phoneNumber, data.code);
      toast.success("Phone verified successfully");
      user?.reload();
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "Failed to verify phone");
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async () => {
    setIsResending(true);
    try {
      await adminApi.sendPhoneVerification(phone.phoneNumber);
      toast.success("Verification code sent");
    } catch (error: any) {
      toast.error(error?.message || "Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div>
        <h4 className="font-medium">Verify Phone Number</h4>
        <p className="text-sm text-muted-foreground">
          Enter the verification code sent to {phone.phoneNumber}
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="code">Verification Code</Label>
        <Input
          id="code"
          {...register("code")}
          placeholder="Enter 6-digit code"
          maxLength={6}
        />
        {errors.code && (
          <p className="text-sm text-red-500">{errors.code.message}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <Button
          variant="link"
          className="p-0 h-auto"
          onClick={resendCode}
          disabled={isResending}
        >
          {isResending ? "Sending..." : "Resend code"}
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
}
