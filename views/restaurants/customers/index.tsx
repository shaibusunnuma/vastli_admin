import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types/restaurants";
import { useGetCustomersQuery } from "@/lib/services/customers/customerApiSlice";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Props {
  restaurant?: Restaurant;
}
export default function Customers({ restaurant }: Props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: customers,
    error,
    isLoading,
  } = useGetCustomersQuery(
    {
      filter: { restaurants: [restaurant?.id || ""], page, limit: pageSize },
    },
    { skip: !restaurant }
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: customers?.data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Card>
      <CardContent>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2 items-center flex">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
              disabled={customers?.metadata?.hasPrevPage === false || page === 1}
            >
              Previous
            </Button>
            <span>
              Page {customers?.metadata?.page ?? page} of {customers?.metadata?.lastPage ?? 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev: number) => (customers?.metadata?.hasNextPage ? prev + 1 : prev))}
              disabled={customers?.metadata?.hasNextPage === false || (customers?.metadata?.lastPage !== undefined && page >= customers.metadata.lastPage)}
            >
              Next
            </Button>
            <select
              className="ml-2 border rounded px-2 py-1 text-sm"
              value={pageSize}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setPageSize(Number(e.target.value));
                setPage(1); // Reset to first page when page size changes
              }}
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>{size} / page</option>
              ))}
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
