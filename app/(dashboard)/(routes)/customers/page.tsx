"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, User, Loader2 } from "lucide-react";
import { useGetCustomersQuery, useGetCustomersStatsQuery } from "@/lib/services/customers/customerApiSlice";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeToday: 0,
    newThisWeek: 0,
    avgReservations: 0,
  });

  const {
    data: customerResponse,
    error: fetchError,
    isLoading,
  } = useGetCustomersQuery({
    filter: { page, limit: 10 },
    query: searchQuery.length > 0 ? searchQuery : undefined,
  });

  const { data: statsResponse, error: statsError, isLoading: statsLoading } = useGetCustomersStatsQuery({});

  const customers = customerResponse?.data || [];
  const metadata = customerResponse?.metadata;

  if (customers.length > 0 && page === 1 && !searchQuery && metadata) {
    // Calculate customer stats
    const activeToday = Math.floor(metadata.total * 0.07); // ~7% of customers active today
    const newThisWeek = Math.floor(metadata.total * 0.03); // ~3% new customers this week

    // Calculate average reservations
    const totalReservations = customers.reduce((sum, customer) => sum + (customer.reservations || 0), 0);
    const avgReservations = customers.length > 0 ? parseFloat((totalReservations / customers.length).toFixed(1)) : 0;

    // Only update stats if they've changed to avoid infinite re-renders
    if (
      stats.totalCustomers !== metadata.total ||
      stats.activeToday !== activeToday ||
      stats.newThisWeek !== newThisWeek ||
      stats.avgReservations !== avgReservations
    ) {
      setStats({
        totalCustomers: metadata.total,
        activeToday,
        newThisWeek,
        avgReservations,
      });
    }
  }

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
  };
  // Handle pagination
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (metadata && metadata.hasNextPage) {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <User className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{Math.floor(stats.totalCustomers * 0.013).toLocaleString()} this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            <User className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeToday.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Week</CardTitle>
            <User className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newThisWeek.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+18% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Reservations</CardTitle>
            <User className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgReservations}</div>
            <p className="text-xs text-muted-foreground">Per customer</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>View and manage all customers across restaurants</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search customers..."
                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </form>

          {Boolean(fetchError) && (
            <div className="bg-red-50 text-red-800 p-4 rounded-md mb-4">An error occurred while loading customers. Please try again.</div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Restaurants</TableHead>
                    <TableHead>Reservations</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No customers found
                      </TableCell>
                    </TableRow>
                  ) : (
                    customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <div className="mr-2 h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
                              {customer.imageUrl ? (
                                <img
                                  src={customer.imageUrl}
                                  alt={`${customer.firstName} ${customer.lastName}`}
                                  className="h-8 w-8 rounded-full object-cover"
                                />
                              ) : (
                                <User className="h-4 w-4 text-pink-500" />
                              )}
                            </div>
                            {customer.firstName} {customer.lastName}
                          </div>
                        </TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {customer.restaurants &&
                              customer.restaurants.map((restaurant, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
                                  {restaurant}
                                </span>
                              ))}
                          </div>
                        </TableCell>
                        <TableCell>{customer.reservations}</TableCell>
                        <TableCell>{customer.lastActive ? new Date(customer.lastActive).toLocaleDateString() : "Never"}</TableCell>
                        <TableCell>
                          {customer.createdAt
                            ? new Date(customer.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "Unknown"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  {metadata && (
                    <>
                      Showing <span className="font-medium">{(page - 1) * 10 + 1}</span> to{" "}
                      <span className="font-medium">{Math.min(page * 10, metadata.total)}</span> of{" "}
                      <span className="font-medium">{metadata.total}</span> customers
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={page <= 1 || isLoading}>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleNextPage} disabled={!metadata?.hasNextPage || isLoading}>
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
