"use client";

import Link from "next/link";
import {
    FcOrgUnit,
    FcSettings,
    FcTwoSmartphones,
    FcVoicePresentation
} from "react-icons/fc";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

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

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="sticky top-[51px] w-[300px] h-[calc(100vh-51px)] overflow-y-auto border-r border-input px-5 py-7 space-y-6">
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
                                    "flex items-center gap-2 px-3 py-2 font-medium hover:bg-slate-100 rounded-sm text-sm",
                                    pathname.includes(link.href) && "bg-primary-foreground hover:bg-primary-foreground"
                                )}
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
                                    "flex items-center gap-2 px-3 py-2 font-medium hover:bg-slate-100 rounded-sm text-sm",
                                    pathname.includes(link.href) && "bg-primary-foreground hover:bg-primary-foreground"
                                )}
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