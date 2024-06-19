"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ApiKeyHelpButton from "./ApiKeyHelpButton";
import CreateApiKeyButton from "./CreateApiKeyButton";
import Overview, { OverviewLoader } from "./Overview";
import Testimonials, { TestimonialsLoader } from "./Testimonials";
import { getApp } from "@/actions/app";
import { Skeleton } from "@/components/ui/Skeleton";

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
        <div className="space-y-4 mt-[40px]">
            <div className="flex items-center justify-between">
                <Skeleton className="bg-white h-7 w-[120px] rounded-sm" />
                <div className="flex gap-2">
                    <Skeleton className="bg-white h-10 w-10 rounded-sm" />
                    <Skeleton className="bg-white h-10 w-[42px] rounded-sm" />
                    <Skeleton className="bg-white h-10 w-[150px] rounded-sm" />
                </div>
            </div>
            <div className="space-y-4">
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
        <div className="space-y-4 mt-[40px]">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl text-zinc-800">
                    {data.name}
                </h1>
                <div className="flex gap-2">
                    <DeleteButton
                        appId={appId}
                        appName={data.name || ""}
                        testimonialsCount={data.testimonialsCount || 0}
                        overallRating={data.overallRating || 0}
                    />
                    <EditButton
                        appId={appId}
                        appName={data.name || ""}
                    />
                    {data.hasApiKey ? (
                        <ApiKeyHelpButton appId={appId} />
                    ) : (
                        <CreateApiKeyButton appId={appId} />
                    )}
                </div>
            </div>
            <div className="space-y-4">
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