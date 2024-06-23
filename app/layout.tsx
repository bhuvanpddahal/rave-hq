import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/globals.css";
import Modals from "@/components/Modals";
import Providers from "@/components/Providers";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/Toaster";

const hankenGrotesk = Hanken_Grotesk({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    keywords: [
        "rave hq",
        "rave",
        "testimonial collection platform",
        "testimonial management platform",
        "testimonial manager",
        "testimonial collector"
    ],
    title: {
        default: "RaveHQ",
        template: "%s - RaveHQ"
    },
    openGraph: {
        description: "Introducing the ultimate testimonial collection and management platform",
        images: [
            `${baseUrl}/logo.png`
        ]
    },
    icons: {
        icon: "/logo-icon.png"
    }
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <>
            <html lang="en">
                <body className={hankenGrotesk.className}>
                    <Providers session={session}>
                        <Modals />
                        <Toaster />
                        {children}
                    </Providers>
                </body>
            </html>
            <Analytics />
        </>
    )
}