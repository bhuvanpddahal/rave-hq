import Chart from "./Chart";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import { CountUp } from "@/components/CountUp";

const ChartCard = () => {
    return (
        <Card className="col-span-1 xl:col-span-4">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-lg text-zinc-800">
                    History
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Chart />
            </CardContent>
            <CardFooter className="justify-between">
                <div className="flex flex-col items-center">
                    <p className="text-slate-400 text-sm font-medium">
                        Testimonials
                    </p>
                    <p className="font-semibold text-slate-800 text-lg">
                        <CountUp
                            preserveValue
                            start={0}
                            end={10}
                        />
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-slate-400 text-sm font-medium">
                        Overall Rating
                    </p>
                    <p className="font-semibold text-slate-800 text-lg">
                        <CountUp
                            preserveValue
                            start={0}
                            end={3.5}
                            decimals={2}
                            decimalPlaces={2}
                        />
                    </p>
                </div>
            </CardFooter>
        </Card>
    )
};

export default ChartCard;