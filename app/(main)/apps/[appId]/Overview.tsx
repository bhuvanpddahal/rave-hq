import ChartCard, { ChartCardLoader } from "./ChartCard";
import PieChartCard, { PieChartCardLoader } from "./PieChartCard";

interface OverviewProps {
    testimonialsCount: number | undefined;
    overallRating: number | undefined;
    chartData: {
        date: Date;
        overallRating: number;
        count: number;
    }[] | undefined;
    ratingCategories: {
        star: string;
        count: number;
    }[] | undefined;
}

const Overview = ({
    testimonialsCount,
    overallRating,
    chartData,
    ratingCategories
}: OverviewProps) => {
    if (
        !testimonialsCount ||
        !overallRating ||
        !chartData ||
        !ratingCategories
    ) return null;

    return (
        <div>
            <h2 className="font-semibold text-lg text-zinc-800 mb-1">
                Overview
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-6 gap-3">
                <ChartCard
                    testimonialsCount={testimonialsCount}
                    overallRating={overallRating}
                    chartData={chartData}
                />
                <PieChartCard
                    ratingCategories={ratingCategories}
                />
            </div>
        </div>
    )
};

export default Overview;

export const OverviewLoader = () => {
    return (
        <div>
            <h2 className="font-semibold text-lg text-zinc-800 mb-1">
                Overview
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-6 gap-3">
                <ChartCardLoader />
                <PieChartCardLoader />
            </div>
        </div>
    )
};