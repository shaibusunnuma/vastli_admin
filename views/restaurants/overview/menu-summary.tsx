import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Restaurant } from "@/types/restaurants";

interface Props {
  restaurant?: Restaurant;
}

export default function MenuSummary({ restaurant }: Props) {
  if (!restaurant) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu Settings</CardTitle>
        <CardDescription>Restaurant menu and reservation settings</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500">Cuisine</dt>
              <dd className="mt-1 text-sm">{restaurant.cuisine}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500">Price Range</dt>
              <dd className="mt-1 text-sm">{restaurant.priceRange}</dd>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500">Seating Capacity</dt>
              <dd className="mt-1 text-sm">{restaurant.capacity} seats</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500">Reservation Interval</dt>
              <dd className="mt-1 text-sm">{restaurant.reservationSettings.timeSlotInterval} minutes</dd>
            </div>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
