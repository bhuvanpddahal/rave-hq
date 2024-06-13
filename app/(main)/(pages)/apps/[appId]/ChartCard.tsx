import { Loader2 } from "lucide-react";

import Chart from "./Chart";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import { CountUp } from "@/components/CountUp";
import { Skeleton } from "@/components/ui/Skeleton";

interface ChartCardProps {
    testimonialsCount: number;
    overallRating: number;
    chartData: {
        date: Date;
        overallRating: number;
        count: number;
    }[];
}

const ChartCard = ({
    testimonialsCount,
    overallRating,
    chartData
}: ChartCardProps) => {
    return (
        <Card className="col-span-1 xl:col-span-4">
            <CardHeader className="pb-4">
                <CardTitle className="text-base font-bold text-zinc-800">
                    History
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Chart data={chartData} />
            </CardContent>
            <CardFooter className="justify-between">
                <div className="flex flex-col items-center">
                    <p className="font-semibold text-slate-800 text-lg -mb-1">
                        <CountUp
                            preserveValue
                            start={0}
                            end={testimonialsCount}
                        />
                    </p>
                    <p className="text-slate-400 text-sm font-medium">
                        Testimonials
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="font-semibold text-slate-800 text-lg -mb-1">
                        <CountUp
                            preserveValue
                            start={0}
                            end={overallRating || 0}
                            decimals={2}
                            decimalPlaces={2}
                        />
                    </p>
                    <p className="text-slate-400 text-sm font-medium">
                        Overall Rating
                    </p>
                </div>
            </CardFooter>
        </Card>
    )
};

export default ChartCard;

export const ChartCardLoader = () => {
    return (
        <Card className="col-span-1 xl:col-span-4">
            <CardHeader className="pb-4">
                <Skeleton className="h-6 w-24 rounded-sm" />
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full flex items-center justify-center">
                    <Loader2 className="h-5 w-5 text-slate-500 stroke-1 animate-spin" />
                </div>
            </CardContent>
            <CardFooter className="justify-between">
                <Skeleton className="h-11 w-20 rounded-sm" />
                <Skeleton className="h-11 w-20 rounded-sm" />
            </CardFooter>
        </Card>
    )
};