import PieDiagram from "./PieDiagram";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";

const PieChartCard = () => {
    return (
        <Card className="col-span-1 xl:col-span-2">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-lg text-zinc-800">
                    Categories
                </CardTitle>
            </CardHeader>
            <CardContent>
                <PieDiagram />
            </CardContent>
        </Card>
    )
};

export default PieChartCard;