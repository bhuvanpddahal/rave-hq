"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import {
    CreateAppPayload,
    CreateAppValidator
} from "@/lib/validators/app";

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