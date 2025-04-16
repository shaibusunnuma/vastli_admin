"use client";
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { setRestaurantStats } from "@/lib/features/restaurants/restaurantSlice";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types/restaurants";
import { useGetCustomersStatsQuery } from "@/lib/services/customers/customerApiSlice";
import { format } from "date-fns";
import { useGetReservationStatsQuery } from "@/lib/services/reservations/reservationApiSlice";
import { useAppDispatch } from "@/lib/hooks";

export default function Row({ restaurant }: { restaurant: Restaurant }) {
  const { data: customerStats } = useGetCustomersStatsQuery({
    restaurantId: restaurant.id,
  });

  const { data: reservationStats } = useGetReservationStatsQuery({
    restaurantId: restaurant.id,
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleView = () => {
    dispatch(
      setRestaurantStats({
        customerStats,
        reservationStats,
      })
    );
    router.push(`/restaurants/${restaurant.id}`);
  };

  return (
    <TableRow key={restaurant.id}>
      <TableCell className="font-medium">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center">
            <Store className="h-4 w-4 text-violet-500" />
          </div>
          {restaurant.name}
        </div>
      </TableCell>
      <TableCell>
        {restaurant.address?.city}, {restaurant.address?.state}, {restaurant.address?.country}
      </TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            restaurant.status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : restaurant.status === "PENDING"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {restaurant.status}
        </span>
      </TableCell>
      <TableCell>{customerStats?.total}</TableCell>
      <TableCell>{reservationStats?.total}</TableCell>
      <TableCell>{format(new Date(restaurant.createdAt), "MMM dd, yyyy")}</TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm" onClick={handleView}>
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
