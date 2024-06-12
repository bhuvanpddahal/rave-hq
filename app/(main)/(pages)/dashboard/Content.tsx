"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import Cards, { CardsLoader } from "./Cards";
import RecentTestimonials, { RecentTestimonialsLoader } from "./RecentTestimonials";
import { getDashboardData } from "@/actions/app";

const DashboardContent = () => {
    const {
        data,
        isLoading
    } = useQuery({
        queryKey: ["dashboard"],
        queryFn: async () => {
            const data = await getDashboardData();
            return data;
        }
    });

    if (isLoading) return (
        <div className="space-y-4">
            <CardsLoader />
            <RecentTestimonialsLoader />
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
        <div className="space-y-4">
            <Cards
                testimonialsCount={data.testimonialsCount || 0}
                testimonialsChartData={data.testimonialsChartData || []}
                overallRating={data.overallRating || 0}
                ratingChartData={data.ratingChartData || []}
                appsCount={data.appsCount || 0}
                appsChartData={data.appsChartData || []}
            />
            <RecentTestimonials
                testimonials={data.recentTestimonials || []}
            />
        </div>
    )
};

export default DashboardContent;