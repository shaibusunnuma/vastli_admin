import { useGetOperatorsQuery } from "@/lib/services/users/userApiSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import UserDetails from "./user-details";
import UserEditForm from "./user-edit-form";

interface UsersTabProps {
  accountId?: string;
}

export default function UsersTab({ accountId }: UsersTabProps) {
  const { data: users, isLoading } = useGetOperatorsQuery({ accountId }, { skip: !accountId });

  if (isLoading) return <div>Loading users...</div>;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.data.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2">{user.status}</td>
                <td className="px-4 py-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <UserDetails user={user} />
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <UserEditForm user={user} />
                      </DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
