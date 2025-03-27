"use client";
import { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, CreditCard, Edit, MoreHorizontal, Store, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetRestaurantByIdQuery } from "@/lib/services/restaurants/restaurantApiSlice";
import { format } from "date-fns";
import Overview from "@/views/restaurants/overview";
import Customers from "@/views/restaurants/customers";
import Reservations from "@/views/restaurants/reservations";
import Billing from "@/views/restaurants/billing";

export default function RestaurantDetailPage({ params }: { params: Promise<{ restaurantId: string }> }) {
  const [activeTab, setActiveTab] = useState("overview");
  const { restaurantId } = use(params);
  const { data } = useGetRestaurantByIdQuery(restaurantId, { skip: !restaurantId });

  const restaurant = {
    plan: "Standard",
    billingCycle: "Monthly",
    nextBillingDate: "Apr 15, 2025",
    paymentMethod: "Visa ending in 4242",
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Link href="/restaurants">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Restaurants
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center">
            <Store className="h-6 w-6 text-violet-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{data?.name}</h1>
            <p className="text-gray-500">
              {data?.cuisine} • {data?.address?.city}, {data?.address?.state}, {data?.address?.country}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Reset Password</DropdownMenuItem>
              <DropdownMenuItem>Send Welcome Email</DropdownMenuItem>
              <DropdownMenuItem>Export Data</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Deactivate Account</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                data?.status === "ACTIVE"
                  ? "bg-green-100 text-green-800"
                  : data?.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {data?.status}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500">Since {format(new Date(data?.createdAt ?? 0), "MMM dd, yyyy")}</div>
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
            <div className="text-lg font-bold">{restaurant.plan}</div>
            <p className="text-xs text-muted-foreground">Next billing: {restaurant.nextBillingDate}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Overview restaurant={data} />
        </TabsContent>

        <TabsContent value="customers">
          <Customers />
        </TabsContent>

        <TabsContent value="reservations">
          <Reservations restaurant={data} />
        </TabsContent>

        <TabsContent value="billing">
          <Billing />
        </TabsContent>
      </Tabs>
    </div>
  );
}
