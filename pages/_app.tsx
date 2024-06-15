import { AppProps } from "next/app";
import { Hanken_Grotesk } from "next/font/google";

import "@/styles/globals.css";

const hankenGrotesk = Hanken_Grotesk({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <main className={hankenGrotesk.className}>
            <Component {...pageProps} />
        </main>
    )
}