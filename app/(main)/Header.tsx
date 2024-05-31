import Link from "next/link";
import Image from "next/image";

import Searchbar from "./Searchbar";
import MobileSidebar from "./MobileSidebar";
import UserAccountNav from "@/components/UserAccountNav";

const Header = () => {
    return (
        <header className="flex items-center justify-between lg:justify-end">
            <div className="flex items-center gap-2">
                <MobileSidebar />
                <Link href="/" className="lg:hidden">
                    <Image
                        src="/logo-icon.svg"
                        alt="Logo icon"
                        height={50}
                        width={188}
                        className="h-[30px] w-auto"
                    />
                </Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <Searchbar />
                <UserAccountNav />
            </div>
        </header>
    )
};

export default Header;