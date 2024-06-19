"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import NewTestimonialButton from "./NewTestimonialButton";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import { columns } from "./Columns";
import { getTestimonials } from "@/actions/app";
import { Skeleton } from "@/components/ui/Skeleton";
import { TESTIMONIALS_PER_PAGE } from "@/constants";
import { DataTable, DataTableLoader } from "./DataTable";

const TestimonialsContent = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams?.get("page") || "1");

    const {
        data,
        isLoading
    } = useQuery({
        queryKey: ["testimonials", { page }],
        queryFn: async () => {
            const payload = { page, limit: TESTIMONIALS_PER_PAGE };
            const data = await getTestimonials(payload);
            return data;
        }
    });

    if (isLoading) {
        return (
            <>
                <Skeleton className="bg-white h-10 w-[150px] rounded-sm" />
                <Card>
                    <CardHeader className="pb-4">
                        <Skeleton className="h-6 w-[110px] rounded-sm" />
                    </CardHeader>
                    <CardContent>
                        <DataTableLoader />
                    </CardContent>
                </Card>
            </>
        )
    }
    if (!data || data.error) {
        return (
            <div className="py-20 flex flex-col items-center justify-center gap-y-2">
                <Image
                    src="/error.png"
                    alt="Error"
                    height={100}
                    width={100}
                />
                <p className="text-sm font-medium text-zinc-400">
                    {data?.error || "Something went wrong"}
                </p>
            </div>
        )
    }

    return (
        <>
            <NewTestimonialButton />
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-base font-bold text-zinc-800">
                        All Testimonials
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={data.testimonials || []}
                        page={page}
                        hasPreviousPage={page > 1}
                        hasNextPage={!!data.hasNextPage}
                    />
                </CardContent>
            </Card>
        </>
    )
};

export default TestimonialsContent;