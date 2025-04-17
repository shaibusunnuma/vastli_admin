import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types/restaurants";
import { useGetCustomersQuery } from "@/lib/services/customers/customerApiSlice";


interface Props {
  restaurant?: Restaurant;
}
export default function Customers({ restaurant }: Props) {
  const {
    data: customers,
    error,
    isLoading,
  } = useGetCustomersQuery(
    {
      filter: { restaurantId: restaurant?.id, page: 1, limit: 10 },
    },
    { skip: !restaurant }
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Management</CardTitle>
        <CardDescription>View and manage customers for {restaurant?.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search customers..."
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
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Reservations</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers?.data.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">
                  {customer.firstName} {customer.lastName}
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.reservations}</TableCell>
                <TableCell>{customer.lastVisit}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
