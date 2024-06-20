import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface NavItemsProps {
    className?: string;
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

const navItems = [
    {
        name: "Pricing",
        href: "/#pricing"
    },
    {
        name: "FAQ",
        href: "/#faq"
    },
    {
        name: "Docs",
        href: "/docs/getting-started"
    }
];

const NavItems = ({
    className = "",
    setIsOpen
}: NavItemsProps) => {
    const closeSheet = () => {
        if (setIsOpen) {
            setIsOpen(false);
        }
    };

    return (
        <ul className={className}>
            {navItems.map((item) => (
                <li key={item.name}>
                    <Link
                        href={item.href}
                        className="hover:underline"
                        onClick={closeSheet}
                    >
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
};

export default NavItems;