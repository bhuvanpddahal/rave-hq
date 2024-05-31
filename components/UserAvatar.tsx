import { User } from "lucide-react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/Avatar";

interface UserAvatarProps {
    image: string | null;
    name: string | null;
}

const UserAvatar = ({
    image,
    name
}: UserAvatarProps) => {
    return (
        <Avatar>
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