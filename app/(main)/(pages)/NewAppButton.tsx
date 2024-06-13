"use client";

import { Button } from "@/components/ui/Button";
import { useNewAppModal } from "@/hooks/useNewAppModal";

const NewAppButton = () => {
    const { open } = useNewAppModal();
    
    return (
        <Button
            variant="outline"
            onClick={open}
            className="mt-2"
        >
            Create a new app
        </Button>
    )
};

export default NewAppButton;