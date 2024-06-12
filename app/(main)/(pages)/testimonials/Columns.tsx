"use client";

import Link from "next/link";
import {
    ArrowUpDown,
    MoreHorizontal,
    Star
} from "lucide-react";
import { format } from "date-fns";
import { Testimonial } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";

export type TestimonialType = Testimonial & {
    appName: string
};

export const columns: ColumnDef<TestimonialType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "rating",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Rating
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const testimonial = row.original;
            const rating = testimonial.rating;

            return <div className="flex items-center justify-center gap-2">
                <Star className="h-4 w-4 fill-orange-500 stroke-1 stroke-red-600" />
                {rating}
            </div>
        }
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    User
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "feedback",
        header: "Feedback",
        cell: ({ row }) => {
            const testimonial = row.original;
            const feedback = testimonial.feedback;

            return (
                <Link href={`/testimonials/${testimonial.id}`} className="line-clamp-1 max-w-[150px] hover:underline">
                    {feedback}
                </Link>
            )
        }
    },
    {
        accessorKey: "givenAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const testimonial = row.original;
            const date = testimonial.givenAt;

            return <div>{format(date, "P")}</div>
        }
    },
    {
        accessorKey: "appName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    App
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const testimonial = row.original;
            const appName = testimonial.appName;

            return (
                <Link
                    href={`/apps/${testimonial.appId}`}
                    className="hover:underline"
                >
                    {appName}
                </Link>
            )
        }
    },
    {
        id: "moreOptions",
        cell: ({ row }) => {
            const testimonial = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>More Options</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(testimonial.appId)}
                        >
                            Copy app ID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(testimonial.id)}
                        >
                            Copy testimonial ID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(testimonial.feedback)}
                        >
                            Copy feedback
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
];