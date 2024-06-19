"use client";

import {
    Home,
    LayoutGrid,
    MessageSquareHeart,
    Settings,
    ShieldCheck,
    Smartphone
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/Command";

const commandItems = [
    {
        name: "Apps Page",
        href: "/apps",
        icon: Smartphone
    },
    {
        name: "Dashboard Page",
        href: "/dashboard",
        icon: LayoutGrid
    },
    {
        name: "Home Page",
        href: "/",
        icon: Home
    },
    {
        name: "Settings Page",
        href: "/settings",
        icon: Settings

    },
    {
        name: "Sign in Page",
        href: "/signin",
        icon: ShieldCheck
    },
    {
        name: "Testimonials Page",
        href: "/testimonials",
        icon: MessageSquareHeart
    }
];

const Searchbar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleItemClick = (href: string) => {
        setIsOpen(false);
        router.push(href);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="h-10 bg-white pl-3 pr-3 lg:pr-8 flex items-center gap-2 rounded-full cursor-pointer transition-colors hover:bg-slate-50"
            >
                <IoIosSearch className="size-4 text-zinc-700" />
                <p className="text-slate-400 text-sm hidden lg:block">
                    Search...
                </p>
            </div>
            <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                        {commandItems.map((item) => (
                            <div
                                key={item.href}
                                onClick={() => handleItemClick(item.href)}
                            >
                                <CommandItem className="gap-2">
                                    <item.icon className="size-4 text-zinc-500" />
                                    <p>{item.name}</p>
                                </CommandItem>
                            </div>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
};

export default Searchbar;