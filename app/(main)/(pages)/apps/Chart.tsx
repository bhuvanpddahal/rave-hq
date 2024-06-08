import {
    Tooltip,
    XAxis,
    AreaChart,
    Area,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";
import { format } from "date-fns";

import CustomTooltip from "./CustomTooltip";

interface ChartProps {
    data: {
        date: Date;
        overallRating: number;
        count: number;
    }[];
}

const Chart = ({ data }: ChartProps) => {
    return (
        <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <defs>
                    <linearGradient id="count" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="2%" stopColor="#2e80fa" stopOpacity={0.8} />
                        <stop offset="98%" stopColor="#2e80fa" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="overallRating" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="2%" stopColor="#f54e00" stopOpacity={0.8} />
                        <stop offset="98%" stopColor="#f54e00" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, "dd MM")}
                    style={{ fontSize: "12px" }}
                    tickMargin={16}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                    type="monotone"
                    dataKey="count"
                    stackId="count"
                    strokeWidth={2}
                    stroke="#2e80fa"
                    fill="url(#count)"
                    className="drop-shadow-sm"
                />
                <Area
                    type="monotone"
                    dataKey="overallRating"
                    stackId="overallRating"
                    strokeWidth={2}
                    stroke="#f54e00"
                    fill="url(#overallRating)"
                    className="drop-shadow-sm"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
};

export default Chart;