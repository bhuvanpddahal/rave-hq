import Link from "next/link";
import Image from "next/image";

export default {
    logo: <Image
        src="/logo.png"
        alt="Logo"
        height={50}
        width={188}
        className="h-[30px] w-auto"
    />,
    project: {
        link: "https://github.com/BhuvanPdDahal/rave-hq"
    },
    docsRepositoryBase: "https://github.com/BhuvanPdDahal/rave-hq/tree/main",
    head: (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta property="og:title" content="RaveHQ" />
            <meta property="og:description" content="Introducing the ultimate testimonial collection and management platform" />
        </>
    ),
    darkMode: false,
    footer: {
        text: (
            <span>
                Copyright ©
                <Link href="/"> RaveHQ </Link>
                {new Date().getFullYear()} - All rights reserved.
            </span>
        )
    }
}