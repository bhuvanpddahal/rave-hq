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
        title: "RaveHQ",
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
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

    return (
        <>
            <html lang="en">
                <head>
                    <script
                        defer
                        data-website-id={process.env.METRIK_WEBSITE_ID}
                        data-domain={new URL(appUrl).host}
                        src="https://metrik-one.vercel.app/js/script.js"
                    ></script>
                </head>
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
