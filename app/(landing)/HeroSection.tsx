"use client";

import Link from "next/link";
import Image from "next/image";
import { FiGithub } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { SendHorizonal, Sparkle } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/Carousel";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button, buttonVariants } from "@/components/ui/Button";

const carouselItems = [
    {
        imageSrc: "/dashboard.png",
        imageAlt: "Dashboard",
        title: "Progress Visualization",
        features: [
            "Visualize your progress with beautiful charts",
            "View total testimonials collected, combined overall rating for all of your apps, and total apps created",
            "Interact with the recent testimonials that you have received"
        ],
        exploreUrl: "/dashboard"
    },
    {
        imageSrc: "/testimonials.png",
        imageAlt: "Testimonials",
        title: "Inspect Testimonials",
        features: [
            "View all of your testimonials with beautiful table",
            "Sort testimonials based on different fields and paginate through all your testimonials for quick access",
            "Bulk delete unnecessary and irrelevant testimonials with one click"
        ],
        exploreUrl: "/testimonials"
    },
    {
        imageSrc: "/apps.png",
        imageAlt: "Apps",
        title: "Review Apps",
        features: [
            "View all of your apps in one place with helpful data like the overall rating for the app and total testimonials collected in that app",
            "Sort apps based on their names and navigate to the individual app for more insights",
            "Create a new app with a simple click and start collecting testimonials for it"
        ],
        exploreUrl: "/apps"
    },
    {
        imageSrc: "/settings.png",
        imageAlt: "Settings",
        title: "Customize Profile",
        features: [
            "Scan your profile and manage your settings",
            "Change your name and profile picture with ease",
            "Comfortably change your password from the settings without leaving the page"
        ],
        exploreUrl: "/settings"
    },
    {
        imageSrc: "/more.png",
        imageAlt: "More",
        title: "And More",
        features: [
            "View the individual testimonial and see the details of it in the testimonial details page",
            "Review your apps performance in the app details page with detailed insights about the app",
            "Easily navigate to different pages using the searchbar in the header"
        ],
        exploreUrl: "/dashboard"
    }
];

const HeroSection = () => {
    const router = useRouter();
    const user = useCurrentUser();
    const isLoggedIn = user && user.id;

    return (
        <section className="bg-background">
            <div className="relative max-w-7xl mx-auto flex flex-col items-center justify-center gap-16 lg:gap-20 px-4 py-10 lg:py-20">
                <div className="relative flex flex-col items-center justify-center text-center">
                    <h1 className="font-black text-zinc-800 text-4xl lg:text-6xl tracking-tight">
                        Grow
                        <span className="text-primary"> Trust & Credibility </span>
                        with Authentic Testimonials
                    </h1>
                    <p className="text-base lg:text-lg font-semibold text-slate-600 mt-3 lg:mt-4">
                        Easily gather, manage, and showcase positive customer reviews to boost conversions.
                    </p>
                    <div className="mt-6 lg:mt-[29px] flex items-center gap-3">
                        <Link href={isLoggedIn ? "/dashboard" : "/signin"} className={cn(
                            buttonVariants(),
                            "group h-12 px-[30px] gap-2"
                        )}>
                            Get Started Free
                            <SendHorizonal className="h-4 w-4 stroke-2 group-hover:translate-x-0.5 group-hover:fill-white/20 transition-transform duration-200" />
                        </Link>
                        <Link href="https://github.com/BhuvanPdDahal/rave-hq" target="_blank" className={cn(
                            buttonVariants({
                                variant: "outline"
                            }),
                            "group h-12 px-[30px] gap-2"
                        )}>
                            <FiGithub className="h-4 w-4 stroke-2 group-hover:-translate-x-0.5 group-hover:fill-white/20 transition-transform duration-200" />
                            View GitHub Repo
                        </Link>
                    </div>
                </div>
                <Carousel className="w-full p-4 sm:p-6 lg:p-10 bg-secondary rounded-lg">
                    <CarouselContent>
                        {carouselItems.map((item) => (
                            <CarouselItem
                                key={item.title}
                                className="flex flex-col sm:flex-row gap-5"
                            >
                                <div className="relative w-full sm:w-[65%] h-[200px] sm:h-[300px]">
                                    <Image
                                        src={item.imageSrc}
                                        alt={item.imageAlt}
                                        fill
                                        className="object-cover rounded-sm"
                                    />
                                </div>
                                <div className="w-full sm:w-[35%] text-zinc-100 space-y-4 sm:space-y-6">
                                    <h3 className="text-xl lg:text-2xl font-semibold">
                                        {item.title}
                                    </h3>
                                    <ul className="space-y-1.5 sm:space-y-2">
                                        {item.features.map((feature) => (
                                            <li key={feature} className="text-sm flex gap-1">
                                                <Sparkle className="size-4 shrink-0 text-primary" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            if (isLoggedIn) router.push(item.exploreUrl);
                                            else router.push("/signin");
                                        }}
                                    >
                                        Explore
                                    </Button>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    )
};

export default HeroSection;