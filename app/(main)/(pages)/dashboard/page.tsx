import Image from "next/image";

import DashboardContent from "./Content";
import ViewTestimonialsButton from "./ViewTestimonialsButton";

export const metadata = {
    title: "Overview"
};

const DashboardPage = () => {
    return (
        <div className="mt-[60px] space-y-6">
            <div className="relative p-6 pt-4 sm:pr-[220px] rounded-sm bg-gradient-to-b from-primary to-primary/60">
                <Image
                    src="/overview.svg"
                    alt="Overview"
                    width={773}
                    height={612}
                    className="absolute bottom-0 right-0 h-[130px] sm:h-[160px] w-auto hidden sm:block"
                />
                <h2 className="font-bold text-xl text-primary-foreground">
                    Welcome to Overview
                </h2>
                <p className="text-primary-foreground text-sm">
                    Review, search, sort and visualize all of your progress easily with charts.
                </p>
                <ViewTestimonialsButton />
            </div>
            <DashboardContent />
        </div>
    )
};

export default DashboardPage;