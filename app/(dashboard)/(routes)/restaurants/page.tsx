"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Search, Filter } from "lucide-react";
import { useGetRestaurantsQuery } from "@/lib/services/restaurants/restaurantApiSlice";
import Row from "@/views/restaurants/table-row";

export default function RestaurantsPage() {
  const { data: restaurants } = useGetRestaurantsQuery({});

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Restaurants</h1>
        <Link href="/restaurants/onboard">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Restaurant
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Restaurant Management</CardTitle>
          <CardDescription>Manage all restaurant accounts in the Vastli platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search restaurants..."
                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Restaurant</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Customers</TableHead>
                <TableHead>Reservations</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {restaurants?.map((restaurant) => (
                <Row restaurant={restaurant} key={restaurant.id} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
