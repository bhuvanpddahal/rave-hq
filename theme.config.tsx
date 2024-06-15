import Link from "next/link";
import Image from "next/image";

export default {
    logo: <Image
        src="/logo.svg"
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
            <meta property="og:description" content="The next site builder" />
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