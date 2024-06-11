import {
    Loader2,
    MessageCircleHeart,
    Smartphone,
    Star
} from "lucide-react";

import Chart from "./Chart";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import { CountUp } from "@/components/CountUp";
import { DashboardChartData } from "@/actions/app";
import { Skeleton } from "@/components/ui/Skeleton";

interface CardsProps {
    testimonialsCount: number;
    testimonialsChartData: DashboardChartData;
    overallRating: number;
    ratingChartData: DashboardChartData;
    appsCount: number;
    appsChartData: DashboardChartData;
}

const Cards = ({
    testimonialsCount,
    testimonialsChartData,
    overallRating,
    ratingChartData,
    appsCount,
    appsChartData
}: CardsProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
                <CardHeader className="flex-row items-start justify-between pb-0">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Testimonials
                    </CardTitle>
                    <div className="p-2 bg-green-500/20 rounded-sm">
                        <MessageCircleHeart className="size-4 text-green-500" />
                    </div>
                </CardHeader>
                <CardContent className="pb-0 flex items-center gap-2">
                    <div className="size-1.5 bg-green-500 rounded-full" />
                    <p className="text-3xl font-bold text-zinc-800">
                        <CountUp
                            preserveValue
                            start={0}
                            end={testimonialsCount}
                        />
                    </p>
                </CardContent>
                <CardFooter>
                    <Chart data={testimonialsChartData} color="#22c55e" text="Testimonials" />
                </CardFooter>
            </Card>
            <Card>
                <CardHeader className="flex-row items-start justify-between pb-0">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Overall Rating
                    </CardTitle>
                    <div className="p-2 bg-primary/20 rounded-sm">
                        <Star className="size-4 text-primary" />
                    </div>
                </CardHeader>
                <CardContent className="pb-0 flex items-center gap-2">
                    <div className="size-1.5 bg-primary rounded-full" />
                    <p className="text-3xl font-bold text-zinc-800">
                        <CountUp
                            preserveValue
                            start={0}
                            end={overallRating}
                        />
                    </p>
                </CardContent>
                <CardFooter>
                    <Chart data={ratingChartData} color="#f54e00" text="Overall Rating" />
                </CardFooter>
            </Card>
            <Card>
                <CardHeader className="flex-row items-start justify-between pb-0">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Apps
                    </CardTitle>
                    <div className="p-2 bg-secondary/20 rounded-sm">
                        <Smartphone className="size-4 text-secondary" />
                    </div>
                </CardHeader>
                <CardContent className="pb-0 flex items-center gap-2">
                    <div className="size-1.5 bg-secondary rounded-full" />
                    <p className="text-3xl font-bold text-zinc-800">
                        <CountUp
                            preserveValue
                            start={0}
                            end={appsCount}
                        />
                    </p>
                </CardContent>
                <CardFooter>
                    <Chart data={appsChartData} color="#2e80fa" text="Apps" />
                </CardFooter>
            </Card>
        </div>
    )
};

export default Cards;

export const CardsLoader = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }, (_, index) => (
                <Card key={index}>
                    <CardHeader className="flex-row items-start justify-between pb-0">
                        <Skeleton className="h-5 w-[120px] rounded-sm" />
                        <Skeleton className="h-8 w-8 rounded-sm" />
                    </CardHeader>
                    <CardContent className="pb-0 flex items-center gap-2">
                        <Skeleton className="size-1.5 rounded-full" />
                        <Skeleton className="h-9 w-12 rounded-sm" />
                    </CardContent>
                    <CardFooter>
                        <div className="h-[100px] w-full flex items-center justify-center">
                            <Loader2 className="h-5 w-5 text-slate-500 stroke-1 animate-spin" />
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
};