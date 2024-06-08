import AppDetailsContent from "./Content";

interface AppDetailsPageProps {
    params: {
        appId: string;
    };
}

export const metadata = {
    title: "App Details - RaveHQ"
};

const AppDetailsPage = ({
    params: { appId }
}: AppDetailsPageProps) => {
    return (
        <AppDetailsContent appId={appId} />
    )
};

export default AppDetailsPage;