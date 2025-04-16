import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, Info, Ban, Utensils, DollarSign, Users, Phone, Mail, Globe, MapPin, CalendarClock } from "lucide-react";
import { UserStatus } from "@/types/users";
import { Restaurant } from "@/types/restaurants";

interface Props {
  restaurant?: Restaurant;
}

export default function DetailsCard({ restaurant }: Props) {
  if (!restaurant) return null;

  const getStatusIcon = (status: UserStatus) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircle2 className="h-3 w-3 text-green-600" />;
      case "PENDING":
        return <Info className="h-3 w-3 text-yellow-600" />;
      default:
        return <Ban className="h-3 w-3 text-gray-400" />;
    }
  };

  const formatAddress = (address: typeof restaurant.address) => {
    if (!address) return "No address provided";
    const parts = [address.street, address.city, address.state, address.country, address.postalCode].filter(Boolean);
    return parts.join(", ");
  };

  const operatingHoursEntries = restaurant.operatingHours
    ? Object.entries(restaurant.operatingHours).filter(([key]) =>
        ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].includes(key)
      )
    : [];

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="pb-3 flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={restaurant.logoUrl || restaurant.imageUrl} alt={restaurant.name} />
          <AvatarFallback>{restaurant.name?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-2xl flex items-center gap-2">
            {restaurant.name}
            {restaurant.status && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="capitalize flex items-center gap-1 px-2 py-1 text-xs">
                      {getStatusIcon(restaurant.status)}
                      {restaurant.status.toLowerCase()}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Status: {restaurant.status}</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </CardTitle>
          <CardDescription className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {restaurant.cuisine && (
              <span className="flex items-center gap-1.5">
                <Utensils className="h-4 w-4 text-muted-foreground" />
                {restaurant.cuisine}
              </span>
            )}
            {restaurant.priceRange && (
              <span className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                {restaurant.priceRange}
              </span>
            )}
            {restaurant.capacity !== undefined && restaurant.capacity !== null && (
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-muted-foreground" />
                {restaurant.capacity} seats
              </span>
            )}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Separator className="mb-4" />
        <ScrollArea className="h-auto max-h-[420px] pr-2">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {restaurant.description && (
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1 text-muted-foreground text-xs font-medium">
                    <Info className="h-4 w-4" /> Description
                  </div>
                  <div className="text-sm leading-relaxed">{restaurant.description}</div>
                </div>
              )}
              <div className="space-y-2">
                {restaurant.contact?.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{restaurant.contact.phone}</span>
                  </div>
                )}
                {restaurant.contact?.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{restaurant.contact.email}</span>
                  </div>
                )}
                {restaurant.webId && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={restaurant.webId.startsWith("http") ? restaurant.webId : `//${restaurant.webId}`}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {restaurant.webId}
                    </a>
                  </div>
                )}
              </div>
              {restaurant.address && (
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex flex-wrap items-center gap-x-2">
                    <span>{formatAddress(restaurant.address)}</span>
                    {restaurant.address.googleMapsLink && (
                      <a
                        href={restaurant.address.googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs"
                      >
                        (Map)
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {restaurant.operatingHours && (
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1 text-muted-foreground text-xs font-medium">
                    <CalendarClock className="h-4 w-4" /> Operating Hours
                  </div>
                  {restaurant.operatingHours.useIndividualDaySettings ? (
                    <ul className="text-sm space-y-1 pl-1">
                      {operatingHoursEntries.length > 0 ? (
                        operatingHoursEntries.map(([day, hours]) => (
                          <li key={day} className="capitalize grid grid-cols-[max-content_auto] gap-x-2">
                            <span className="font-medium">{day}:</span>
                            <span>{hours || "Closed"}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-muted-foreground">No specific day hours set.</li>
                      )}
                    </ul>
                  ) : (
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="font-medium">Weekdays:</span> {restaurant.operatingHours.weekdays || "Not specified"}
                      </div>
                      <div>
                        <span className="font-medium">Weekends:</span> {restaurant.operatingHours.weekends || "Not specified"}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                {restaurant.createdAt && <span>Created: {new Date(restaurant.createdAt).toLocaleString()}</span>}
                {restaurant.updatedAt && <span>Updated: {new Date(restaurant.updatedAt).toLocaleString()}</span>}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
