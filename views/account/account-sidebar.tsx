"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserIcon, ShieldIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    name: "Profile",
    href: "/account",
    icon: UserIcon,
  },
  {
    name: "Security",
    href: "/account/security",
    icon: ShieldIcon,
  },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 min-h-screen bg-card border-r">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        <nav className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Account Settings</h3>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
