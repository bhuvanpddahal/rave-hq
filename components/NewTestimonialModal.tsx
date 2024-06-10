"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import TestimonialForm from "./TestimonialForm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "./ui/Dialog";
import { useToast } from "@/hooks/useToast";
import { useGetApps } from "@/hooks/useGetApps";
import { createTestimonial } from "@/actions/app";
import { CreateTestimonialPayload } from "@/lib/validators/app";
import { useNewTestimonialModal } from "@/hooks/useNewTestimonialModal";

const NewTestimonialModal = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { isOpen, close } = useNewTestimonialModal();
    const [isLoading, startTransition] = useTransition();
    const { data, isLoading: isGettingApps } = useGetApps();

    const onSubmit = (payload: CreateTestimonialPayload) => {
        startTransition(() => {
            createTestimonial(payload).then((data) => {
                if (data.success) {
                    toast({
                        title: "Success",
                        description: data.success
                    });
                    queryClient.invalidateQueries({
                        queryKey: ["testimonials"]
                    });
                    close();
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
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="overflow-y-auto"> {/*TODO: Make it scrollable in y-axis */}
                <DialogHeader>
                    <DialogTitle>New Testimonial</DialogTitle>
                    <DialogDescription>
                        Fill in the form below to create a new testimonial in your account. You can create a testimonial in an existing app, or create a new one.
                    </DialogDescription>
                </DialogHeader>
                {isGettingApps ? (
                    <div className="h-20 w-full flex items-center justify-center">
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    </div>
                ) : (!data || data.error) ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        ERR:_SOMETHING_WENT_WRONG
                    </div>
                ) : (
                    <TestimonialForm
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                        appOptions={data.apps || []}
                        submitBtnText="Create"
                        submitBtnTextWhileLoading="Creating"
                        closeModal={close}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
};

export default NewTestimonialModal