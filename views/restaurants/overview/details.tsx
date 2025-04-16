import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Phone, Mail, Globe, Users, CalendarClock, DollarSign, Utensils, Info, User2, CheckCircle2, Ban } from "lucide-react";
import { Restaurant } from "@/types/restaurants";

interface Props {
  restaurant?: Restaurant;
}

export default function DetailsCard({ restaurant }: Props) {
  if (!restaurant) return null;
  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="pb-3 flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={restaurant.logoUrl || restaurant.imageUrl} alt={restaurant.name} />
          <AvatarFallback>{restaurant.name?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-2xl flex items-center gap-2">
            {restaurant.name}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="capitalize flex items-center gap-1 px-2 py-1 text-xs">
                    {restaurant.status === "ACTIVE" && <CheckCircle2 className="h-3 w-3 text-green-600" />}
                    {restaurant.status === "PENDING" && <Info className="h-3 w-3 text-yellow-600" />}
                    {restaurant.status !== "ACTIVE" && restaurant.status !== "PENDING" && <Ban className="h-3 w-3 text-gray-400" />}
                    {restaurant.status}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <span>Status: {restaurant.status}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <CardDescription className="mt-1 flex items-center gap-2">
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
        <ScrollArea className="h-auto max-h-[420px] pr-2">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Description, Contact, Address, Website */}
            <div className="space-y-4">
              {restaurant.description && (
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1 text-muted-foreground text-xs">
                    <Info className="h-4 w-4" /> Description
                  </div>
                  <div className="text-sm leading-relaxed">{restaurant.description}</div>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Phone className="h-4 w-4" />
                  <span>{restaurant.contact?.phone}</span>
                </div>
                {restaurant.contact?.email && (
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Mail className="h-4 w-4" />
                    <span>{restaurant.contact.email}</span>
                  </div>
                )}
                {restaurant.webId && (
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Globe className="h-4 w-4" />
                    <a href={restaurant.webId} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{restaurant.webId}</a>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-xs mt-2">
                <MapPin className="h-4 w-4" />
                <span>
                  {restaurant.address?.street && <>{restaurant.address.street}, </>}
                  {restaurant.address?.city}, {restaurant.address?.state}, {restaurant.address?.country}
                  {restaurant.address?.postalCode && <>, {restaurant.address.postalCode}</>}
                </span>
                {restaurant.address?.googleMapsLink && (
                  <a href={restaurant.address.googleMapsLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">Map</a>
                )}
              </div>
            </div>
            {/* Right: Reservation, Hours, Meta */}
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground text-xs">
                  <CalendarClock className="h-4 w-4" /> Reservation Settings
                </div>
                <ul className="text-xs pl-4 list-disc">
                  <li>Allow Self-Booking: {restaurant.reservationSettings?.allowSelfBookingManagement ? "Yes" : "No"}</li>
                  <li>Time Slot Interval: {restaurant.reservationSettings?.timeSlotInterval} min</li>
                  <li>Max Booking Days: {restaurant.reservationSettings?.maxBookingDaysInAdvance}</li>
                  <li>Guests/Reservation: {restaurant.reservationSettings?.minGuestsPerReservation} - {restaurant.reservationSettings?.maxGuestsPerReservation}</li>
                  <li>Auto-Confirm: {restaurant.reservationSettings?.autoConfirmReservations ? "Yes" : "No"}</li>
                </ul>
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1 text-muted-foreground text-xs">
                  <CalendarClock className="h-4 w-4" /> Operating Hours
                </div>
                {restaurant.operatingHours?.useIndividualDaySettings ? (
                  <ul className="text-xs pl-4 list-disc">
                    {Object.entries(restaurant.operatingHours)
                      .filter(([key]) => ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].includes(key))
                      .map(([day, hours]) => (
                        <li key={day} className="capitalize">{day}: {hours}</li>
                      ))}
                  </ul>
                ) : (
                  <div className="text-xs">
                    <span>Weekdays: {restaurant.operatingHours?.weekdays}</span><br />
                    <span>Weekends: {restaurant.operatingHours?.weekends}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                <span>Created: {restaurant.createdAt && new Date(restaurant.createdAt).toLocaleString()}</span>
                <span>Updated: {restaurant.updatedAt && new Date(restaurant.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
