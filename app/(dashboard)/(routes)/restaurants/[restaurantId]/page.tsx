"use client";
import { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useGetRestaurantByIdQuery } from "@/lib/services/restaurants/restaurantApiSlice";
import RestaurantDetails from "@/views/restaurants/view";
import EditRestaurant from "@/views/restaurants/edit";

export default function RestaurantDetailPage({ params }: { params: Promise<{ restaurantId: string }> }) {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const { restaurantId } = use(params);
  const { data } = useGetRestaurantByIdQuery(restaurantId, { skip: !restaurantId });
  if (!data) return null;

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
      {mode === "view" ? <RestaurantDetails restaurant={data} setMode={setMode} /> : <EditRestaurant restaurant={data} setMode={setMode} />}
    </div>
  );
}
