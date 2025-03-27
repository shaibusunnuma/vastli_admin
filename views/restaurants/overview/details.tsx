import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Restaurant } from "@/types/restaurants";

interface Props {
  restaurant?: Restaurant;
}

export default function DetailsCard({ restaurant }: Props) {
  if (!restaurant) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Restaurant Details</CardTitle>
        <CardDescription>Basic information about the restaurant</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="space-y-4">
          <div className="flex flex-col">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm">{restaurant?.description}</dd>
          </div>
          <div className="flex flex-col">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm">
              {restaurant?.address?.city}, {restaurant?.address?.state}, {restaurant?.address?.country}
            </dd>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm">{restaurant?.contact?.phone}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm">{restaurant?.contact?.email}</dd>
            </div>
          </div>
          <div className="flex flex-col">
            <dt className="text-sm font-medium text-gray-500">Website</dt>
            <dd className="mt-1 text-sm">
              <a href={restaurant?.webId} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {restaurant?.webId}
              </a>
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
