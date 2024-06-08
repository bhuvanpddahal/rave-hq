"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "./ui/Dialog";
import { Button } from "./ui/Button";
import { useToast } from "@/hooks/useToast";
import { recoverApiKey } from "@/actions/app";
import { useApiKeyHelpModal } from "@/hooks/useApiKeyHelpModal";

const ApiKeyHelpModal = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, startTransition] = useTransition();
    const { isOpen, appId, close, setAppId } = useApiKeyHelpModal();

    const handleApiKeyRecovery = () => {
        const payload = { appId };

        startTransition(() => {
            recoverApiKey(payload).then((data) => {
                if (data.success) {
                    toast({
                        title: "Success",
                        description: data.success
                    });
                    handleClose();
                    router.push(`/recover-api-key?appId=${appId}`);
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
        setAppId("");
        close();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> Lost Your API Key?</DialogTitle>
                    <DialogDescription>
                        We understand that losing your API key can be frustrating. To ensure the security of your app, we need to confirm if you&apos;ve truly lost access to your key before moving further.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-y-2">
                    <Button
                        variant="primary"
                        onClick={handleApiKeyRecovery}
                        className="w-full"
                        isLoading={isLoading}
                    >
                        {isLoading
                            ? "Sending recovery email"
                            : "Yes, I've lost my key"
                        }
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        className="w-full"
                    >
                        No, I found my key
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};

export default ApiKeyHelpModal;