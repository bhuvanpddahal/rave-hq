import NewAppButton from "../NewAppButton";

export const metadata = {
    title: "Apps - RaveHQ"
};

const AppsPage = () => {
    return (
        <div className="space-y-4">
            <div className="p-6 pb-24 rounded-sm bg-gradient-to-b from-primary to-primary/60 space-y-3 space-y-3">
                <h2 className="font-bold text-xl text-primary-foreground">
                    Review your Apps
                </h2>
                <p className="text-primary-foreground text-sm">
                    Review, search, sort and analyze all of your apps easily. Create a new app if you wish.
                </p>
                <NewAppButton />
            </div>
        </div>
    )
};

export default AppsPage;