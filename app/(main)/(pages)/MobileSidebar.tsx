"use client";

import { useState } from "react";
import { AlignJustify } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/Sheet";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="p-2.5 -ml-2.5 rounded-full transition-colors hover:bg-primary/10 lg:hidden outline-none">
                <AlignJustify className="text-zinc-900 h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-screen sm:max-w-sm p-0">
                <Sidebar
                    className="w-full"
                    setIsOpen={setIsOpen}
                />
            </SheetContent>
        </Sheet>
    )
};

export default MobileSidebar;