import Image from "next/image";

const IllustrationSection = () => {
    return (
        <section className="bg-zinc-800">
            <div className="relative max-w-7xl mx-auto flex flex-col items-center justify-center gap-16 lg:gap-20 px-4 py-10 lg:py-20">
                <div className="relative flex flex-col items-center justify-center text-center">
                    <h1 className="font-black text-zinc-200 text-4xl lg:text-5xl tracking-tight">
                        <span className="text-primary">ALERT! </span>
                        Don&apos;t let this be your story
                    </h1>
                    <p className="max-w-4xl text-base lg:text-lg font-medium text-slate-200 mt-3 lg:mt-4">
                        Without social proof, customers are unsure if they can trust your brand, even if they love what you offer.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <Image
                            src="/visit.png"
                            alt="Visit site"
                            height={100}
                            width={100}
                        />
                        <p className="max-w-[200px] text-[15px] lg:text-base font-medium text-center text-zinc-200">
                            A potential customer visits your website
                        </p>
                    </div>
                    <Image
                        src="/arrow-1.svg"
                        alt="Arrow 1"
                        height={20}
                        width={60}
                        className="rotate-90 sm:rotate-0"
                    />
                    <div className="flex flex-col items-center gap-2">
                        <Image
                            src="/doubt.png"
                            alt="Doubting"
                            height={100}
                            width={100}
                        />
                        <p className="max-w-[200px] text-[15px] lg:text-base font-medium text-center text-zinc-200">
                            They love the product, but
                            <span className="bg-primary"> don&apos;t trust </span>
                            your site
                        </p>
                    </div>
                    <Image
                        src="/arrow-2.svg"
                        alt="Arrow 2"
                        height={20}
                        width={60}
                        className="rotate-90 sm:rotate-0"
                    />
                    <div className="flex flex-col items-center gap-2">
                        <Image
                            src="/leave.png"
                            alt="Leave site"
                            height={100}
                            width={100}
                        />
                        <p className="max-w-[200px] text-[15px] lg:text-base font-medium text-center text-zinc-200">
                            They leave without converting
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default IllustrationSection;