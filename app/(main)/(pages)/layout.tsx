import Header from "./Header";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({
    children
}: MainLayoutProps) => {
    return (
        <main>
            <div className="flex max-w-screen-2xl w-full mx-auto">
                <Sidebar className="w-[300px] sticky top-0 border-r border-input hidden lg:block" />
                <div className="flex-1 bg-background p-4 sm:p-6">
                    <Header />
                    {children}
                </div>
            </div>
        </main>
    )
};

export default MainLayout;