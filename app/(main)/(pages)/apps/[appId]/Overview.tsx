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
        testimonialsCount === undefined ||
        overallRating === undefined ||
        !chartData ||
        !ratingCategories
    ) return null;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-6 gap-4">
            <ChartCard
                testimonialsCount={testimonialsCount}
                overallRating={overallRating}
                chartData={chartData}
            />
            <PieChartCard
                ratingCategories={ratingCategories}
            />
        </div>
    )
};

export default Overview;

export const OverviewLoader = () => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-6 gap-4">
            <ChartCardLoader />
            <PieChartCardLoader />
        </div>
    )
};