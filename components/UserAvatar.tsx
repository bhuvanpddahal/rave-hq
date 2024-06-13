import { User } from "lucide-react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/Avatar";

interface UserAvatarProps {
    image: string | null;
    name: string | null;
    email: string;
    className?: string;
}

const UserAvatar = ({
    image,
    name,
    email,
    className
}: UserAvatarProps) => {
    return (
        <Avatar
            className={className}
            title={name || email}
        >
            <AvatarImage src={image || ""} />
            <AvatarFallback>
                {name ? name[0] : (
                    <User className="size-4 text-zinc-700" />
                )}
            </AvatarFallback>
        </Avatar>
    )
};

export default UserAvatar;