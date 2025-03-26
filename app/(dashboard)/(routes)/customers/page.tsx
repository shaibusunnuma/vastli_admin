import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, User } from "lucide-react";

const customers = [
  {
    id: "cust-001",
    name: "Alice Johnson",
    email: "alice@example.com",
    restaurants: ["Bella Italia", "French Bistro"],
    reservations: 15,
    lastActive: "Mar 24, 2025",
    joinedDate: "Jan 10, 2025",
  },
  {
    id: "cust-002",
    name: "Bob Smith",
    email: "bob@example.com",
    restaurants: ["Sushi Delight", "Spice Garden"],
    reservations: 8,
    lastActive: "Mar 22, 2025",
    joinedDate: "Feb 5, 2025",
  },
  {
    id: "cust-003",
    name: "Carol Williams",
    email: "carol@example.com",
    restaurants: ["Bella Italia", "Taco Express", "French Bistro"],
    reservations: 23,
    lastActive: "Mar 25, 2025",
    joinedDate: "Dec 12, 2024",
  },
  {
    id: "cust-004",
    name: "David Brown",
    email: "david@example.com",
    restaurants: ["Sushi Delight"],
    reservations: 5,
    lastActive: "Mar 18, 2025",
    joinedDate: "Mar 1, 2025",
  },
  {
    id: "cust-005",
    name: "Eve Davis",
    email: "eve@example.com",
    restaurants: ["Bella Italia", "French Bistro"],
    reservations: 12,
    lastActive: "Mar 23, 2025",
    joinedDate: "Jan 20, 2025",
  },
  {
    id: "cust-006",
    name: "Frank Miller",
    email: "frank@example.com",
    restaurants: ["Taco Express"],
    reservations: 3,
    lastActive: "Mar 20, 2025",
    joinedDate: "Feb 28, 2025",
  },
  {
    id: "cust-007",
    name: "Grace Wilson",
    email: "grace@example.com",
    restaurants: ["Bella Italia", "Sushi Delight", "French Bistro"],
    reservations: 18,
    lastActive: "Mar 25, 2025",
    joinedDate: "Nov 15, 2024",
  },
];

export default function CustomersPage() {
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
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <User className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,546</div>
            <p className="text-xs text-muted-foreground">
              +156 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Today
            </CardTitle>
            <User className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">842</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New This Week
            </CardTitle>
            <User className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">328</div>
            <p className="text-xs text-muted-foreground">
              +18% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Reservations
            </CardTitle>
            <User className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-xs text-muted-foreground">
              Per customer
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>
            View and manage all customers across restaurants
          </CardDescription>
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
                <TableHead>Restaurants</TableHead>
                <TableHead>Reservations</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="mr-2 h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-pink-500" />
                      </div>
                      {customer.name}
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {customer.restaurants.map((restaurant, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs"
                        >
                          {restaurant}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{customer.reservations}</TableCell>
                  <TableCell>{customer.lastActive}</TableCell>
                  <TableCell>{customer.joinedDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{customers.length}</span> of <span className="font-medium">100</span> customers
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
