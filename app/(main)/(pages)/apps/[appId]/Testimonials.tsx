import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import { columns } from "./Columns";
import { getAppTestimonials } from "@/actions/app";
import { Skeleton } from "@/components/ui/Skeleton";
import { APP_TESTIMONIALS_PER_PAGE } from "@/constants";
import { DataTable, DataTableLoader } from "./DataTable";

interface TestimonialsProps {
    appId: string;
}

const Testimonials = ({ appId }: TestimonialsProps) => {
    const searchParams = useSearchParams();
    const page = Number(searchParams?.get("page") || "1");

    const {
        data,
        isLoading
    } = useQuery({
        queryKey: ["apps", appId, { for: "testimonials", page }],
        queryFn: async () => {
            const payload = { appId, page, limit: APP_TESTIMONIALS_PER_PAGE };
            const data = await getAppTestimonials(payload);
            return data;
        }
    });

    if (isLoading) {
        return <TestimonialsLoader />
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
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold text-zinc-800">
                    Testimonials
                </CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={columns}
                    data={data.testimonials || []}
                    appId={appId}
                    page={page}
                    hasPreviousPage={page > 1}
                    hasNextPage={!!data.hasNextPage}
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