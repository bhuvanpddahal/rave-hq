import { Testimonial } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import { columns } from "./Columns";
import { useToast } from "@/hooks/useToast";
import { getAppTestimonials } from "@/actions/app";
import { Skeleton } from "@/components/ui/Skeleton";
import { APP_TESTIMONIALS_PER_PAGE } from "@/constants";
import { DataTable, DataTableLoader } from "./DataTable";

interface TestimonialsProps {
    appId: string;
}

interface FetchTestimonialsProps {
    pageParam: number;
}

interface TestimonialsData {
    testimonials: Omit<Testimonial, "appId">[];
    totalTestimonials: number;
    hasNextPage: boolean;
}

const Testimonials = ({ appId }: TestimonialsProps) => {
    const { toast } = useToast();

    const fetchTestimonials = async ({ pageParam }: FetchTestimonialsProps) => {
        const payload = { appId, page: pageParam, limit: APP_TESTIMONIALS_PER_PAGE };
        const data = await getAppTestimonials(payload);
        if (data.error) {
            toast({
                title: "Error",
                description: "Something went wrong"
            });
            return {
                testimonials: [] as Testimonial[],
                totalTestimonials: 0,
                hasNextPage: false
            };
        }
        return data as TestimonialsData;
    };

    const {
        data,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["apps", appId, { for: "testimonials" }],
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

    if (!testimonials || isLoading) {
        return <TestimonialsLoader />
    }

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold text-zinc-800">
                    Testimonials
                </CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={columns}
                    data={testimonials}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                />
            </CardContent>
        </Card>
    )
};

export default Testimonials;

export const TestimonialsLoader = () => {
    return (
        <Card>
            <CardHeader className="pb-4">
                <Skeleton className="h-6 w-[90px] rounded-sm" />
            </CardHeader>
            <CardContent>
                <DataTableLoader />
            </CardContent>
        </Card>
    )
};