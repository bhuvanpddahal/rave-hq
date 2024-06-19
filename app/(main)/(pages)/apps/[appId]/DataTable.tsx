"use client";

import {
    ChevronFirst,
    ChevronLast,
    Trash2
} from "lucide-react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import { useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/Table";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { TESTIMONIALS_PER_PAGE } from "@/constants";
import { useDeleteTestimonialsModal } from "@/hooks/useDeleteTestimonialsModal";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[];
    hasNextPage: boolean;
    fetchNextPage?: (options?: any) => Promise<any>;
    isFetchingNextPage: boolean;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
}: DataTableProps<TData, TValue>) {
    const { open, setTestimonials } = useDeleteTestimonialsModal();
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    );
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: TESTIMONIALS_PER_PAGE, //default page size
    });

    const table = useReactTable({
        data,
        columns,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            rowSelection,
            pagination
        }
    });

    const handleOpenModal = () => {
        const rows = table.getFilteredSelectedRowModel().rows;
        const testimonials = rows.map((row) => ({
            id: row.original.id,
            rating: row.original.rating,
            email: row.original.email,
            feedback: row.original.feedback
        }));
        setTestimonials(testimonials);
        open();
    };

    return (
        <div className={cn(
            isFetchingNextPage && "opacity-50 pointer-events-none"
        )}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="w-full sm:max-w-sm"
                />
                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleOpenModal}
                    >
                        <Trash2 className="size-4 mr-1.5" />
                        Delete ({table.getFilteredSelectedRowModel().rows.length})
                    </Button>
                )}
            </div>
            <div className="bg-white rounded-md border">
                <Table>
                    <TableHeader className="rounded-t-sm">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
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
            <div className="flex items-center justify-end space-x-2 pt-4">
                <Button
                    className="h-8 px-3"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronFirst className="h-4 w-4" />
                </Button>
                <Button
                    className="h-8 px-3"
                    onClick={fetchNextPage}
                    disabled={!hasNextPage}
                >
                    <ChevronLast className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export const DataTableLoader = () => {
    return (
        <div>
            <div className="pb-4">
                <Skeleton className="h-10 sm:max-w-sm w-full rounded-sm" />
            </div>
            <Skeleton className="h-[200px] w-full rounded-md" />
            <div className="flex items-center justify-end space-x-2 pt-4">
                <Skeleton className="h-8 w-[42px] rounded-sm" />
                <Skeleton className="h-8 w-[42px] rounded-sm" />
            </div>
        </div>
    )
};