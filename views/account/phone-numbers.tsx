"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Check, Trash2, Phone } from "lucide-react";
import { useUser } from "@/lib/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddPhoneForm } from "./add-phone-form";
import { VerifyPhoneForm } from "./verify-phone-form";

enum FormState {
  IDLE = "idle",
  ADDING = "adding",
  VERIFYING = "verifying",
}

interface PhoneNumber {
  phoneNumber: string;
  verified: boolean;
}

export function PhoneNumbers() {
  const { user } = useUser();
  const [formState, setFormState] = useState(FormState.IDLE);
  const [phoneToVerify, setPhoneToVerify] = useState<PhoneNumber | null>(null);

  const primaryPhone = user?.primaryPhoneNumber;
  const additionalPhones = user?.phoneNumbers || [];

  const handleVerify = (phone: PhoneNumber) => {
    setPhoneToVerify(phone);
    setFormState(FormState.VERIFYING);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Phone Numbers</h3>
      </div>

      <div className="space-y-3">
        {primaryPhone && (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{primaryPhone.phoneNumber}</span>
              <Badge variant="secondary">Primary</Badge>
              {!primaryPhone.verified && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  Unverified
                </Badge>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {!primaryPhone.verified && (
                  <DropdownMenuItem onClick={() => handleVerify(primaryPhone)}>
                    <Check className="h-4 w-4 mr-2" />
                    Verify phone
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {additionalPhones.map((phone: PhoneNumber, index: number) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{phone.phoneNumber}</span>
              {!phone.verified && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  Unverified
                </Badge>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {!phone.verified && (
                  <DropdownMenuItem onClick={() => handleVerify(phone)}>
                    <Check className="h-4 w-4 mr-2" />
                    Verify phone
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}

        {!primaryPhone && additionalPhones.length === 0 && (
          <p className="text-sm text-muted-foreground">No phone numbers added</p>
        )}
      </div>

      {formState === FormState.IDLE && (
        <Button
          variant="ghost"
          className="text-muted-foreground"
          onClick={() => setFormState(FormState.ADDING)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add phone number
        </Button>
      )}

      {formState === FormState.ADDING && (
        <AddPhoneForm
          onSuccess={(phone: { phoneNumber: string; verified: boolean }) => {
            setPhoneToVerify(phone);
            setFormState(FormState.VERIFYING);
          }}
          onCancel={() => setFormState(FormState.IDLE)}
        />
      )}

      {formState === FormState.VERIFYING && phoneToVerify && (
        <VerifyPhoneForm
          phone={phoneToVerify}
          onClose={() => {
            setFormState(FormState.IDLE);
            setPhoneToVerify(null);
          }}
        />
      )}
    </div>
  );
}
