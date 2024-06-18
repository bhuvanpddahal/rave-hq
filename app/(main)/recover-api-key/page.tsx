import Image from "next/image";

import RecoverApiKeyContent from "./Content";

export const metadata = {
    title: "Recover API Key"
};

const RecoverApiKeyPage = () => {
    return (
        <div className="min-h-screen w-full bg-muted flex items-center justify-center px-2 py-4">
            <div className="bg-white max-w-sm w-full px-6 py-8 sm:px-8 sm:py-9 rounded-sm space-y-4 shadow-sm">
                <div className="flex items-center justify-center">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        height={50}
                        width={188}
                        className="h-[40px] w-auto"
                    />
                </div>

                <RecoverApiKeyContent />
            </div>
        </div>
    )
};

export default RecoverApiKeyPage;