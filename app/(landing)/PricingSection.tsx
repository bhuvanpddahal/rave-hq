"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const features = [
    "Unlimited amount of app creation",
    "Actionable insights into apps",
    "App API key recovery",
    "Unlimited testimonial creation"
];

const PricingSection = () => {
    const router = useRouter();
    const user = useCurrentUser();
    const isLoggedIn = user && user.id

    return (
        <section id="pricing" className="bg-background">
            <div className="relative max-w-7xl mx-auto flex flex-col items-center justify-center gap-16 lg:gap-20 px-4 py-10 lg:py-20">
                <div className="relative flex flex-col items-center justify-center text-center">
                    <h1 className="font-black text-zinc-800 text-4xl lg:text-5xl tracking-tight">
                        What&apos;s the pricing? It&apos;s
                        <span className="text-primary"> FREE</span>
                    </h1>
                    <p className="max-w-4xl text-base lg:text-lg font-medium text-slate-700 mt-3 lg:mt-4">
                        We offer a completely free plan packed with features to help you collect, manage, and showcase glowing customer testimonials.
                    </p>
                </div>
                <div className="max-w-lg w-full rounded-xl shadow">
                    <header className="relative bg-gradient-to-b from-zinc-800 to-zinc-600 flex items-center justify-center gap-2 p-4 sm:p-5 rounded-t-xl">
                        <Image
                            src="/logo-icon.png"
                            alt="Logo Icon"
                            width={30}
                            height={30}
                        />
                        <p className="text-lg font-bold text-zinc-100">
                            FREEMIUM PLAN
                        </p>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[calc(100%+60px)] text-center py-3 bg-secondary rounded-tl-sm rounded-br-sm shadow">
                            <span className="font-bold text-2xl lg:text-3xl text-secondary-foreground">$0</span>
                            <span className="absolute bottom-full right-0 border-x-[15px] border-y-[10px] border-transparent border-l-primary border-b-primary" />
                            <span className="absolute top-full left-0 border-x-[15px] border-y-[10px] border-transparent border-t-primary border-r-primary" />
                        </div>
                    </header>
                    <div className="bg-white p-5 sm:p-7 pt-[80px] sm:pt-[88px] rounded-b-xl">
                        <ul className="space-y-2">
                            {features.map((feature) => (
                                <li key={feature} className="flex gap-2">
                                    <Check className="text-emerald-500 size-4" />
                                    <p className="text-[15px] lg:text-base">
                                        {feature}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <Button
                            className="h-11 lg:h-12 w-full mt-4"
                            onClick={() => {
                                if (isLoggedIn) router.push("/dashboard");
                                else router.push("/signin");
                            }}
                        >
                            Activate Free Plan
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default PricingSection;