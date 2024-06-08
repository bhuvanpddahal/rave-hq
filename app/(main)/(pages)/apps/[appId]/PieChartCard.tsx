import { Loader2 } from "lucide-react";

import PieDiagram from "./PieDiagram";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";

interface PieChartCardProps {
    ratingCategories: {
        star: string;
        count: number;
    }[];
}

const PieChartCard = ({
    ratingCategories
}: PieChartCardProps) => {
    return (
        <Card className="col-span-1 xl:col-span-2">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-lg text-zinc-800">
                    Categories
                </CardTitle>
            </CardHeader>
            <CardContent>
                {ratingCategories.length ? (
                    <PieDiagram data={ratingCategories} />
                ) : (
                    <p className="h-[300px] flex items-center justify-center text-slate-400 text-sm font-medium">
                        No ratings to display
                    </p>
                )}
            </CardContent>
        </Card>
    )
};

export default PieChartCard;

export const PieChartCardLoader = () => {
    return (
        <Card className="col-span-1 xl:col-span-2">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-lg text-zinc-800">
                    Categories
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[240px] w-full flex items-center justify-center">
                    <Loader2 className="h-5 w-5 text-slate-500 stroke-1 animate-spin" />
                </div>
            </CardContent>
        </Card>
    )
};