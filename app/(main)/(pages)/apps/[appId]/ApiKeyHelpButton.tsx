import { CircleHelp } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { useApiKeyHelpModal } from "@/hooks/useApiKeyHelpModal";

interface ApiKeyHelpButtonProps {
    appId: string;
}

const ApiKeyHelpButton = ({
    appId
}: ApiKeyHelpButtonProps) => {
    const { open, setAppId } = useApiKeyHelpModal();

    const handleClick = () => {
        setAppId(appId);
        open();
    };

    return (
        <Button
            variant="primary"
            onClick={handleClick}
        >
            <CircleHelp className="size-4 mr-2 stroke-2" />
            Lost API Key
        </Button>
    )
};

export default ApiKeyHelpButton;