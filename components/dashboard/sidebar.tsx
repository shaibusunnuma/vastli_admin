"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  Calendar, 
  CreditCard,
  Settings,
  LogOut
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500"
  },
  {
    label: "Restaurants",
    icon: Store,
    href: "/restaurants",
    color: "text-violet-500"
  },
  {
    label: "Customers",
    icon: Users,
    href: "/customers",
    color: "text-pink-500"
  },
  {
    label: "Reservations",
    icon: Calendar,
    href: "/reservations",
    color: "text-orange-500"
  },
  {
    label: "Billing",
    icon: CreditCard,
    href: "/billing",
    color: "text-emerald-500"
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500"
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white dark:bg-gray-950 w-64">
      <div className="p-6">
        <Link href="/">
          <h1 className="text-2xl font-bold">Vastli Admin</h1>
        </Link>
      </div>
      <div className="flex flex-col w-full">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-x-2 text-sm font-medium p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all",
              pathname === route.href ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white" : "text-gray-500 dark:text-gray-400"
            )}
          >
            <route.icon className={cn("h-5 w-5", route.color)} />
            {route.label}
          </Link>
        ))}
      </div>
      <div className="mt-auto p-4 border-t">
        <button className="flex items-center gap-x-2 text-sm font-medium p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-gray-500 dark:text-gray-400 w-full">
          <LogOut className="h-5 w-5 text-gray-500" />
          Logout
        </button>
      </div>
    </div>
  );
}
