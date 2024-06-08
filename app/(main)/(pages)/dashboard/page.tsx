import {
    MessageCircleHeart,
    MessageSquareReply,
    Star
} from "lucide-react";

import { Button } from "@/components/ui/Button";

export const metadata = {
    title: "Overview - RaveHQ"
};

const DashboardPage = () => {
    return (
        <div className="space-y-4 mt-6">
            <div className="p-6 pb-24 rounded-sm bg-gradient-to-b from-primary to-primary/60">
                <h2 className="font-bold text-xl text-primary-foreground">
                    Welcome to Overview
                </h2>
                <p className="text-primary-foreground text-sm">
                    Review, search, sort and visualize all of your progress with charts easily.
                </p>
                <Button variant="outline">
                    Create a new app
                </Button>
            </div>
            <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <li className="bg-white p-5 rounded-sm shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-zinc-800">
                            Total Testimonials
                        </p>
                        <div className="p-2 bg-green-500/20 rounded-sm">
                            <MessageCircleHeart className="size-4 text-green-500" />
                        </div>
                    </div>
                </li>
                <li className="bg-white p-5 rounded-sm shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-zinc-800">
                            Recent Testimonials
                        </p>
                        <div className="p-2 bg-green-500/20 rounded-sm">
                            <MessageSquareReply className="size-4 text-green-500" />
                        </div>
                    </div>
                </li>
                <li className="bg-white p-5 rounded-sm shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-zinc-800">
                            Net Promoter Score
                        </p>
                        <div className="p-2 bg-green-500/20 rounded-sm">
                            <Star className="size-4 text-green-500" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
};

export default DashboardPage;

// Overview
//  - Total testimonials collected
//  - Recent Testimonials
//  - Net Promoter Score (NPS) overall customer satisfaction
// Testimonials
// Apps
// Settings