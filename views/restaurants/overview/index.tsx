import React from "react";

import DetailsCard from "@/views/restaurants/overview/details";
import OwnerInfo from "@/views/restaurants/overview/owner-info";
import MenuAndReservation from "@/views/restaurants/overview/menu-and-reservation";
import BillingInfo from "@/views/restaurants/overview/billing-info";
import { Restaurant } from "@/types/restaurants";

interface Props {
  restaurant?: Restaurant;
}
export default function Overview({ restaurant }: Props) {
  if (!restaurant) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailsCard restaurant={restaurant} />

      <OwnerInfo ownerId={restaurant?.ownerId} />

      <MenuAndReservation restaurant={restaurant} />

      <BillingInfo />
    </div>
  );
}
