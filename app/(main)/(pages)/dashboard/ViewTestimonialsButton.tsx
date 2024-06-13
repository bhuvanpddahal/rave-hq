"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";

const ViewTestimonialsButton = () => {
    const router = useRouter();

    return (
        <Button
            variant="outline"
            onClick={() => router.push("/testimonials")}
            className="mt-2"
        >
            View testimonials
        </Button>
    )
};

export default ViewTestimonialsButton;