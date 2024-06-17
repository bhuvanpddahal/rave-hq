import Image from "next/image";

import SigninForm from "./SigninForm";
import SocialButtons from "./SocialButtons";
import { Separator } from "@/components/ui/Separator";

export const metadata = {
    title: "Sign In"
};

const SigninPage = () => {
    return (
        <div className="min-h-screen w-full bg-muted flex items-center justify-center px-2 py-4">
            <div className="bg-white max-w-sm w-full px-6 py-8 sm:px-8 sm:py-9 rounded-sm shadow-sm">
                <div className="flex items-center justify-center">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        height={50}
                        width={188}
                        className="h-[40px] w-auto"
                    />
                </div>

                <SigninForm />

                <Separator className="flex items-center justify-center my-6">
                    <span className="bg-white px-3 text-slate-300 text-sm select-none">
                        or
                    </span>
                </Separator>

                <SocialButtons />
            </div>
        </div>
    )
};

export default SigninPage;