"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import AppForm from "./AppForm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "./ui/Dialog";
import { createApp } from "@/actions/app";
import { useToast } from "@/hooks/useToast";
import { useNewAppModal } from "@/hooks/useNewAppModal";
import { CreateAppPayload } from "@/lib/validators/app";

const NewAppModal = () => {
    const router = useRouter();
    const { toast } = useToast();
    const { isOpen, close } = useNewAppModal();
    const [isLoading, startTransition] = useTransition();

    const onSubmit = (payload: CreateAppPayload) => {
        startTransition(() => {
            console.log("Payload:", payload);
            createApp(payload).then((data) => {
                if (data.success) {
                    toast({
                        title: "Success",
                        description: data.success
                    });
                    router.push(`/apps/${data.appId}`);
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new app</DialogTitle>
                    <DialogDescription>
                        Fill in the form below to create a new app in your account.
                    </DialogDescription>
                </DialogHeader>
                <AppForm
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    submitBtnText="Create"
                    submitBtnTextWhileLoading="Creating"
                    closeModal={close}
                />
            </DialogContent>
        </Dialog>
    )
};

export default NewAppModal