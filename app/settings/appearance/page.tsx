"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function AppearancePage() {
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Appearance</h1>
          <p className="text-muted-foreground">Customize the look and feel of your dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Display Preferences</CardTitle>
            <CardDescription>Configure how information is displayed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Compact Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Use smaller spacing and fonts for a denser layout
                </p>
              </div>
              <span className="text-sm text-muted-foreground">Coming soon</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Timezone</Label>
                <p className="text-sm text-muted-foreground">
                  Set your preferred timezone for dates and times
                </p>
              </div>
              <span className="text-sm text-muted-foreground">Coming soon</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
