"use client";
import { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, MoreHorizontal, Store } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetRestaurantByIdQuery } from "@/lib/services/restaurants/restaurantApiSlice";
import Overview from "@/views/restaurants/overview";
import Customers from "@/views/restaurants/customers";
import Reservations from "@/views/restaurants/reservations";
import Billing from "@/views/restaurants/billing";
import RestaurantSummary from "@/views/restaurants/restaurant-summary";
import UsersTab from "@/views/restaurants/users";
import { selectRestaurantStats } from "@/lib/features/restaurants/restaurantSlice";
import { useAppSelector } from "@/lib/hooks";

export default function RestaurantDetailPage({ params }: { params: Promise<{ restaurantId: string }> }) {
  const [activeTab, setActiveTab] = useState("overview");
  const { restaurantId } = use(params);
  const { data } = useGetRestaurantByIdQuery(restaurantId, { skip: !restaurantId });
  const stats = useAppSelector(selectRestaurantStats);
  const customerStats = stats?.customerStats;
  const reservationStats = stats?.reservationStats;

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

      <RestaurantSummary 
        restaurant={data}
        customerStats={customerStats}
        reservationStats={reservationStats}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
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

        <TabsContent value="users">
          <UsersTab accountId={data?.accountId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
