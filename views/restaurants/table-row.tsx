"use client";
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Store } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types/restaurants";
import { useGetCustomersQuery } from "@/lib/services/customers/customerApiSlice";
import { format } from "date-fns";
import { useGetReservationByFilterQuery } from "@/lib/services/reservations/reservationApiSlice";

export default function Row({ restaurant }: { restaurant: Restaurant }) {
  const {
    data: customers,
    error,
    isLoading,
  } = useGetCustomersQuery({
    filter: { restaurants: [restaurant.id], page: 1, limit: 10 },
  });
  const { data: reservations, isLoading: reservationsLoading } = useGetReservationByFilterQuery({
    restaurantId: restaurant.id,
  });

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
      <TableCell>{restaurant.address?.city}, {restaurant.address?.state}, {restaurant.address?.country}</TableCell>
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
      <TableCell>{customers?.data?.length}</TableCell>
      <TableCell>{reservations?.length}</TableCell>
      <TableCell>{format(new Date(restaurant.createdAt), "MMM dd, yyyy")}</TableCell>
      <TableCell className="text-right">
        <Link href={`/restaurants/${restaurant.id}`}>
          <Button variant="ghost" size="sm">
            View
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
}
