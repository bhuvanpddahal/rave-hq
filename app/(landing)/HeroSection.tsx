import Link from "next/link";
import Image from "next/image";
import { SendHorizonal } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/Carousel";
import { buttonVariants } from "@/components/ui/Button";

const HeroSection = () => {
    return (
        <section className="bg-background">
            <div className="relative max-w-7xl mx-auto flex flex-col items-center justify-center gap-16 lg:gap-20 px-4 py-10 lg:py-20">
                <div className="relative flex flex-col items-center justify-center text-center">
                    <h1 className="font-black text-zinc-800 text-4xl lg:text-6xl leading-[45px] lg:leading-[90px] tracking-tight">
                        Grow
                        <span className="text-primary"> Trust & Credibility </span>
                        with Authentic Testimonials
                    </h1>
                    <p className="text-lg font-semibold text-slate-600 leading-relaxed mt-3 lg:mt-4">
                        Easily gather, manage, and showcase positive customer reviews to boost conversions.
                    </p>
                    <Link href="/#pricing" className={cn(
                        buttonVariants(),
                        "group h-12 px-[50px] gap-2 mt-6 lg:mt-[29px]"
                    )}>
                        Get Started Free
                        <SendHorizonal className="h-4 w-4 stroke-2 group-hover:translate-x-0.5 group-hover:fill-white/20 transition-transform duration-200" />
                    </Link>
                </div>
                <Carousel className="w-full">
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index} className="relative w-full h-[600px]">
                                <Image
                                    src="/dashboard.png"
                                    alt="Dashboard"
                                    fill
                                    className="object-cover"
                                />
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