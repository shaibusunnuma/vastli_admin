"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UpdatePasswordForm } from "./update-password-form";

export function PasswordSection() {
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  if (showUpdatePassword) {
    return (
      <UpdatePasswordForm closeForm={() => setShowUpdatePassword(false)} />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Password</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account password
          </p>
        </div>
        <Button variant="outline" onClick={() => setShowUpdatePassword(true)}>
          Update Password
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-2xl font-black">••••••••••</span>
        <span className="text-sm text-muted-foreground">Password is set</span>
      </div>
    </div>
  );
}
