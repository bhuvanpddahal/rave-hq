"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import NewTestimonialButton from "./NewTestimonialButton";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import { useToast } from "@/hooks/useToast";
import { getTestimonials } from "@/actions/app";
import { Skeleton } from "@/components/ui/Skeleton";
import { TESTIMONIALS_PER_PAGE } from "@/constants";
import { TestimonialType, columns } from "./Columns";
import { DataTable, DataTableLoader } from "./DataTable";

interface FetchTestimonialsProps {
    pageParam: number;
}

interface TestimonialsData {
    testimonials: TestimonialType[];
    totalTestimonials: number;
    hasNextPage: boolean;
}

const TestimonialsContent = () => {
    const { toast } = useToast();

    const fetchTestimonials = async ({ pageParam }: FetchTestimonialsProps) => {
        try {
            const payload = { page: pageParam, limit: TESTIMONIALS_PER_PAGE };
            const data = await getTestimonials(payload);
            return data as TestimonialsData;
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong"
            });
            return {
                testimonials: [] as TestimonialType[],
                totalTestimonials: 0,
                hasNextPage: false
            };
        }
    };

    const {
        data,
        status,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["testimonials"],
        queryFn: fetchTestimonials,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.hasNextPage) {
                return pages.length + 1;
            } else {
                return null;
            }
        }
    });

    const testimonials = data?.pages.flatMap((page) => page.testimonials);

    if (!testimonials && status === "pending") {
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

    return (
        <>
            {testimonials && (
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
                                data={testimonials}
                                hasNextPage={hasNextPage}
                                fetchNextPage={fetchNextPage}
                                isFetchingNextPage={isFetchingNextPage}
                            />
                        </CardContent>
                    </Card>
                </>
            )}
        </>
    )
};

export default TestimonialsContent;