"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/lib/AuthProvider";
import { UpdateProfileForm } from "./update-profile-form";

export function UserProfile() {
  const { user } = useUser();
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.[0] || "";
    const last = lastName?.[0] || "";
    return (first + last).toUpperCase() || "A";
  };

  if (showUpdateProfile) {
    return (
      <UpdateProfileForm closeForm={() => setShowUpdateProfile(false)} />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Profile</h3>
        <Button variant="outline" onClick={() => setShowUpdateProfile(true)}>
          Update Profile
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user?.imageUrl || ""} alt="Profile photo" />
          <AvatarFallback className="text-lg">
            {getInitials(user?.firstName, user?.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h4 className="text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </h4>
            <Badge variant="secondary">Admin</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}
