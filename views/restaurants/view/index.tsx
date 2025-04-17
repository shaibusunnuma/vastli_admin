"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, MoreHorizontal, Store } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Overview from "./overview";
import Customers from "./customers";
import Reservations from "./reservations";
import RestaurantSummary from "./restaurant-summary";
import UsersTab from "./users";
import { selectRestaurantStats } from "@/lib/features/restaurants/restaurantSlice";
import { useAppSelector } from "@/lib/hooks";
import { Restaurant } from "@/types/restaurants";

type Props = {
  restaurant: Restaurant;
  setMode: (mode: "view" | "edit") => void;
};

export default function RestaurantDetails({ restaurant, setMode }: Props) {
  const [activeTab, setActiveTab] = useState("overview");
  const stats = useAppSelector(selectRestaurantStats);
  const customerStats = stats?.customerStats;
  const reservationStats = stats?.reservationStats;

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center">
            <Store className="h-6 w-6 text-violet-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{restaurant?.name}</h1>
            <p className="text-gray-500">
              {restaurant?.cuisine} • {restaurant?.address?.city}, {restaurant?.address?.state}, {restaurant?.address?.country}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setMode("edit")} variant="outline">
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
      <RestaurantSummary restaurant={restaurant} customerStats={customerStats} reservationStats={reservationStats} />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Overview restaurant={restaurant} />
        </TabsContent>

        <TabsContent value="customers">
          <Customers restaurant={restaurant} />
        </TabsContent>

        <TabsContent value="reservations">
          <Reservations restaurant={restaurant} />
        </TabsContent>

        <TabsContent value="users">
          <UsersTab accountId={restaurant?.accountId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
