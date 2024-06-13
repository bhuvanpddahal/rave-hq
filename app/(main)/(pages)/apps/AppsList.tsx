"use client";

import Image from "next/image";
import { App } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

import Chart from "./Chart";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import { getApps } from "@/actions/app";
import { useToast } from "@/hooks/useToast";
import { APPS_PER_PAGE } from "@/constants";
import { Input } from "@/components/ui/Input";
import { CountUp } from "@/components/CountUp";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

interface FetchAppsProps {
    pageParam: number;
}

interface AppsData {
    apps: (Omit<App, "hashedKey"> & {
        testimonialsCount: number;
        overallRating: number;
        chartData: {
            date: Date;
            overallRating: number;
            count: number;
        }[];
    })[];
    totalApps: number;
    hasNextPage: boolean;
}

const AppsList = () => {
    const router = useRouter();
    const { toast } = useToast();
    const { ref, inView } = useInView();
    const [filter, setFilter] = useState("");

    const fetchApps = async ({ pageParam }: FetchAppsProps) => {
        const data = await getApps(pageParam, APPS_PER_PAGE);
        if (data.error) {
            toast({
                title: "Error",
                description: "Something went wrong"
            });
            return { apps: [], totalApps: 0, hasNextPage: false, chartData: [] };
        }
        return data as AppsData;
    };

    const {
        data,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["apps"],
        queryFn: fetchApps,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.hasNextPage) {
                return pages.length + 1;
            } else {
                return null;
            }
        }
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const apps = data?.pages.flatMap((page) => page.apps);

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-4">
                <Input
                    placeholder="Filter apps..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="max-w-sm"
                    disabled={isLoading}
                />
            </div>
            {!apps && isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }, (_, index) => (
                        <AppLoader key={index} />
                    ))}
                </div>
            )}
            {apps && (
                apps.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {apps.map((app, index) => {
                            const isEligible = app.name.includes(filter);

                            if (isEligible) {
                                return (
                                    <Card
                                        key={app.id}
                                        ref={
                                            index === apps.length - 1 && !filter.length
                                                ? ref : undefined
                                        }
                                    >
                                        <CardHeader className="flex-row items-center justify-between pb-4">
                                            <CardTitle className="text-base font-bold text-zinc-800">
                                                {app.name}
                                            </CardTitle>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => router.push(`/apps/${app.id}`)}
                                            >
                                                View
                                            </Button>
                                        </CardHeader>
                                        <CardContent>
                                            <Chart data={app.chartData} />
                                        </CardContent>
                                        <CardFooter className="justify-between">
                                            <div className="flex flex-col items-center">
                                                <p className="font-semibold text-slate-800 text-lg -mb-1">
                                                    <CountUp
                                                        preserveValue
                                                        start={0}
                                                        end={app.testimonialsCount}
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
                                                        end={app.overallRating}
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
                            }
                            return null;
                        })}
                        {isFetchingNextPage && (
                            Array.from({ length: 2 }, (_, index) => (
                                <AppLoader key={index} />
                            ))
                        )}
                    </ul>
                ) : (
                    <div className="py-12 flex flex-col items-center gap-y-2">
                        <Image
                            src="/empty.svg"
                            alt="Empty"
                            width={773}
                            height={612}
                            className="h-[130px] sm:h-[160px] w-auto"
                        />
                        <p className="text-sm font-medium text-zinc-400">
                            No apps found
                        </p>
                    </div>
                )
            )}
        </div>
    )
};

export default AppsList;

const AppLoader = () => {
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between pb-4">
                <Skeleton className="h-6 w-24 rounded-sm" />
                <Skeleton className="h-7 w-14 rounded-sm" />
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