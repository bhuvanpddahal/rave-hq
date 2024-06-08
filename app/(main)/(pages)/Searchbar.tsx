"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { CircleArrowRight } from "lucide-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/Command";

const commandItems = [
    {
        name: "Home Page",
        href: "/"
    },
    {
        name: "Sign in Page",
        href: "/signin"
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
                                    <CircleArrowRight className="size-4 text-zinc-500" />
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