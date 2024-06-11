import { format } from "date-fns";

import { Separator } from "@/components/ui/Separator";

const CustomTooltip = ({ active, payload, text }: any) => {
    if (!active) return null;

    const date = payload[0].payload.date;
    const value = payload[0].value;

    console.log({ payload });

    return (
        <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
            <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
                {format(date, "MMM dd, yyy")}
            </div>
            <Separator />
            <div className="p-2 px-3 space-y-1">
                <div className="flex items-center justify-between gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <div className="size-1.5 bg-secondary rounded-full" />
                        <p className="text-sm text-muted-foreground">
                            {text}
                        </p>
                        <p className="text-sm text-right font-medium">
                            {value}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CustomTooltip;