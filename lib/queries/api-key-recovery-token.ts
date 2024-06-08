import { db } from "@/lib/db";

export const getApiKeyRecoveryTokenByAppId = async (appId: string) => {
    try {
        const apiKeyRecoveryToken = await db.apiKeyRecoveryToken.findUnique({
            where: { appId }
        });
        return apiKeyRecoveryToken;
    } catch (error) {
        return null;
    }
};