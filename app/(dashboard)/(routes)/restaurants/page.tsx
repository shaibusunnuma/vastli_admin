import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Search, Filter, Store } from "lucide-react";

const restaurants = [
  {
    id: "rest-001",
    name: "Bella Italia",
    location: "San Francisco, CA",
    status: "Active",
    customers: 342,
    reservations: 128,
    joinedDate: "Mar 15, 2025",
  },
  {
    id: "rest-002",
    name: "Sushi Delight",
    location: "New York, NY",
    status: "Active",
    customers: 287,
    reservations: 96,
    joinedDate: "Feb 28, 2025",
  },
  {
    id: "rest-003",
    name: "Taco Express",
    location: "Austin, TX",
    status: "Pending",
    customers: 0,
    reservations: 0,
    joinedDate: "Mar 24, 2025",
  },
  {
    id: "rest-004",
    name: "French Bistro",
    location: "Chicago, IL",
    status: "Active",
    customers: 156,
    reservations: 64,
    joinedDate: "Jan 12, 2025",
  },
  {
    id: "rest-005",
    name: "Spice Garden",
    location: "Seattle, WA",
    status: "Inactive",
    customers: 89,
    reservations: 0,
    joinedDate: "Dec 5, 2024",
  },
];

export default function RestaurantsPage() {
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
          <CardDescription>
            Manage all restaurant accounts in the Vastli platform
          </CardDescription>
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
              {restaurants.map((restaurant) => (
                <TableRow key={restaurant.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="mr-2 h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center">
                        <Store className="h-4 w-4 text-violet-500" />
                      </div>
                      {restaurant.name}
                    </div>
                  </TableCell>
                  <TableCell>{restaurant.location}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      restaurant.status === "Active" 
                        ? "bg-green-100 text-green-800" 
                        : restaurant.status === "Pending" 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {restaurant.status}
                    </span>
                  </TableCell>
                  <TableCell>{restaurant.customers}</TableCell>
                  <TableCell>{restaurant.reservations}</TableCell>
                  <TableCell>{restaurant.joinedDate}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/restaurants/${restaurant.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
