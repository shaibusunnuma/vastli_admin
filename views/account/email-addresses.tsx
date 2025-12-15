"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Check, Trash2, Mail } from "lucide-react";
import { useUser } from "@/lib/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddEmailForm } from "./add-email-form";
import { VerifyEmailForm } from "./verify-email-form";

enum FormState {
  IDLE = "idle",
  ADDING = "adding",
  VERIFYING = "verifying",
}

interface EmailAddress {
  emailAddress: string;
  verified: boolean;
}

export function EmailAddresses() {
  const { user } = useUser();
  const [formState, setFormState] = useState(FormState.IDLE);
  const [emailToVerify, setEmailToVerify] = useState<EmailAddress | null>(null);

  const primaryEmail = user?.primaryEmailAddress;
  const additionalEmails = user?.emailAddresses || [];

  const handleVerify = (email: EmailAddress) => {
    setEmailToVerify(email);
    setFormState(FormState.VERIFYING);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Email Addresses</h3>
      </div>

      <div className="space-y-3">
        {primaryEmail && (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{primaryEmail.emailAddress}</span>
              <Badge variant="secondary">Primary</Badge>
              {!primaryEmail.verified && (
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
                {!primaryEmail.verified && (
                  <DropdownMenuItem onClick={() => handleVerify(primaryEmail)}>
                    <Check className="h-4 w-4 mr-2" />
                    Verify email
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {additionalEmails.map((email, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{email.emailAddress}</span>
              {!email.verified && (
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
                {!email.verified && (
                  <DropdownMenuItem onClick={() => handleVerify(email)}>
                    <Check className="h-4 w-4 mr-2" />
                    Verify email
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
      </div>

      {formState === FormState.IDLE && (
        <Button
          variant="ghost"
          className="text-muted-foreground"
          onClick={() => setFormState(FormState.ADDING)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add email address
        </Button>
      )}

      {formState === FormState.ADDING && (
        <AddEmailForm
          onSuccess={(email: { emailAddress: string; verified: boolean }) => {
            setEmailToVerify(email);
            setFormState(FormState.VERIFYING);
          }}
          onCancel={() => setFormState(FormState.IDLE)}
        />
      )}

      {formState === FormState.VERIFYING && emailToVerify && (
        <VerifyEmailForm
          email={emailToVerify}
          onClose={() => {
            setFormState(FormState.IDLE);
            setEmailToVerify(null);
          }}
        />
      )}
    </div>
  );
}
