import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";

import "./globals.css";
import Providers from "@/components/Providers";
import { auth } from "@/auth";

const gabarito = Hanken_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "QuickCodeKit",
    description: "Quickly setup your project with preconfigured assets",
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
            <body className={gabarito.className}>
                <Providers session={session}>
                    {children}
                </Providers>
            </body>
        </html>
    )
}