import NewTestimonialButton from "./NewTestimonialButton";
import { DataTable } from "./DataTable";
import { TestimonialType, columns } from "./Columns";

async function getData(): Promise<TestimonialType[]> {
    // Fetch data from your API here.
    return [
        {
            id: "12345",
            appId: "vy345",
            feedback: "This is good",
            rating: 4,
            email: "user@mail.com",
            givenAt: new Date(),
            updatedAt: new Date(),
            appName: "First app"
        },
        {
            id: "12346",
            appId: "va345",
            feedback: "This is very good",
            rating: 5,
            email: "user0@mail.com",
            givenAt: new Date("2023-10-12"),
            updatedAt: new Date(),
            appName: "My last app"
        },
        {
            id: "12345",
            appId: "vy345",
            feedback: "This is bad",
            rating: 1,
            email: "user23@mail.com",
            givenAt: new Date(),
            updatedAt: new Date(),
            appName: "My first app"
        },
        {
            id: "urimf",
            appId: "mo32",
            feedback: "This is not that bad",
            rating: 3,
            email: "user@mail.com",
            givenAt: new Date(),
            updatedAt: new Date(),
            appName: "My second app"
        },
        {
            id: "12345",
            appId: "vy345",
            feedback: "This is good",
            rating: 4,
            email: "user@mail.com",
            givenAt: new Date(),
            updatedAt: new Date(),
            appName: "My first app"
        }
    ];
};

export default async function DemoPage() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <NewTestimonialButton />
            <DataTable columns={columns} data={data} />
        </div>
    )
}