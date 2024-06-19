import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Select from "./Select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "./ui/Form";
import {
    CreateTestimonialPayload,
    CreateTestimonialValidator
} from "@/lib/validators/app";
import { cn } from "@/lib/utils";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/Textarea";
import { useCreateApp } from "@/hooks/useCreateApp";

interface TestimonialFormProps {
    onSubmit: (payload: CreateTestimonialPayload) => void;
    defaultValues?: CreateTestimonialPayload;
    isLoading: boolean;
    appOptions: { id: string; name: string; }[];
    submitBtnText: string;
    submitBtnTextWhileLoading: string;
    closeModal: () => void;
}

const TestimonialForm = ({
    onSubmit,
    defaultValues,
    isLoading,
    appOptions,
    submitBtnText,
    submitBtnTextWhileLoading,
    closeModal
}: TestimonialFormProps) => {
    const {
        isLoading: isCreatingApp,
        onSubmit: onCreateApp
    } = useCreateApp({
        pushToNewAppUrl: false
    });
    const disabled = isLoading || isCreatingApp;

    const refinedAppOptions = appOptions.map((option) => ({
        label: option.name,
        value: option.id
    }));

    const handleCreateApp = (name: string) => {
        const payload = { name };
        onCreateApp(payload);
    };

    const form = useForm<CreateTestimonialPayload>({
        resolver: zodResolver(CreateTestimonialValidator),
        defaultValues: defaultValues ?? { rating: 0 }
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full"
            >
                <div className="flex flex-col gap-y-4">
                    <FormField
                        control={form.control}
                        name="appId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>App</FormLabel>
                                <FormControl>
                                    <Select
                                        placeholder="Select an app"
                                        options={refinedAppOptions}
                                        onCreate={handleCreateApp}
                                        value={field.value}
                                        onChange={field.onChange}
                                        disabled={disabled}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="feedback"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Feedback</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="This is such a good ..."
                                        disabled={disabled}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rating</FormLabel>
                                <FormControl>
                                    <div className={cn(
                                        "flex justify-between",
                                        disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                                    )}>
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <Star
                                                key={index}
                                                className={cn(
                                                    "h-7 w-7",
                                                    field.value > index ? "text-primary fill-primary" : "text-slate-300 fill-slate-300"
                                                )}
                                                onClick={() => field.onChange(index + 1)}
                                            />
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="user@mail.com"
                                        disabled={disabled}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-y-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="secondary"
                            disabled={disabled}
                            isLoading={isLoading}
                        >
                            {isLoading
                                ? submitBtnTextWhileLoading
                                : submitBtnText
                            }
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
};

export default TestimonialForm;