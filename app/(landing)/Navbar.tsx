"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

import Sidebar from "./Sidebar";
import NavItems from "./NavItems";
import NavButtons from "./NavButtons";

const Navbar = () => {
    const navRef = useRef<HTMLElement>(null);

    const adjustNavbar = () => {
        if (
            document.body.scrollTop > 100 ||
            document.documentElement.scrollTop > 100
        ) {
            navRef.current?.classList.add("sticky-nav");
        } else {
            navRef.current?.classList.remove("sticky-nav");
        }
    };

    useEffect(() => {
        adjustNavbar();
        window.addEventListener("scroll", adjustNavbar);
        return () => window.removeEventListener("scroll", adjustNavbar);
    }, []);

    return (
        <nav ref={navRef} className="px-4 py-3 bg-white">
            <div className="relative max-w-7xl w-full mx-auto flex items-center justify-between">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        height={50}
                        width={188}
                        className="h-[30px] lg:h-[40px] w-auto"
                    />
                </Link>

                <NavItems className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex gap-x-16" />

                <NavButtons className="space-x-2 hidden lg:block" />

                <Sidebar />
            </div>
        </nav>
    )
};

export default Navbar;