import Image from "next/image";

import VerifyEmailContent from "./Content";

export const metadata = {
    title: "Verify Email"
};

const VerifyEmailPage = () => {
    return (
        <div className="min-h-screen w-full bg-muted flex items-center justify-center px-2 py-4">
            <div className="bg-white max-w-sm w-full px-6 py-8 sm:px-8 sm:py-9 rounded-sm space-y-4 shadow-sm">
                <div className="flex items-center justify-center">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        height={50}
                        width={188}
                        priority
                        className="h-[40px] w-auto"
                    />
                </div>

                <VerifyEmailContent />
            </div>
        </div>
    )
};

export default VerifyEmailPage;