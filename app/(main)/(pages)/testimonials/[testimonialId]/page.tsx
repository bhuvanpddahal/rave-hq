import TestimonialDetailsContent from "./Content";

interface TestimonialDetailsPageProps {
    params: {
        testimonialId: string;
    };
}

export const metadata = {
    title: "Testimonial Details"
};

const TestimonialDetailsPage = ({
    params: { testimonialId }
}: TestimonialDetailsPageProps) => {
    return (
        <div className="mt-[40px]">
            <TestimonialDetailsContent
                testimonialId={testimonialId}
            />
        </div>
    )
};

export default TestimonialDetailsPage;