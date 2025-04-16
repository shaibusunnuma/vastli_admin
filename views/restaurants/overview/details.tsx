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
        <CardDescription>Comprehensive information about the restaurant</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image/Logo */}
          <div className="flex flex-col items-center md:items-start gap-2 min-w-[120px]">
            {restaurant?.logoUrl && (
              <img src={restaurant.logoUrl} alt="Logo" className="h-16 w-16 object-contain rounded-full border" />
            )}
            {restaurant?.imageUrl && (
              <img src={restaurant.imageUrl} alt="Restaurant" className="h-24 w-32 object-cover rounded-lg border" />
            )}
            <span className={`mt-2 px-2 py-1 rounded-full text-xs font-medium ${
              restaurant?.status === "ACTIVE"
                ? "bg-green-100 text-green-800"
                : restaurant?.status === "PENDING"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}>
              {restaurant?.status}
            </span>
          </div>

          <dl className="flex-1 space-y-4">
            {/* Name, Cuisine, Price, Capacity */}
            <div className="flex flex-col md:flex-row md:gap-8">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-base font-semibold">{restaurant?.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Cuisine</dt>
                <dd className="mt-1 text-sm">{restaurant?.cuisine}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Price Range</dt>
                <dd className="mt-1 text-sm">{restaurant?.priceRange}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Capacity</dt>
                <dd className="mt-1 text-sm">{restaurant?.capacity}</dd>
              </div>
            </div>

            {/* Description */}
            {restaurant?.description && (
              <div className="flex flex-col">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm">{restaurant.description}</dd>
              </div>
            )}

            {/* Address */}
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm">
                {restaurant?.address?.street && <>{restaurant.address.street}, </>}
                {restaurant?.address?.city}, {restaurant?.address?.state}, {restaurant?.address?.country}
                {restaurant?.address?.postalCode && <>, {restaurant.address.postalCode}</>}
                {restaurant?.address?.googleMapsLink && (
                  <>
                    <br />
                    <a href={restaurant.address.googleMapsLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View on Google Maps
                    </a>
                  </>
                )}
              </dd>
            </div>

            {/* Contact Info */}
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

            {/* Website */}
            {restaurant?.webId && (
              <div className="flex flex-col">
                <dt className="text-sm font-medium text-gray-500">Website</dt>
                <dd className="mt-1 text-sm">
                  <a href={restaurant.webId} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {restaurant.webId}
                  </a>
                </dd>
              </div>
            )}

            {/* Reservation Settings */}
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500">Reservation Settings</dt>
              <dd className="mt-1 text-sm">
                <ul className="list-disc ml-4">
                  <li>Allow Self-Booking Management: {restaurant?.reservationSettings?.allowSelfBookingManagement ? "Yes" : "No"}</li>
                  <li>Time Slot Interval: {restaurant?.reservationSettings?.timeSlotInterval} min</li>
                  <li>Max Booking Days In Advance: {restaurant?.reservationSettings?.maxBookingDaysInAdvance}</li>
                  <li>Guests Per Reservation: {restaurant?.reservationSettings?.minGuestsPerReservation} - {restaurant?.reservationSettings?.maxGuestsPerReservation}</li>
                  <li>Auto-Confirm Reservations: {restaurant?.reservationSettings?.autoConfirmReservations ? "Yes" : "No"}</li>
                </ul>
              </dd>
            </div>

            {/* Operating Hours */}
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500">Operating Hours</dt>
              <dd className="mt-1 text-sm">
                {restaurant?.operatingHours?.useIndividualDaySettings ? (
                  <ul className="list-disc ml-4">
                    {Object.entries(restaurant.operatingHours)
                      .filter(([key]) => ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].includes(key))
                      .map(([day, hours]) => (
                        <li key={day} className="capitalize">{day}: {hours}</li>
                      ))}
                  </ul>
                ) : (
                  <>
                    <div>Weekdays: {restaurant?.operatingHours?.weekdays}</div>
                    <div>Weekends: {restaurant?.operatingHours?.weekends}</div>
                  </>
                )}
              </dd>
            </div>

            {/* Created/Updated */}
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500">Created At</dt>
              <dd className="mt-1 text-sm">{restaurant?.createdAt && new Date(restaurant.createdAt).toLocaleString()}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
              <dd className="mt-1 text-sm">{restaurant?.updatedAt && new Date(restaurant.updatedAt).toLocaleString()}</dd>
            </div>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
}
