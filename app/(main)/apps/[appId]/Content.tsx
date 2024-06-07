"use client";

import Overview from "./Overview";
import Testimonials from "./Testimonials";
import CreateApiKeyButton from "./CreateApiKeyButton";

interface AppDetailsContentProps {
    appId: string;
}

const AppDetailsContent = ({ appId }: AppDetailsContentProps) => {
    return (
        <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl text-zinc-800">
                    App name
                </h1>
                <CreateApiKeyButton appId={appId} />
            </div>
            <div className="space-y-6">
                <Overview />
                <Testimonials />
            </div>
        </div>
    )
};

export default AppDetailsContent;