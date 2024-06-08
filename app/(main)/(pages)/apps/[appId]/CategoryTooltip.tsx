import { Separator } from "@/components/ui/Separator";

const CategoryTooltip = ({ active, payload }: any) => {
    if (!active) return null;

    const star = payload[0].payload.star;
    const count = payload[0].payload.count;

    return (
        <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
            <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
                {star}
            </div>
            <Separator />
            <div className="p-2 px-3 space-y-1">
                <div className="flex items-center justify-between gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <div className="size-1.5 bg-rose-500 rounded-full" />
                        <p className="text-sm text-muted-foreground">
                            Testimonials
                        </p>
                        <p className="text-sm text-right font-medium">
                            {count}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CategoryTooltip;