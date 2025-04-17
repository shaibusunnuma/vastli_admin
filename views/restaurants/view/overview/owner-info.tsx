import React from "react";
import { useGetOperatorByIdQuery } from "@/lib/services/users/userApiSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OwnerInfo({ ownerId }: { ownerId?: string }) {
  const { data: owner } = useGetOperatorByIdQuery(ownerId ?? "", { skip: !ownerId });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Owner Information</CardTitle>
        <CardDescription>Details about the restaurant owner</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="space-y-4">
          <div className="flex flex-col">
            <dt className="text-sm font-medium text-gray-500">Owner Name</dt>
            <dd className="mt-1 text-sm">
              {owner?.firstName} {owner?.lastName}
            </dd>
          </div>
          <div className="flex flex-col">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm">{owner?.email}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
