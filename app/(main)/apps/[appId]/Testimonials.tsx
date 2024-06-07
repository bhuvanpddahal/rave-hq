import { DataTable } from "./DataTable";
import { TestimonialType, columns } from "./Columns";

const Testimonials = () => {
    const testimonials = [
        {
            id: "abcdef",
            feedback: "This is my feedback",
            rating: 4,
            email: "bhuvandahal6@gmail.com",
            givenAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: "abcdef",
            feedback: "This is my feedback",
            rating: 4,
            email: "bhuvandahal6@gmail.com",
            givenAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: "abcdef",
            feedback: "This is my feedback",
            rating: 4,
            email: "bhuvandahal6@gmail.com",
            givenAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: "abcdef",
            feedback: "This is my feedback",
            rating: 4,
            email: "bhuvandahal6@gmail.com",
            givenAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: "abcdef",
            feedback: "This is my feedback",
            rating: 4,
            email: "bhuvandahal6@gmail.com",
            givenAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: "abcdef",
            feedback: "This is my feedback",
            rating: 4,
            email: "bhuvandahal6@gmail.com",
            givenAt: new Date(),
            updatedAt: new Date()
        },
    ]

    return (
        <div>
            <h2 className="font-semibold text-lg text-zinc-800 mb-1">
                Testimonials
            </h2>
            <DataTable
                columns={columns}
                data={testimonials}
                hasNextPage={false}
                isFetchingNextPage={false}
            />
        </div>
    )
};

export default Testimonials;