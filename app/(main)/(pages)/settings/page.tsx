import SettingsContent from "./Content";

export const metadata = {
    title: "Settings - RaveHQ"
};

const SettingsPage = () => {
    return (
        <div className="mt-[60px] space-y-6">
            <div>
                <h2 className="text-lg font-bold text-zinc-800">
                    Account Settings
                </h2>
                <p className="text-sm text-muted-foreground">
                    Change your profile and account settings
                </p>
            </div>
            <SettingsContent />
        </div>
    )
};

export default SettingsPage;