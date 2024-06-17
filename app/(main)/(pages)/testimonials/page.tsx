import TestimonialsContent from "./Content";

export const metadata = {
    title: "Testimonials"
};

const TestimonialsPage = () => {
    return (
        <div className="py-10 space-y-4">
            <TestimonialsContent />
        </div>
    )
};

export default TestimonialsPage;