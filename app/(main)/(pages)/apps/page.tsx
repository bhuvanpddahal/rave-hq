import Image from "next/image";
import AppsList from "./AppsList";
import NewAppButton from "../NewAppButton";

export const metadata = {
    title: "Apps - RaveHQ"
};

const AppsPage = () => {
    return (
        <div className="mt-[60px] space-y-6">
            <div className="relative p-6 pt-4 sm:pr-[220px] rounded-sm bg-gradient-to-b from-primary to-primary/60 space-y-2">
                <Image
                    src="/review-apps.svg"
                    alt="Review apps"
                    width={773}
                    height={612}
                    className="absolute bottom-0 right-0 h-[130px] sm:h-[160px] w-auto hidden sm:block"
                />
                <h2 className="font-bold text-xl text-primary-foreground">
                    Review your Apps
                </h2>
                <p className="text-primary-foreground text-sm">
                    Review, search, sort and analyze all of your apps easily. Create a new app if you wish.
                </p>
                <NewAppButton />
            </div>
            <AppsList />
        </div>
    )
};

export default AppsPage;