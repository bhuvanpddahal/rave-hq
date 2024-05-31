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
        <main>
            <Header />
            <div className="flex max-w-screen-2xl mx-auto">
                <Sidebar />
                {children}
            </div>
        </main>
    )
};

export default MainLayout;