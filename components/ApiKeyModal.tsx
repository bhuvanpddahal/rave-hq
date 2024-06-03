"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "./ui/Dialog";
import { Button } from "./ui/Button";
import { useApiKeyModal } from "@/hooks/useApiKeyModal";

const ApiKeyModal = () => {
    const [isCopied, setIsCopied] = useState(false);
    const { isOpen, apiKey, close, setApiKey } = useApiKeyModal();

    const handleCopy = () => {
        if (isCopied) return;

        window.navigator.clipboard.writeText(apiKey);
        setIsCopied(true);

        setTimeout(() => setIsCopied(false), 3000);
    };

    const handleClose = () => {
        setApiKey("");
        close();
    };

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Your API Key</DialogTitle>
                    <DialogDescription>
                        This API key is unique and confidential. Please copy and store it securely, as it won&apos;t be displayed again.
                    </DialogDescription>
                </DialogHeader>
                <div className="border border-input rounded-sm flex items-center gap-2">
                    <p className="w-full pl-3 line-clamp-1 text-sm font-medium text-zinc-800">
                        {apiKey}
                    </p>
                    <Button
                        variant="secondary"
                        className="h-10 w-10 border-0 p-0"
                        onClick={handleCopy}
                    >
                        {isCopied ? (
                            <Check className="h-4 w-4 text-secondary-foreground" />
                        ) : (
                            <Copy className="h-4 w-4 text-secondary-foreground" />
                        )}
                    </Button>
                </div>
                <Button
                    variant="outline"
                    onClick={handleClose}
                >
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    )
};

export default ApiKeyModal;