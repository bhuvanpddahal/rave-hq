"use client";

import {
    LayoutGrid,
    LogOut,
    MessageSquareHeart,
    Smartphone,
    User
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

import UserAvatar from "./UserAvatar";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const UserAccountNav = () => {
    const currentUser = useCurrentUser();

    if (!currentUser) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    image={currentUser.image}
                    name={currentUser.name}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    {currentUser.name && (
                        <p>{currentUser.name}</p>
                    )}
                    <p className={cn(
                        currentUser.name && "text-slate-400 font-medium"
                    )}>
                        {currentUser.email}
                    </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <LayoutGrid className="size-4 text-zinc-600" />
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/testimonials" className="flex items-center gap-2">
                        <MessageSquareHeart className="size-4 text-zinc-600" />
                        Testimonials
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/apps" className="flex items-center gap-2">
                        <Smartphone className="size-4 text-zinc-600" />
                        Apps
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2">
                        <User className="size-4 text-zinc-600" />
                        Profile
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onSelect={(e) => {
                    e.preventDefault();
                    signOut({
                        callbackUrl: `${window.location.origin}/signin`
                    });
                }} className="cursor-pointer flex items-center gap-2">
                    <LogOut className="size-4 text-zinc-600" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default UserAccountNav;