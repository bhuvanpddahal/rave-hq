"use client";

import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import RecoveryForm from "./RecoveryForm";
import { getAppInfo } from "@/actions/app";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const RecoverApiKeyContent = () => {
    const router = useRouter();
    const user = useCurrentUser();
    const isSignedIn = user?.id && user.email;
    const searchParams = useSearchParams();
    const appId = searchParams?.get("appId");

    const {
        data,
        status
    } = useQuery({
        enabled: !!appId && !!isSignedIn,
        queryKey: ["recover-api-key", { appId }],
        queryFn: async () => {
            const payload = { appId: appId || "" };
            const data = await getAppInfo(payload);
            return data;
        }
    });

    if (!isSignedIn) {
        router.push("/signin");
    }
    if (!appId) return (
        <div className="flex flex-col items-center gap-y-2">
            <Image
                src="/error.png"
                alt="Error"
                height={100}
                width={100}
            />
            <h2 className="text-lg font-bold text-zinc-800 text-center">
                Missing App Id!
            </h2>
        </div>
    )
    if (status === "pending") return (
        <ClipLoader
            cssOverride={{
                display: "block",
                margin: "20px auto 5px"
            }}
        />
    )
    if (!data || data.error) return (
        <div className="flex flex-col items-center gap-y-2">
            <Image
                src="/error.png"
                alt="Error"
                height={100}
                width={100}
                className="mx-auto"
            />
            <div>
                <h2 className="text-lg font-bold text-zinc-800 text-center">
                    Something went wrong!
                </h2>
                <p className="text-muted-foreground text-sm max-w-lg text-center">
                    Try refreshing the page. If the error still persists, go to app details page and try recovering the key again.
                </p>
            </div>
        </div>
    )

    return (
        <>
            <p className="text-zinc-500 text-center text-[13px] mb-4">
                We have sent a code to
                <span className="font-medium"> {data.email}</span>,
                please check your inbox and insert the code in form below to recover your API key.
            </p>

            <RecoveryForm
                appId={appId}
            />

            <p className="text-zinc-500 text-center text-[13px] mb-3">
                After confirming, your existing API key for the app will be deleted, so that you can create a new API key and store it securely.
            </p>
        </>
    )
};

export default RecoverApiKeyContent;