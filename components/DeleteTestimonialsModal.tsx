"use client";

import { Star } from "lucide-react";
import { useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "./ui/Dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { useToast } from "@/hooks/useToast";
import { bulkDeleteTestimonials } from "@/actions/app";
import { useDeleteTestimonialsModal } from "@/hooks/useDeleteTestimonialsModal";

const DeleteTestimonialsModal = () => {
    const { toast } = useToast();
    const {
        isOpen,
        testimonials,
        close,
        setTestimonials
    } = useDeleteTestimonialsModal();
    const queryClient = useQueryClient();
    const [isLoading, startTransition] = useTransition();
    const testimonialIds = testimonials.map((testimonial) => testimonial.id);

    const handleBulkDeleteTestimonials = () => {
        const payload = { testimonialIds };

        startTransition(() => {
            bulkDeleteTestimonials(payload).then((data) => {
                if (data.success) {
                    toast({
                        title: "Success",
                        description: data.success
                    });
                    queryClient.invalidateQueries({
                        queryKey: ["dashboard"]
                    });
                    queryClient.invalidateQueries({
                        queryKey: ["testimonials"]
                    });
                    queryClient.invalidateQueries({
                        queryKey: ["apps"]
                    });
                    handleClose();
                }
                if (data.error) {
                    toast({
                        title: "Error",
                        description: data.error
                    });
                }
            });
        });
    };

    const handleClose = () => {
        setTestimonials([]);
        close();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Bulk Delete Testimonials</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the following testimonial(s) from your account?
                    </DialogDescription>
                </DialogHeader>
                <ul className="border rounded-sm max-h-[172px] overflow-y-auto">
                    {testimonials.map((testimonial, index) => (
                        <li
                            key={testimonial.id}
                            className={cn(
                                "px-3 py-2 text-sm",
                                index !== testimonials.length - 1 && "border-b"
                            )}
                        >
                            <div className="flex items-center gap-x-3">
                                <span className="font-medium text-zinc-600">
                                    {testimonial.email}
                                </span>
                                <span className="flex items-center justify-center gap-x-0.5">
                                    <Star className="h-4 w-4 fill-orange-500 stroke-1 stroke-red-600" />
                                    {testimonial.rating}
                                </span>
                            </div>
                            <p className="line-clamp-1 text-zinc-800">
                                {testimonial.feedback}
                            </p>
                        </li>
                    ))}
                </ul>
                <DialogFooter className="gap-y-2">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        className="w-full"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleBulkDeleteTestimonials}
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

export default DeleteTestimonialsModal;