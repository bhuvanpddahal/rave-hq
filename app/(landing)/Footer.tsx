import Link from "next/link";
import Image from "next/image";
import { FcLike } from "react-icons/fc";

export const Footer = () => {
    return (
        <footer className="bg-primary-foreground border-t border-primary/80">
            <div className="max-w-7xl mx-auto px-8 py-24">
                <div className="flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                        <Link
                            href="/"
                            className="mx-auto md:mx-0"
                        >
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                height={50}
                                width={188}
                                className="inline-block h-[30px] sm:h-[40px] w-auto"
                            />
                        </Link>
                        <p className="mt-3 text-sm text-slate-700">
                            RaveHQ is a testimonial collection and management platform that empowers businesses to build trust and credibility, and showcase customer love to boost their conversions. Try it out now to see the difference!
                        </p>
                        <p className="mt-3 text-sm text-zinc-800/60">
                            Copyright © {(new Date()).getFullYear()} - All rights reserved
                        </p>
                    </div>
                    <div className="flex-grow flex flex-wrap justify-center -mb-10 md:mt-0 mt-10 text-center md:pl-24">
                        <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                            <div className="font-semibold text-base-content tracking-widest text-sm md:text-left mb-3 text-zinc-800/60">
                                LINKS
                            </div>
                            <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                                <Link href="/" className="hover:underline">
                                    Support
                                </Link>
                                <Link href="/" className="hover:underline">
                                    Pricing
                                </Link>
                            </div>
                        </div>
                        <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                            <div className="font-semibold text-base-content tracking-widest text-sm md:text-left mb-3 text-zinc-800/60">
                                LEGAL
                            </div>
                            <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                                <Link href="/" className="hover:underline">
                                    Terms of services
                                </Link>
                                <Link href="/" className="hover:underline">
                                    Privacy policy
                                </Link>
                            </div>
                        </div>
                        <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                            <div className="font-semibold text-base-content tracking-widest text-sm md:text-left mb-3 text-zinc-800/60">
                                MORE
                            </div>
                            <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                                <Link href="https://pass-lock-five.vercel.app" className="hover:underline">
                                    PassLock
                                </Link>
                                <Link href="https://code-overflow-phi.vercel.app" className="hover:underline">
                                    Code Overflow
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center text-zinc-600 text-sm text-center gap-1 mt-8">
                    Built with
                    <FcLike className="h-4 w-4" />
                    by
                    <Link
                        href="https://github.com/BhuvanPdDahal"
                        target="_blank"
                        className="text-emerald-500 underline"
                    >
                        Bhuvan Dahal
                    </Link>
                </div>
            </div>
        </footer>
    )
};

export default Footer;