import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { TestimonialType, columns } from "./Columns";
import { DataTable, DataTableLoader } from "./DataTable";

interface RecentTestimonialsProps {
    testimonials: TestimonialType[];
}

const RecentTestimonials = ({
    testimonials
}: RecentTestimonialsProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-bold text-zinc-800">
                    Recent Testimonials
                </CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={columns}
                    data={testimonials}
                />
            </CardContent>
        </Card>
    )
};

export default RecentTestimonials;

export const RecentTestimonialsLoader = () => {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-[120px] rounded-sm" />
            </CardHeader>
            <CardContent>
                <DataTableLoader />
            </CardContent>
        </Card>
    )
};