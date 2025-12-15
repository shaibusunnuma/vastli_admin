"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PasswordSection } from "@/views/account/password-section";
import { AccountSection } from "@/views/account/account-section";

export default function SecurityPage() {
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Security</h1>
          <p className="text-muted-foreground">Manage your password and account security</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your password and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <PasswordSection />
            <Separator />
            <AccountSection />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
