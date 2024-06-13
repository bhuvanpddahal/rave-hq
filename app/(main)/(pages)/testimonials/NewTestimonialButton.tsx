"use client";

import { Button } from "@/components/ui/Button";
import { useNewTestimonialModal } from "@/hooks/useNewTestimonialModal";

const NewTestimonialButton = () => {
    const { open } = useNewTestimonialModal();

    return (
        <Button
            variant="primary"
            onClick={open}
        >
            Create testimonial
        </Button>
    )
};

export default NewTestimonialButton;