import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Utensils, DollarSign, Users, CalendarClock, Settings2, Info, CheckCircle2, Ban } from "lucide-react";
import { Restaurant } from "@/types/restaurants";

interface Props {
  restaurant?: Restaurant;
}

export default function MenuAndReservation({ restaurant }: Props) {
  if (!restaurant) return null;
  return (
    <Card className="border-0">
      <CardHeader className="pb-3 flex flex-row items-center gap-4">
        <Settings2 className="h-6 w-6 text-muted-foreground" />
        <div className="flex-1">
          <CardTitle className="text-xl flex items-center gap-2">
            Menu & Reservation
          </CardTitle>
          <CardDescription className="mt-1 flex items-center gap-3">
            <Utensils className="h-4 w-4 text-muted-foreground" />
            {restaurant.cuisine}
            <DollarSign className="h-4 w-4 ml-3 text-muted-foreground" />
            {restaurant.priceRange}
            <Users className="h-4 w-4 ml-3 text-muted-foreground" />
            {restaurant.capacity} seats
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Separator className="mb-4" />
        <div className="flex flex-col gap-4">
          {/* Reservation Settings Section */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground text-xs font-semibold">
              <CalendarClock className="h-4 w-4" /> Reservation Settings
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <TooltipProvider>
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Badge variant="secondary">Self-Booking</Badge>:
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Allow customers to manage their own bookings</TooltipContent>
                  </Tooltip>
                  <span>{restaurant.reservationSettings?.allowSelfBookingManagement ? <span className="text-green-700 font-medium">Yes</span> : <span className="text-red-700 font-medium">No</span>}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Badge variant="secondary">Interval</Badge>:
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Time slot interval in minutes</TooltipContent>
                  </Tooltip>
                  <span>{restaurant.reservationSettings?.timeSlotInterval} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Badge variant="secondary">Max Advance</Badge>:
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Maximum days in advance a reservation can be made</TooltipContent>
                  </Tooltip>
                  <span>{restaurant.reservationSettings?.maxBookingDaysInAdvance} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Badge variant="secondary">Guests/Reservation</Badge>:
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Allowed guest range per reservation</TooltipContent>
                  </Tooltip>
                  <span>{restaurant.reservationSettings?.minGuestsPerReservation} - {restaurant.reservationSettings?.maxGuestsPerReservation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Badge variant="secondary">Auto-Confirm</Badge>:
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Reservations are auto-confirmed if enabled</TooltipContent>
                  </Tooltip>
                  <span>{restaurant.reservationSettings?.autoConfirmReservations ? <span className="text-green-700 font-medium">Yes</span> : <span className="text-red-700 font-medium">No</span>}</span>
                </div>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
