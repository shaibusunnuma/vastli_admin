import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetOperatorSessionsQuery } from "@/lib/services/users/userApiSlice";
import type { Session } from "@/types/users";

interface UserDetailsProps {
  user: any | null;
}

export default function UserDetails({ user }: UserDetailsProps) {
  const userId = user?.id;
  const { data: sessions, isLoading: sessionsLoading } = useGetOperatorSessionsQuery(userId, { skip: !userId });

  if (!user) return null;
  return (
    <Dialog>
      <DialogTrigger>
      <Button variant="ghost" className="text-left text-sm block w-full p-2">View</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>View information about this user.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-2">
          <div>
            <b>Name:</b> {user.firstName} {user.lastName}
          </div>
          <div>
            <b>Email:</b> {user.email}
          </div>
          <div>
            <b>Role:</b> {user.role}
          </div>
          <div>
            <b>Status:</b> {user.status}
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Current Sessions</h4>
          {sessionsLoading ? (
            <div>Loading sessions...</div>
          ) : sessions && sessions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs border">
                <thead>
                  <tr>
                    <th className="px-2 py-1 border">Device</th>
                    <th className="px-2 py-1 border">Type</th>
                    <th className="px-2 py-1 border">Last Used</th>
                    <th className="px-2 py-1 border">Expires</th>
                    <th className="px-2 py-1 border">Revoked</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session: Session) => (
                    <tr key={session.id}>
                      <td className="px-2 py-1 border">{session.deviceName}</td>
                      <td className="px-2 py-1 border">{session.deviceType}</td>
                      <td className="px-2 py-1 border">{session.lastUsed ? new Date(session.lastUsed).toLocaleString() : "-"}</td>
                      <td className="px-2 py-1 border">{session.expires ? new Date(session.expires).toLocaleString() : "-"}</td>
                      <td className="px-2 py-1 border">{session.revoked ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>No active sessions found.</div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
