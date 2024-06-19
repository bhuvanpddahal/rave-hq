"use client";

import Link from "next/link";
import Image from "next/image";
import {
    FcOrgUnit,
    FcSettings,
    FcTwoSmartphones,
    FcVoicePresentation
} from "react-icons/fc";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import { cn } from "@/lib/utils";

interface SidebarProps {
    className?: string;
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

const dashboardLinks = [
    {
        name: "Overview",
        href: "/dashboard",
        icon: FcOrgUnit
    },
    {
        name: "Testimonials",
        href: "/testimonials",
        icon: FcVoicePresentation
    },
    {
        name: "Apps",
        href: "/apps",
        icon: FcTwoSmartphones
    }
];

const profileLinks = [
    {
        name: "Settings",
        href: "/settings",
        icon: FcSettings
    }
];

const Sidebar = ({ className, setIsOpen }: SidebarProps) => {
    const pathname = usePathname();

    return (
        <aside className={cn(
            "shrink-0 bg-white h-screen overflow-y-auto px-5 py-7 space-y-6",
            className
        )}>
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    height={50}
                    width={188}
                    className="inline-block h-[30px] w-auto"
                />
            </Link>
            <div className="space-y-3">
                <h3 className="text-xs font-bold text-zinc-500">
                    DASHBOARD
                </h3>
                <ul>
                    {dashboardLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 font-medium rounded-sm text-sm transition-colors",
                                    pathname?.includes(link.href)
                                        ? "bg-gradient-to-b from-secondary/60 to-secondary text-secondary-foreground hover:bg-zinc-500/80"
                                        : "hover:bg-slate-100"
                                )}
                                onClick={() => setIsOpen?.(false)}
                            >
                                <link.icon className="h-6 w-6" />
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="space-y-3">
                <h3 className="text-xs font-bold text-zinc-500">
                    MY PROFILE
                </h3>
                <ul>
                    {profileLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 font-medium rounded-sm text-sm transition-colors",
                                    pathname?.includes(link.href)
                                        ? "bg-gradient-to-b from-secondary/60 to-secondary text-secondary-foreground hover:bg-zinc-500/80"
                                        : "hover:bg-slate-100"
                                )}
                                onClick={() => setIsOpen?.(false)}
                            >
                                <link.icon className="h-6 w-6" />
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
};

export default Sidebar;