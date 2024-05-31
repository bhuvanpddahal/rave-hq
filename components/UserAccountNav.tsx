"use client";

import UserAvatar from "./UserAvatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";

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
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default UserAccountNav;