import {
    Trash2,
    Star,
    MessageSquareHeart
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/Dialog";
import { deleteApp } from "@/actions/app";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/Button";

interface DeleteButtonProps {
    appId: string;
    appName: string;
    testimonialsCount: number;
    overallRating: number;
}

const DeleteButton = ({
    appId,
    appName,
    testimonialsCount,
    overallRating
}: DeleteButtonProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, startTransition] = useTransition();

    const handleDeleteApp = () => {
        const payload = { id: appId };

        startTransition(() => {
            deleteApp(payload).then((data) => {
                if (data.success) {
                    toast({
                        title: "Success",
                        description: data.success
                    });
                    queryClient.invalidateQueries({
                        queryKey: ["apps"]
                    });
                    queryClient.invalidateQueries({
                        queryKey: ["dashboard"]
                    });
                    queryClient.invalidateQueries({
                        queryKey: ["testimonials"]
                    });
                    router.push("/apps");
                    setIsOpen(false);
                }
                if (data.error) {
                    toast({
                        title: "Error",
                        description: data.error
                    });
                }
            }).catch(() => {
                toast({
                    title: "Error",
                    description: "Something went wrong"
                });
            });
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <Button
                    variant="ghost"
                    className="px-3"
                >
                    <Trash2 className="size-4 text-rose-700" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete App</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the following app from your account?
                    </DialogDescription>
                </DialogHeader>
                <div className="border rounded-sm px-3 py-2 text-sm flex items-center justify-between">
                    <div>
                        <p className="font-medium text-zinc-600">{appName}</p>
                        <div
                            title={`Total Testimonials: ${testimonialsCount}`}
                            className="flex items-center gap-x-0.5"
                        >
                            <MessageSquareHeart className="h-4 w-4 fill-blue-400 stroke-1 stroke-blue-600" />
                            {testimonialsCount}
                        </div>
                    </div>
                    <div
                        title={`Overall Rating: ${overallRating}`}
                        className="flex items-center justify-center gap-x-0.5"
                    >
                        <Star className="h-4 w-4 fill-orange-500 stroke-1 stroke-red-600" />
                        {overallRating}
                    </div>
                </div>
                <DialogDescription>
                    If you delete this app, all the testimonials associated with it will also be deleted.
                </DialogDescription>
                <DialogFooter className="gap-y-2">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="w-full"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleDeleteApp}
                        className="w-full"
                        isLoading={isLoading}
                    >
                        {isLoading
                            ? "Deleting"
                            : "Confirm"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};

export default DeleteButton;