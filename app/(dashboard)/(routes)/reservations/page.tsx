import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Download, Calendar, Clock, User, Store } from "lucide-react";

const reservations = [
  {
    id: "res-001",
    customer: "Alice Johnson",
    restaurant: "Bella Italia",
    date: "Mar 28, 2025",
    time: "7:00 PM",
    party: 4,
    status: "Confirmed",
    specialRequests: "Window seat if possible",
  },
  {
    id: "res-002",
    customer: "Bob Smith",
    restaurant: "Sushi Delight",
    date: "Mar 28, 2025",
    time: "6:30 PM",
    party: 2,
    status: "Confirmed",
    specialRequests: "",
  },
  {
    id: "res-003",
    customer: "Carol Williams",
    restaurant: "Bella Italia",
    date: "Mar 28, 2025",
    time: "8:00 PM",
    party: 6,
    status: "Pending",
    specialRequests: "Birthday celebration",
  },
  {
    id: "res-004",
    customer: "David Brown",
    restaurant: "French Bistro",
    date: "Mar 28, 2025",
    time: "7:30 PM",
    party: 3,
    status: "Confirmed",
    specialRequests: "Allergic to nuts",
  },
  {
    id: "res-005",
    customer: "Eve Davis",
    restaurant: "Taco Express",
    date: "Mar 28, 2025",
    time: "6:00 PM",
    party: 2,
    status: "Cancelled",
    specialRequests: "",
  },
  {
    id: "res-006",
    customer: "Frank Miller",
    restaurant: "Spice Garden",
    date: "Mar 29, 2025",
    time: "7:00 PM",
    party: 5,
    status: "Confirmed",
    specialRequests: "Vegetarian options needed",
  },
  {
    id: "res-007",
    customer: "Grace Wilson",
    restaurant: "Bella Italia",
    date: "Mar 29, 2025",
    time: "8:30 PM",
    party: 2,
    status: "Confirmed",
    specialRequests: "Anniversary celebration",
  },
  {
    id: "res-008",
    customer: "Henry Taylor",
    restaurant: "Sushi Delight",
    date: "Mar 29, 2025",
    time: "6:45 PM",
    party: 4,
    status: "Pending",
    specialRequests: "",
  },
];

export default function ReservationsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reservations</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Reservations
            </CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
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
              Pending Reservations
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">
              Need confirmation
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cancellations Today
            </CardTitle>
            <Calendar className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              3.3% cancellation rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Party Size
            </CardTitle>
            <User className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8</div>
            <p className="text-xs text-muted-foreground">
              Persons per reservation
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Today's Reservations</CardTitle>
              <CardDescription>
                Manage reservations for today across all restaurants
              </CardDescription>
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
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Party Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Special Requests</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.filter(r => r.date === "Mar 28, 2025").map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="mr-2 h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-pink-500" />
                          </div>
                          {reservation.customer}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="mr-2 h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center">
                            <Store className="h-3 w-3 text-violet-500" />
                          </div>
                          {reservation.restaurant}
                        </div>
                      </TableCell>
                      <TableCell>{reservation.time}</TableCell>
                      <TableCell>{reservation.party}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reservation.status === "Confirmed" 
                            ? "bg-green-100 text-green-800" 
                            : reservation.status === "Pending" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {reservation.status}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {reservation.specialRequests || "-"}
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
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Reservations</CardTitle>
              <CardDescription>
                Manage future reservations across all restaurants
              </CardDescription>
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
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Party Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.filter(r => r.date === "Mar 29, 2025").map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="mr-2 h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-pink-500" />
                          </div>
                          {reservation.customer}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="mr-2 h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center">
                            <Store className="h-3 w-3 text-violet-500" />
                          </div>
                          {reservation.restaurant}
                        </div>
                      </TableCell>
                      <TableCell>{reservation.date}</TableCell>
                      <TableCell>{reservation.time}</TableCell>
                      <TableCell>{reservation.party}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reservation.status === "Confirmed" 
                            ? "bg-green-100 text-green-800" 
                            : reservation.status === "Pending" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
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
        </TabsContent>
        
        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>Past Reservations</CardTitle>
              <CardDescription>
                View history of past reservations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8">
                <p className="text-gray-500">Past reservations will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cancelled">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Reservations</CardTitle>
              <CardDescription>
                View cancelled reservations
              </CardDescription>
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
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Party Size</TableHead>
                    <TableHead>Cancellation Reason</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.filter(r => r.status === "Cancelled").map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="mr-2 h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-pink-500" />
                          </div>
                          {reservation.customer}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="mr-2 h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center">
                            <Store className="h-3 w-3 text-violet-500" />
                          </div>
                          {reservation.restaurant}
                        </div>
                      </TableCell>
                      <TableCell>{reservation.date}</TableCell>
                      <TableCell>{reservation.time}</TableCell>
                      <TableCell>{reservation.party}</TableCell>
                      <TableCell>Customer request</TableCell>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
