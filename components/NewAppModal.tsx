"use client";

import AppForm from "./AppForm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "./ui/Dialog";
import { useCreateApp } from "@/hooks/useCreateApp";
import { useNewAppModal } from "@/hooks/useNewAppModal";

const NewAppModal = () => {
    const { isOpen, close } = useNewAppModal();
    const { isLoading, onSubmit } = useCreateApp();

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new app</DialogTitle>
                    <DialogDescription>
                        Fill in the form below to create a new app in your account. Make sure you haven&apos;t created an app with the same name.
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

export default NewAppModal;