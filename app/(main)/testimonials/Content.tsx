"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import NewTestimonialButton from "./NewTestimonialButton";
import { DataTable } from "./DataTable";
import { useToast } from "@/hooks/useToast";
import { getTestimonials } from "@/actions/app";
import { Skeleton } from "@/components/ui/Skeleton";
import { TESTIMONIALS_PER_PAGE } from "@/constants";
import { TestimonialType, columns } from "./Columns";

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
                totalItems: 0,
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

    return (
        <>
            <NewTestimonialButton />
            {!testimonials && status === "pending" && (
                <div>
                    <div className="py-4">
                        <Skeleton className="max-w-sm bg-white h-10 rounded-sm" />
                    </div>
                    <Skeleton className="bg-white h-[250px] w-full rounded-sm" />
                </div>
            )}
            {testimonials && (
                (testimonials.length > 0 && testimonials[0]) ||
                testimonials.length === 0
            ) && (
                <DataTable
                    columns={columns}
                    data={testimonials}
                    hasNextPage={hasNextPage}
                    fetchNextPage={fetchNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                />
            )}
        </>
    )
};

export default TestimonialsContent;