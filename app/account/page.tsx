"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserProfile } from "@/views/account/user-profile";
import { EmailAddresses } from "@/views/account/email-addresses";
import { PhoneNumbers } from "@/views/account/phone-numbers";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and contact details</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <UserProfile />
            <Separator />
            <EmailAddresses />
            <Separator />
            <PhoneNumbers />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
