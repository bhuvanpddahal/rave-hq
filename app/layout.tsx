import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";

import "@/styles/globals.css";
import Modals from "@/components/Modals";
import Providers from "@/components/Providers";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/Toaster";

const hankenGrotesk = Hanken_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://rave-hq.vercel.app"),
    keywords: [
        "rave hq",
        "rave",
        "testimonial collection platform",
        "testimonial management platform"
    ],
    title: {
        default: "RaveHQ",
        template: "%s - RaveHQ"
    },
    openGraph: {
        description: "Introducing the ultimate testimonial collection and management platform",
        images: [
            "https://rave-hq.vercel.app/logo.svg"
        ]
    },
    icons: {
        icon: "/logo-icon.svg"
    }
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <html lang="en">
            <body className={hankenGrotesk.className}>
                <Providers session={session}>
                    <Modals />
                    <Toaster />
                    {children}
                </Providers>
            </body>
        </html>
    )
}