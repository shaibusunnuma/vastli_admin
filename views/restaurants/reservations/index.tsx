import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types/restaurants";

interface Props {
  restaurant?: Restaurant;
}

export default function Reservations({ restaurant }: Props) {
  const reservations = [
    { id: "res-001", customer: "Alice Johnson", date: "Mar 28, 2025", time: "7:00 PM", party: 4, status: "Confirmed" },
    { id: "res-002", customer: "Bob Smith", date: "Mar 29, 2025", time: "6:30 PM", party: 2, status: "Confirmed" },
    { id: "res-003", customer: "Carol Williams", date: "Mar 27, 2025", time: "8:00 PM", party: 6, status: "Pending" },
    { id: "res-004", customer: "David Brown", date: "Mar 30, 2025", time: "7:30 PM", party: 3, status: "Confirmed" },
    { id: "res-005", customer: "Eve Davis", date: "Mar 31, 2025", time: "6:00 PM", party: 2, status: "Cancelled" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservation Management</CardTitle>
        <CardDescription>View and manage reservations for {restaurant?.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search reservations..."
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
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Party Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className="font-medium">{reservation.customer}</TableCell>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.time}</TableCell>
                <TableCell>{reservation.party}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      reservation.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : reservation.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {reservation.status}
                  </span>
                </TableCell>
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
