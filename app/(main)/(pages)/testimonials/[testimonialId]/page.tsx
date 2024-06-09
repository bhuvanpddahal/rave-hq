import TestimonialDetailsContent from "./Content";

interface TestimonialDetailsPageProps {
    params: {
        testimonialId: string;
    };
}

export const metadata = {
    title: "Testimonial Details - RaveHQ"
};

const TestimonialDetailsPage = ({
    params: { testimonialId }
}: TestimonialDetailsPageProps) => {
    return (
        <div className="mt-6">
            <TestimonialDetailsContent
                testimonialId={testimonialId}
            />
        </div>
    )
};

export default TestimonialDetailsPage;