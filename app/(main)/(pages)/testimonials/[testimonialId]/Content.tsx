"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { MdStar } from "react-icons/md";
import { HiMiniUser } from "react-icons/hi2";
import { ImQuotesLeft } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import { Timer, TimerReset } from "lucide-react";

import { cn } from "@/lib/utils";
import { getTestimonial } from "@/actions/app";
import { Skeleton } from "@/components/ui/Skeleton";

interface TestimonialDetailsContentProps {
    testimonialId: string;
}

const TestimonialDetailsContent = ({
    testimonialId
}: TestimonialDetailsContentProps) => {
    const {
        data,
        isLoading
    } = useQuery({
        queryKey: ["testimonials", testimonialId],
        queryFn: async () => {
            const payload = { testimonialId };
            const data = await getTestimonial(payload);
            return data;
        }
    });

    if (isLoading) return (
        <div className="flex flex-col items-center gap-y-9">
            <div className="w-full flex justify-between">
                <div className="flex items-center gap-1.5">
                    <Timer className="h-4 w-4 text-zinc-500" />
                    <Skeleton className="bg-white rounded-sm h-5 w-[150px]" />
                </div>
                <div className="flex items-center gap-1.5">
                    <TimerReset className="h-4 w-4 text-zinc-500" />
                    <Skeleton className="bg-white rounded-sm h-5 w-[150px]" />
                </div>
            </div>
            <div className="flex flex-col items-center gap-y-4">
                <div className="relative flex flex-col items-center gap-3">
                    <ImQuotesLeft className="h-10 w-10 text-blue-200 absolute top-0 right-[calc(50%+100px)]" />
                    <div className="h-20 w-20 rounded-full bg-gradient-to-b from-primary to-primary-foreground p-2 overflow-hidden">
                        <HiMiniUser className="h-full w-full text-secondary/50" />
                    </div>
                    <Skeleton className="bg-white rounded-sm h-6 w-[200px]" />
                </div>
                <div className="flex gap-x-1">
                    {Array.from({ length: 5 }, (_, index) => (
                        <MdStar key={index} className="text-white h-7 w-7 animate-pulse"/>
                    ))}
                </div>
                <div className="flex flex-col items-center gap-y-2">
                    <Skeleton className="bg-white rounded-sm h-6 w-[380px]" />
                    <Skeleton className="bg-white rounded-sm h-6 w-[450px]" />
                    <Skeleton className="bg-white rounded-sm h-6 w-[400px]" />
                </div>
            </div>
            <div className="w-full flex items-center justify-end gap-1.5 text-sm mt-5 text-zinc-700">
                Testimonial for
                <Skeleton className="bg-white rounded-sm h-5 w-[150px]" />
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

    const givenAt = format(data.givenAt!, "Pp");
    const updatedAt = format(data.updatedAt!, "Pp");

    return (
        <div className="flex flex-col items-center gap-y-10">
            <div className="w-full flex justify-between">
                <div
                    title={`Given at ${givenAt}`}
                    className="flex items-center gap-1.5"
                >
                    <Timer className="h-4 w-4 text-zinc-500" />
                    <span className="text-sm text-zinc-700">
                        {givenAt}
                    </span>
                </div>
                <div
                    title={`Updated at ${givenAt}`}
                    className="flex items-center gap-1.5"
                >
                    <TimerReset className="h-4 w-4 text-zinc-500" />
                    <span className="text-sm text-zinc-700">
                        {updatedAt}
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-center gap-y-5">
                <div className="relative flex flex-col items-center gap-2">
                    <ImQuotesLeft className="h-10 w-10 text-blue-200 absolute top-0 right-[calc(50%+100px)]" />
                    <div className="h-20 w-20 rounded-full bg-gradient-to-b from-primary to-primary-foreground p-2 overflow-hidden">
                        <HiMiniUser className="h-full w-full text-secondary/50" />
                    </div>
                    <p className="text-slate-700 font-medium">
                        {data.email}
                    </p>
                </div>
                <div className="flex gap-x-1">
                    {Array.from({ length: 5 }, (_, index) => (
                        <MdStar
                            key={index}
                            className={cn(
                                "h-7 w-7",
                                (data.rating ?? -1) > index ? "text-yellow-400" : "text-slate-300"
                            )}
                        />
                    ))}
                </div>
                <p className="max-w-md text-center text-zinc-800">
                    {data.feedback}
                </p>
            </div>
            <div className="w-full text-right text-sm mt-5 text-zinc-700">
                Testimonial for
                <Link
                    href={`/apps/${data.appId}`}
                    className="text-secondary hover:underline"
                > {data.appName}</Link>
            </div>
        </div>
    )
};

export default TestimonialDetailsContent;