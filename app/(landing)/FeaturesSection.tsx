import { LayoutGrid } from "./LayoutGrid";

const cards = [
    {
        id: 1,
        content: "Hello",
        className: "",
        thumbnail: "/logo.png"
    },
    {
        id: 2,
        content: "Hello 2",
        className: "",
        thumbnail: "/logo.png"
    },
    {
        id: 3,
        content: "Hello 3",
        className: "",
        thumbnail: "/logo.png"
    },
    {
        id: 4,
        content: "Hello 4",
        className: "",
        thumbnail: "/overview.svg"
    }
];

const FeaturesSection = () => {
    return (
        <section className="bg-zinc-800">
            <div className="relative max-w-7xl mx-auto flex flex-col items-center justify-center gap-16 lg:gap-20 px-4 py-10 lg:py-20">
                <div className="relative flex flex-col items-center justify-center text-center">
                    <h1 className="font-black text-zinc-200 text-4xl lg:text-5xl tracking-tight">
                        Let your
                        <span className="text-primary"> customers </span>
                        do the talking
                    </h1>
                    <p className="max-w-4xl text-base lg:text-lg font-medium text-slate-200 mt-3 lg:mt-4">
                        Turn satisfied customers into powerful brand advocates with RaveHQ, the all-in-one platform for testimonial collection and management. Learn to leverage the power of social proof.
                    </p>
                </div>
                <LayoutGrid cards={cards} />
            </div>
        </section>
    )
};

export default FeaturesSection;