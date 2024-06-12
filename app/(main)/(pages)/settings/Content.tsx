"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import UserForm, { UserFormLoader } from "./UserForm";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/Card";
import { checkSigninType } from "@/actions/auth";

const SettingsContent = () => {
    const {
        data,
        isLoading
    } = useQuery({
        queryKey: ["settings"],
        queryFn: async () => {
            const data = await checkSigninType();
            return data;
        }
    });

    if (isLoading) return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-bold text-zinc-800">
                    General Info
                </CardTitle>
            </CardHeader>
            <CardContent>
                <UserFormLoader />
            </CardContent>
        </Card>
    )
    if (!data || data.error) return (
        <div className="py-20 flex flex-col items-center justify-center gap-y-2">
            <Image
                src="/error.png"
                alt="Error"
                height={100}
                width={100}
            />
            <p className="text-sm font-medium text-zinc-400">
                {data?.error || "Something went wrong"}
            </p>
        </div>
    )

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-bold text-zinc-800">
                    General Info
                </CardTitle>
            </CardHeader>
            <CardContent>
                <UserForm
                    isCredentialsSignin={!!data.isCredentialsSignin}
                />
            </CardContent>
        </Card>
    )
};

export default SettingsContent;