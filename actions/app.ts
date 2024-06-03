"use server";

import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import {
    CheckApiKeyPayload,
    CheckApiKeyValidator,
    CreateApiKeyPayload,
    CreateApiKeyValidator,
    CreateAppPayload,
    CreateAppValidator
} from "@/lib/validators/app";
import { generateApiKey } from "@/lib/api-key";

export const createApp = async (payload: CreateAppPayload) => {
    try {
        const validatedFields = CreateAppValidator.safeParse(payload);
        if (!validatedFields.success) return { error: "Invalid fields" };

        const session = await auth();
        if (!session?.user || !session.user.id) return { error: "Unauthorized" };

        const { name } = validatedFields.data;

        const existingAppWithSameName = await db.app.findUnique({
            where: {
                userId_name: {
                    userId: session.user.id,
                    name
                }
            }
        });
        if (existingAppWithSameName) return { error: "App with that name already exists" };

        const newApp = await db.app.create({
            data: {
                userId: session.user.id,
                name
            }
        });

        return { success: "New app created", appId: newApp.id };
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};

export const checkApiKey = async (payload: CheckApiKeyPayload) => {
    try {
        const validatedFields = CheckApiKeyValidator.safeParse(payload);
        if (!validatedFields.success) return { error: "Invalid fields" };

        const session = await auth();
        if (!session?.user || !session.user.id) return { error: "Unauthorized" };

        const { appId } = validatedFields.data;

        const existingApp = await db.app.findUnique({
            where: {
                id: appId
            }
        });
        if (!existingApp) return { error: "App not found" };
        if (existingApp.userId !== session.user.id) return { error: "Unpermitted" };

        if (!existingApp.hashedKey) return { hasApiKey: false };
        return { hasApiKey: true };
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" };
    }
};

export const createAndSaveApiKey = async (payload: CreateApiKeyPayload) => {
    try {
        const validatedFields = CreateApiKeyValidator.safeParse(payload);
        if (!validatedFields.success) return { error: "Invalid fields" };

        const session = await auth();
        if (!session?.user || !session.user.id) return { error: "Unauthorized" };

        const { appId } = validatedFields.data;

        const existingApp = await db.app.findUnique({
            where: {
                id: appId
            }
        });
        if (!existingApp) return { error: "App not found" };
        if (existingApp.userId !== session.user.id) return { error: "Not allowed" };

        const apiKey = generateApiKey();
        const apiKeySecret = process.env.API_KEY_SECRET;
        if (!apiKeySecret) return { error: "Server configuration error" };

        const concatenatedApiKey = apiKey + apiKeySecret;
        const salt = await bcrypt.genSalt(10);
        const hashedKey = await bcrypt.hash(concatenatedApiKey, salt);

        await db.app.update({
            where: {
                id: appId
            },
            data: {
                hashedKey
            }
        });

        return { success: "New api key created", apiKey };
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};