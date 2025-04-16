import React, { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard, Users } from "lucide-react";
import { Restaurant } from "@/types/restaurants";
import { format } from "date-fns";

interface Props {
  restaurant?: Restaurant;
}
function RestaurantSummary({ restaurant }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                restaurant?.status === "ACTIVE"
                  ? "bg-green-100 text-green-800"
                  : restaurant?.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {restaurant?.status}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500">Since {format(new Date(restaurant?.createdAt ?? 0), "MMM dd, yyyy")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reservations</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+8 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscription</CardTitle>
            <CreditCard className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Standard</div>
            <p className="text-xs text-muted-foreground">Next billing: Apr 15, 2025</p>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
}

export default RestaurantSummary;
