import {
    Tooltip,
    AreaChart,
    Area,
    ResponsiveContainer
} from "recharts";

import CustomTooltip from "./CustomTooltip";
import { DashboardChartData } from "@/actions/app";

interface ChartProps {
    data: DashboardChartData;
    color: string;
    text: "Testimonials" | "Overall Rating" | "Apps";
}

const Chart = ({
    data,
    color,
    text
}: ChartProps) => {
    return (
        <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="value" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="2%"
                            stopColor={color}
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="98%"
                            stopColor={color}
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <Tooltip content={<CustomTooltip text={text} />} />
                <Area
                    type="monotone"
                    dataKey="value"
                    stackId="value"
                    strokeWidth={2}
                    stroke={color}
                    fill="url(#value)"
                    className="drop-shadow-sm"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
};

export default Chart;