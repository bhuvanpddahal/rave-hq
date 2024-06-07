import ChartCard from "./ChartCard";
import PieChartCard from "./PieChartCard";

const Overview = () => {
    return (
        <div>
            <h2 className="font-semibold text-lg text-zinc-800 mb-1">
                Overview
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-6 gap-3">
                <ChartCard />
                <PieChartCard />
            </div>
        </div>
    )
};

export default Overview;