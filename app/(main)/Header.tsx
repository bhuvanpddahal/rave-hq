import Link from "next/link";
import Image from "next/image";

import UserNavButton from "./UserNavButton";

const Header = () => {
    return (
        <header className="sticky top-0 bg-white border-b border-input px-5 z-10">
            <div className="max-w-screen-2xl h-[50px] mx-auto flex items-center justify-between">
                <Link href="/">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        height={50}
                        width={188}
                        className="h-[30px] w-auto"
                    />
                </Link>
                <UserNavButton />
            </div>
        </header>
    )
};

export default Header;