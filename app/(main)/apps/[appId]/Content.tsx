"use client";

import { useQuery } from "@tanstack/react-query";

import CreateApiKeyButton from "./CreateApiKeyButton";
import Overview, { OverviewLoader } from "./Overview";
import Testimonials, { TestimonialsLoader } from "./Testimonials";
import { getApp } from "@/actions/app";
import { Skeleton } from "@/components/ui/Skeleton";
import Image from "next/image";

interface AppDetailsContentProps {
    appId: string;
}

const AppDetailsContent = ({ appId }: AppDetailsContentProps) => {
    const {
        data,
        isLoading
    } = useQuery({
        queryKey: ["apps", appId, { for: "overview" }],
        queryFn: async () => {
            const payload = { appId };
            const data = await getApp(payload);
            return data;
        }
    });

    if (isLoading) return (
        <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
                <Skeleton className="bg-white h-9 w-[120px] rounded-md" />
                <Skeleton className="bg-white h-8 w-15 rounded-md" />
            </div>
            <div className="space-y-6">
                <OverviewLoader />
                <TestimonialsLoader />
            </div>
        </div>
    )
    if (!data || data.error) return (
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

    return (
        <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl text-zinc-800">
                    {data.name}
                </h1>
                <CreateApiKeyButton appId={appId} />
            </div>
            <div className="space-y-6">
                <Overview
                    testimonialsCount={data.testimonialsCount}
                    overallRating={data.overallRating}
                    chartData={data.chartData}
                    ratingCategories={data.ratingCategories}
                />
                <Testimonials
                    appId={appId}
                />
            </div>
        </div>
    )
};

export default AppDetailsContent;