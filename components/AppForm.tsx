import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "./ui/Form";
import {
    CreateAppPayload,
    CreateAppValidator
} from "@/lib/validators/app";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

interface AppFormProps {
    onSubmit: (payload: CreateAppPayload) => void;
    defaultValues?: CreateAppPayload;
    isLoading: boolean;
    submitBtnText: string;
    submitBtnTextWhileLoading: string;
    closeModal: () => void;
}

const AppForm = ({
    onSubmit,
    defaultValues,
    isLoading,
    submitBtnText,
    submitBtnTextWhileLoading,
    closeModal
}: AppFormProps) => {
    const form = useForm<CreateAppPayload>({
        resolver: zodResolver(CreateAppValidator),
        defaultValues: defaultValues
            ? defaultValues
            : { name: "" }
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>App Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="My new app"
                                        disabled={isLoading}
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
                            disabled={isLoading}
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

export default AppForm;