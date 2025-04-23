"use client";
import { use, useState } from "react";
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
      {mode === "view" ? <RestaurantDetails restaurant={data} setMode={setMode} /> : <EditRestaurant restaurant={data} setMode={setMode} />}
    </div>
  );
}
