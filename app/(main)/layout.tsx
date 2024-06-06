import Header from "./Header";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const metadata = {
    title: "Dashboard - RaveHQ"
};

const MainLayout = ({
    children
}: MainLayoutProps) => {
    return (
        <main className="flex">
            <Sidebar className="w-[300px] sticky top-0 border-r border-input hidden lg:block" />
            <div className="flex-1 bg-background p-4 sm:p-6">
                <Header />
                {children}
            </div>
        </main>
    )
};

export default MainLayout;