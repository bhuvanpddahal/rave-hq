import { Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";

import AppForm from "@/components/AppForm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/Dialog";
import { editApp } from "@/actions/app";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/Button";
import { CreateAppPayload } from "@/lib/validators/app";

interface EditButtonProps {
    appId: string;
    appName: string;
}

const EditButton = ({
    appId,
    appName
}: EditButtonProps) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, startTransition] = useTransition();

    const onSubmit = (value: CreateAppPayload) => {
        const payload = { ...value, id: appId };

        startTransition(() => {
            editApp(payload).then((data) => {
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
            variant="outline"
            className="px-3"
        >
            <Pencil className="size-4 text-zinc-700" />
        </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit App</DialogTitle>
                    <DialogDescription>
                        Update the app name and hit 'Save' to save it.
                    </DialogDescription>
                </DialogHeader>
                <AppForm
                    defaultValues={{ name: appName }}
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    submitBtnText="Save"
                    submitBtnTextWhileLoading="Saving"
                    closeModal={() => setIsOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
};

export default EditButton;