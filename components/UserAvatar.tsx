import { User } from "lucide-react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/Avatar";

interface UserAvatarProps {
    image: string | null;
    name: string | null;
    className?: string;
}

const UserAvatar = ({
    image,
    name,
    className
}: UserAvatarProps) => {
    return (
        <Avatar className={className}>
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