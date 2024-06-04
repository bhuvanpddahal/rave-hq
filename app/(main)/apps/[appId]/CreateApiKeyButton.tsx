"use client";

import {
    useMutation,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";
import { Key } from "lucide-react";

import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/Button";
import { useApiKeyModal } from "@/hooks/useApiKeyModal";
import { checkApiKey, createAndSaveApiKey } from "@/actions/app";

interface CreateApiKeyButtonProps {
    appId: string;
}

const CreateApiKeyButton = ({ appId }: CreateApiKeyButtonProps) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { open, setApiKey } = useApiKeyModal();

    const {
        data,
        isLoading
    } = useQuery({
        queryKey: ["apps", appId, "api-key"],
        queryFn: async () => {
            const payload = { appId };
            const data = await checkApiKey(payload);
            return data;
        }
    });

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
                    queryKey: ["apps", appId, "api-key"]
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

    if (
        isLoading ||
        !data ||
        data.error ||
        data.hasApiKey
    ) return null;

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

export default CreateApiKeyButton;