"use client";

import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import { Key } from "lucide-react";

import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/Button";
import { createAndSaveApiKey } from "@/actions/app";
import { useApiKeyModal } from "@/hooks/useApiKeyModal";

interface CreateApiKeyButtonProps {
    appId: string;
}

const ApiKeyButton = ({
    appId
}: CreateApiKeyButtonProps) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { open, setApiKey } = useApiKeyModal();

    const {
        mutate: createApiKey,
        isPending
    } = useMutation({
        mutationFn: async () => {
            const payload = { appId };
            const data = await createAndSaveApiKey(payload);
            return data;
        },
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({
                    queryKey: ["apps", appId]
                });
                setApiKey(data.apiKey);
                open();
            }
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error
                });
            }
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Something went wrong"
            });
        }
    });

    return (
        <Button
            variant="primary"
            onClick={() => createApiKey()}
            isLoading={isPending}
        >
            {isPending ? "Creating" : (
                <>
                    <Key className="size-4 mr-2 stroke-2" />
                    Create API Key
                </>
            )}
        </Button>
    )
};

export default ApiKeyButton;