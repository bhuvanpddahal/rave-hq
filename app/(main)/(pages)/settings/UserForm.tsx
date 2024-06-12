import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { ChangeEvent, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/Form";
import {
    UpdateUserPayload,
    UpdateUserValidator
} from "@/lib/validators/auth";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import { updateUser } from "@/actions/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

interface UserFormProps {
    isCredentialsSignin: boolean;
}

const UserForm = ({
    isCredentialsSignin
}: UserFormProps) => {
    const { toast } = useToast();
    const { data, update } = useSession();
    const [isLoading, startTransition] = useTransition();

    const user = data?.user;

    const form = useForm<UpdateUserPayload>({
        resolver: zodResolver(UpdateUserValidator),
        defaultValues: {
            name: user?.name || "",
            image: undefined,
            newPassword: undefined
        }
    });

    const handleImgChange = (
        e: ChangeEvent<HTMLInputElement>,
        form: UseFormReturn<UpdateUserPayload, any, undefined>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                form.setValue("image", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const resetValues = () => {
        form.setValue("name", user?.name || "");
        form.setValue("image", undefined);
        form.setValue("newPassword", undefined);
    };

    const onSubmit = (payload: UpdateUserPayload) => {
        startTransition(() => {
            updateUser(payload).then((data) => {
                if (data.success) {
                    update({
                        ...user,
                        name: payload.name.length ? payload.name : null,
                        image: payload.image || user?.image
                    });
                    toast({
                        title: "Success",
                        description: data.success
                    });
                }
                if (data.error) {
                    toast({
                        title: "Error",
                        description: data.error
                    });
                }
            }).catch(() => {
                toast({
                    title: "Error",
                    description: "Something went wrong"
                });
            });
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-y-1">
                        <label
                            className="text-sm font-medium"
                            aria-disabled
                        >
                            Email
                        </label>
                        <Input
                            value={user?.email || ""}
                            disabled
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="image"
                        render={() => (
                            <FormItem>
                                <FormLabel className="space-y-1.5">
                                    <p className="inline text-sm font-medium">
                                        Image
                                    </p>
                                    <div className={cn(
                                        "relative h-[300px] w-full border rounded-sm cursor-pointer",
                                        form.getValues("image") || user?.image
                                            ? "border-solid"
                                            : "border-dashed flex items-center justify-center"
                                    )}>
                                        {form.getValues("image") || user?.image ? (
                                            <Image
                                                src={form.getValues("image") || user?.image || ""}
                                                alt="Image"
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center gap-y-1 text-zinc-400">
                                                <ImageIcon className="size-5" />
                                                <span className="text-[13px]">
                                                    Click to upload an image
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => handleImgChange(e, form)}
                                        disabled={isLoading}
                                        accept="image/*"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {isCredentialsSignin && (
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            value={form.getValues("newPassword") || ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length) {
                                                    form.setValue("newPassword", value);
                                                } else {
                                                    form.setValue("newPassword", undefined);
                                                }
                                            }}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-y-2 mt-5">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={resetValues}
                    >
                        Clear
                    </Button>
                    <Button
                        type="submit"
                        variant="secondary"
                        disabled={isLoading}
                        isLoading={isLoading}
                    >
                        {isLoading
                            ? "Saving Info"
                            : "Save Info"
                        }
                    </Button>
                </div>
            </form>
        </Form>
    )
};

export default UserForm;

export const UserFormLoader = () => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                {Array.from({ length: 4 }, (_, index) => (
                    <div className="space-y-1" key={index}>
                        <div className="py-[3px]">
                            <Skeleton className="h-[14px] w-12 rounded-sm" />
                        </div>
                        <Skeleton className={cn(
                            "h-10 w-full rounded-sm",
                            index === 2 && "h-[300px]"
                        )} />
                    </div>
                ))}
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-y-2 mt-5">
                <Skeleton className="h-10 w-full sm:w-24 rounded-sm" />
                <Skeleton className="h-10 w-full sm:w-24 rounded-sm" />
            </div>
        </div>
    )
};