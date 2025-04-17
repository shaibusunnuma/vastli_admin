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

import { selectRestaurantStats } from "@/lib/features/restaurants/restaurantSlice";
import { useAppSelector } from "@/lib/hooks";
import { Restaurant } from "@/types/restaurants";
import BasicInfo from "./basic-info";
import RestaurantSettings from "./restaurant-settings";

type Props = {
  restaurant: Restaurant;
  setMode: (mode: "view" | "edit") => void;
};

export default function EditRestaurant({ restaurant, setMode }: Props) {
  const [activeTab, setActiveTab] = useState("basic-info");

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
          <Button onClick={() => setMode("view")} variant="outline">
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="restaurant-settings">Restaurant Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info">
          <BasicInfo restaurant={restaurant} />
        </TabsContent>

        <TabsContent value="restaurant-settings">
          <RestaurantSettings restaurant={restaurant} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
