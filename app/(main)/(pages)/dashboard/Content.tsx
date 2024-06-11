"use client";

import { useQuery } from "@tanstack/react-query";

import Cards, { CardsLoader } from "./Cards";
import RecentTestimonials, { RecentTestimonialsLoader } from "./RecentTestimonials";
import { getDashboardData } from "@/actions/app";

const testimonials = [
    {
        id: "123",
        appId: "3456",
        feedback: "This is feedback",
        rating: 4,
        email: "email@gmail.com",
        givenAt: new Date(),
        updatedAt: new Date(),
        appName: "App name"
    },
    {
        id: "123",
        appId: "3456",
        feedback: "This is feedback",
        rating: 4,
        email: "email@gmail.com",
        givenAt: new Date(),
        updatedAt: new Date(),
        appName: "App name"
    },
    {
        id: "123",
        appId: "3456",
        feedback: "This is feedback",
        rating: 4,
        email: "email@gmail.com",
        givenAt: new Date(),
        updatedAt: new Date(),
        appName: "App name"
    },
    {
        id: "123",
        appId: "3456",
        feedback: "This is feedback",
        rating: 4,
        email: "email@gmail.com",
        givenAt: new Date(),
        updatedAt: new Date(),
        appName: "App name"
    },
    {
        id: "123",
        appId: "3456",
        feedback: "This is feedback",
        rating: 4,
        email: "email@gmail.com",
        givenAt: new Date(),
        updatedAt: new Date(),
        appName: "App name"
    },
    {
        id: "123",
        appId: "3456",
        feedback: "This is feedback",
        rating: 4,
        email: "email@gmail.com",
        givenAt: new Date(),
        updatedAt: new Date(),
        appName: "App name"
    },
]

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
        <div>
            Error
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