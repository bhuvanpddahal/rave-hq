import CreateApiKeyButton from "./CreateApiKeyButton";

interface AppDetailsPageProps {
    params: {
        appId: string;
    };
}

const AppDetailsPage = ({
    params: { appId }
}: AppDetailsPageProps) => {
    return (
        <div>
            <CreateApiKeyButton appId={appId} />
        </div>
    )
};

export default AppDetailsPage;