"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserPlus, Shield, Trash2, Check } from "lucide-react";
import { InviteAdminDialog } from "@/views/settings/invite-admin-dialog";
import { useGetAdminsQuery, useUpdateAdminRoleMutation, useRemoveAdminMutation } from "@/lib/services/settings/adminApiSlice";
import { AdminRole, RoleDisplayNames, RoleDescriptions, RoleColors, AllRoles } from "@/lib/constants/roles";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function TeamPage() {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [adminToRemove, setAdminToRemove] = useState<{ id: string; name: string } | null>(null);
  const { data: admins, isLoading } = useGetAdminsQuery({ page: 1, limit: 50 });
  const [updateRole] = useUpdateAdminRoleMutation();
  const [removeAdmin] = useRemoveAdminMutation();

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.[0] || "";
    const last = lastName?.[0] || "";
    return (first + last).toUpperCase() || "A";
  };

  const handleRoleChange = async (adminId: string, newRole: AdminRole) => {
    try {
      await updateRole({ id: adminId, role: newRole }).unwrap();
      toast.success(`Role updated to ${RoleDisplayNames[newRole]}`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update role");
    }
  };

  const handleRemoveAdmin = async () => {
    if (!adminToRemove) return;
    try {
      await removeAdmin(adminToRemove.id).unwrap();
      toast.success("Admin removed successfully");
      setRemoveDialogOpen(false);
      setAdminToRemove(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to remove admin");
    }
  };

  const confirmRemove = (id: string, firstName?: string, lastName?: string) => {
    setAdminToRemove({ id, name: `${firstName || ''} ${lastName || ''}`.trim() || 'this admin' });
    setRemoveDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">Invite and manage admin team members</p>
          </div>
          <Button onClick={() => setInviteDialogOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Admin
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              {admins?.data?.length || 0} admin{(admins?.data?.length || 0) !== 1 ? "s" : ""} in your team
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between py-3 animate-pulse">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-muted" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-muted rounded" />
                        <div className="h-3 w-48 bg-muted rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y">
                {admins?.data?.map((admin) => {
                  const role = (admin.role as AdminRole) || AdminRole.VIEWER;
                  const roleColor = RoleColors[role] || RoleColors[AdminRole.VIEWER];
                  return (
                    <div key={admin.id} className="flex items-center justify-between py-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={admin.imageUrl || ""} />
                          <AvatarFallback>
                            {getInitials(admin.firstName, admin.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {admin.firstName} {admin.lastName}
                            </span>
                            <span className={cn(
                              "px-2 py-0.5 rounded-full text-xs font-medium",
                              roleColor.bg,
                              roleColor.text
                            )}>
                              {RoleDisplayNames[role] || role}
                            </span>
                            {admin.status === "PENDING" && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                                Pending
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{admin.email}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <Shield className="h-4 w-4 mr-2" />
                              Change Role
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              {AllRoles.map((r) => (
                                <DropdownMenuItem
                                  key={r}
                                  onClick={() => handleRoleChange(admin.id, r)}
                                  className="flex items-center justify-between"
                                >
                                  <div>
                                    <div className="font-medium">{RoleDisplayNames[r]}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {RoleDescriptions[r]}
                                    </div>
                                  </div>
                                  {role === r && <Check className="h-4 w-4 ml-2" />}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => confirmRemove(admin.id, admin.firstName, admin.lastName)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  );
                })}
                {(!admins?.data || admins.data.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground">
                    No team members found
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <InviteAdminDialog 
        open={inviteDialogOpen} 
        onOpenChange={setInviteDialogOpen} 
      />

      <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {adminToRemove?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleRemoveAdmin}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
