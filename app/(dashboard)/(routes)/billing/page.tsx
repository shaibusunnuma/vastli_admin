import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Download, CreditCard, DollarSign, TrendingUp, Store } from "lucide-react";

const billingAccounts = [
  {
    id: "bill-001",
    restaurant: "Bella Italia",
    plan: "Standard",
    amount: "$99/month",
    status: "Active",
    nextBilling: "Apr 15, 2025",
    paymentMethod: "Visa ending in 4242",
    lastPayment: "Mar 15, 2025",
  },
  {
    id: "bill-002",
    restaurant: "Sushi Delight",
    plan: "Premium",
    amount: "$199/month",
    status: "Active",
    nextBilling: "Apr 10, 2025",
    paymentMethod: "Mastercard ending in 5678",
    lastPayment: "Mar 10, 2025",
  },
  {
    id: "bill-003",
    restaurant: "Taco Express",
    plan: "Basic",
    amount: "$49/month",
    status: "Active",
    nextBilling: "Apr 24, 2025",
    paymentMethod: "American Express ending in 9012",
    lastPayment: "Mar 24, 2025",
  },
  {
    id: "bill-004",
    restaurant: "French Bistro",
    plan: "Standard",
    amount: "$99/month",
    status: "Active",
    nextBilling: "Apr 12, 2025",
    paymentMethod: "Visa ending in 3456",
    lastPayment: "Mar 12, 2025",
  },
  {
    id: "bill-005",
    restaurant: "Spice Garden",
    plan: "Basic",
    amount: "$49/month",
    status: "Overdue",
    nextBilling: "Mar 5, 2025",
    paymentMethod: "Mastercard ending in 7890",
    lastPayment: "Feb 5, 2025",
  },
];

const transactions = [
  {
    id: "trans-001",
    restaurant: "Bella Italia",
    date: "Mar 15, 2025",
    amount: "$99.00",
    type: "Subscription",
    status: "Completed",
    paymentMethod: "Visa ending in 4242",
  },
  {
    id: "trans-002",
    restaurant: "Sushi Delight",
    date: "Mar 10, 2025",
    amount: "$199.00",
    type: "Subscription",
    status: "Completed",
    paymentMethod: "Mastercard ending in 5678",
  },
  {
    id: "trans-003",
    restaurant: "Taco Express",
    date: "Mar 24, 2025",
    amount: "$49.00",
    type: "Subscription",
    status: "Completed",
    paymentMethod: "American Express ending in 9012",
  },
  {
    id: "trans-004",
    restaurant: "French Bistro",
    date: "Mar 12, 2025",
    amount: "$99.00",
    type: "Subscription",
    status: "Completed",
    paymentMethod: "Visa ending in 3456",
  },
  {
    id: "trans-005",
    restaurant: "Spice Garden",
    date: "Mar 5, 2025",
    amount: "$49.00",
    type: "Subscription",
    status: "Failed",
    paymentMethod: "Mastercard ending in 7890",
  },
  {
    id: "trans-006",
    restaurant: "Bella Italia",
    date: "Feb 15, 2025",
    amount: "$99.00",
    type: "Subscription",
    status: "Completed",
    paymentMethod: "Visa ending in 4242",
  },
  {
    id: "trans-007",
    restaurant: "Sushi Delight",
    date: "Feb 10, 2025",
    amount: "$199.00",
    type: "Subscription",
    status: "Completed",
    paymentMethod: "Mastercard ending in 5678",
  },
];

const plans = [
  {
    id: "plan-001",
    name: "Basic",
    price: "$49/month",
    features: [
      "Up to 100 reservations/month",
      "Basic customer management",
      "Email support",
      "Standard analytics",
    ],
    restaurants: 42,
  },
  {
    id: "plan-002",
    name: "Standard",
    price: "$99/month",
    features: [
      "Up to 500 reservations/month",
      "Advanced customer management",
      "Priority email support",
      "Advanced analytics",
      "Custom branding",
    ],
    restaurants: 68,
  },
  {
    id: "plan-003",
    name: "Premium",
    price: "$199/month",
    features: [
      "Unlimited reservations",
      "VIP customer management",
      "24/7 phone & email support",
      "Premium analytics & reporting",
      "Custom branding",
      "API access",
      "Dedicated account manager",
    ],
    restaurants: 18,
  },
];

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Billing Management</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,846</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subscriptions
            </CardTitle>
            <CreditCard className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">
              +3 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Revenue Per Restaurant
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$100.36</div>
            <p className="text-xs text-muted-foreground">
              +2.4% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overdue Accounts
            </CardTitle>
            <CreditCard className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              2.3% of total accounts
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="accounts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accounts">Billing Accounts</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="accounts">
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Billing Accounts</CardTitle>
              <CardDescription>
                Manage billing accounts for all restaurants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <input 
                    type="text" 
                    placeholder="Search accounts..." 
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
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Next Billing</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="mr-2 h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center">
                            <Store className="h-4 w-4 text-violet-500" />
                          </div>
                          {account.restaurant}
                        </div>
                      </TableCell>
                      <TableCell>{account.plan}</TableCell>
                      <TableCell>{account.amount}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          account.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : account.status === "Overdue" 
                            ? "bg-red-100 text-red-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {account.status}
                        </span>
                      </TableCell>
                      <TableCell>{account.nextBilling}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{account.paymentMethod}</TableCell>
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
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                View all billing transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <input 
                    type="text" 
                    placeholder="Search transactions..." 
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
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="mr-2 h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center">
                            <Store className="h-4 w-4 text-violet-500" />
                          </div>
                          {transaction.restaurant}
                        </div>
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.status === "Completed" 
                            ? "bg-green-100 text-green-800" 
                            : transaction.status === "Failed" 
                            ? "bg-red-100 text-red-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {transaction.status}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{transaction.paymentMethod}</TableCell>
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
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{transactions.length}</span> of <span className="font-medium">100</span> transactions
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
        </TabsContent>
        
        <TabsContent value="plans">
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-2xl font-bold">{plan.price}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 mr-2 text-green-500"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{plan.restaurants}</span> restaurants on this plan
                  </div>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Button className="w-full">Edit Plan</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
