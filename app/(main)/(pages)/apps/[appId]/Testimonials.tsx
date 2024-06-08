import { Testimonial } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";

import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { useToast } from "@/hooks/useToast";
import { getAppTestimonials } from "@/actions/app";
import { Skeleton } from "@/components/ui/Skeleton";
import { APP_TESTIMONIALS_PER_PAGE } from "@/constants";

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
        <div>
            <h2 className="font-semibold text-lg text-zinc-800 mb-1">
                Testimonials
            </h2>
            <DataTable
                columns={columns}
                data={testimonials}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
            />
        </div>
    )
};

export default Testimonials;

export const TestimonialsLoader = () => {
    return (
        <div>
            <h2 className="font-semibold text-lg text-zinc-800 mb-1">
                Testimonials
            </h2>
            <div>
                <div className="py-4">
                    <Skeleton className="max-w-sm bg-white h-10 rounded-sm" />
                </div>
                <Skeleton className="bg-white h-[250px] w-full rounded-sm" />
            </div>
        </div>
    )
};