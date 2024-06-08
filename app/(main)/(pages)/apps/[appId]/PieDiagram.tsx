import {
    Tooltip,
    PieChart,
    Pie,
    ResponsiveContainer,
    Legend,
    Cell
} from "recharts";

import CategoryTooltip from "./CategoryTooltip";

interface PieDiagramProps {
    data: {
        star: string;
        count: number;
    }[];
}

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354", "#8AF27E", "#8E63F2"];

const PieDiagram = ({ data }: PieDiagramProps) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="right"
                    iconType="circle"
                    content={({ payload }: any) => {
                        return (
                            <ul className="grid grid-cols-3 xl:grid-cols-2 gap-x-5 gap-y-2">
                                {payload.map((entry: any, index: number) => (
                                    <li
                                        key={`item-${index}`}
                                        className="flex items-center space-x-2"
                                    >
                                        <span
                                            className="size-2 rounded-full"
                                            style={{ backgroundColor: entry.color }}
                                        />
                                        <div className="space-x-1">
                                            <span className="text-sm text-muted-foreground">
                                                {entry.payload.payload.star}
                                            </span>
                                            <span className="text-sm">
                                                {entry.payload.count}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )
                    }}
                />
                <Tooltip content={<CategoryTooltip />} />
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={2}
                    fill="#8884d8"
                    dataKey="count"
                    labelLine={false}
                >
                    {data.map((_entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
};

export default PieDiagram;