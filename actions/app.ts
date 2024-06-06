"use server";

import bcrypt from "bcryptjs";
import { isSameDay, subDays } from "date-fns";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import {
    CheckApiKeyPayload,
    CheckApiKeyValidator,
    CreateApiKeyPayload,
    CreateApiKeyValidator,
    CreateAppPayload,
    CreateAppValidator,
    CreateTestimonialPayload,
    CreateTestimonialValidator,
    GetTestimonialsPayload,
    GetTestimonialsValidator
} from "@/lib/validators/app";
import { generateApiKey } from "@/lib/api-key";
import { fillMissingDays } from "@/lib/utils";

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

export const getAppsForTestimonialCreation = async () => {
    try {
        const session = await auth();
        if (!session?.user || !session.user.id) return { error: "Unauthorized" };

        const apps = await db.app.findMany({
            where: {
                userId: session.user.id
            },
            select: {
                id: true,
                name: true
            }
        });

        return { apps };
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" };
    }
};

export const createTestimonial = async (payload: CreateTestimonialPayload) => {
    try {
        const validatedFields = CreateTestimonialValidator.safeParse(payload);
        if (!validatedFields.success) return { error: "Invalid fields" };

        const session = await auth();
        if (!session?.user || !session.user.id) return { error: "Unauthorized" };

        const { appId, feedback, rating, email } = validatedFields.data;

        const existingApp = await db.app.findUnique({
            where: {
                id: appId
            }
        });
        if (!existingApp) return { error: "App not found" };
        if (existingApp.userId !== session.user.id) return { error: "Not allowed" };

        const existingTestimonialWithSameEmail = await db.testimonial.findUnique({
            where: {
                appId_email: {
                    appId,
                    email
                }
            }
        });
        if (existingTestimonialWithSameEmail) return { error: "Testimonial with that email already exists" };

        await db.testimonial.create({
            data: {
                appId,
                feedback,
                rating,
                email
            }
        });

        return { success: "New testimonial created" };
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
};

export const getTestimonials = async (payload: GetTestimonialsPayload) => {
    try {
        const validatedFields = GetTestimonialsValidator.safeParse(payload);
        if (!validatedFields.success) return { error: "Invalid fields" };

        const session = await auth();
        if (!session?.user || !session.user.id) return { error: "Unauthorized" };

        const { page, limit } = validatedFields.data;

        const testimonials = await db.testimonial.findMany({
            where: {
                app: {
                    userId: session.user.id
                }
            },
            orderBy: {
                givenAt: "desc"
            },
            take: limit,
            skip: (page - 1) * limit,
            include: {
                app: {
                    select: {
                        name: true
                    }
                }
            }
        });

        const polishedTestimonials = testimonials.map((testimonial) => ({
            id: testimonial.id,
            appId: testimonial.appId,
            feedback: testimonial.feedback,
            rating: testimonial.rating,
            email: testimonial.email,
            givenAt: testimonial.givenAt,
            updatedAt: testimonial.updatedAt,
            appName: testimonial.app.name
        }));

        const totalTestimonials = await db.testimonial.count({
            where: {
                app: {
                    userId: session.user.id
                }
            }
        });
        const hasNextPage = totalTestimonials > (page * limit);

        return { testimonials: polishedTestimonials, totalTestimonials, hasNextPage };
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" };
    }
};

type ChartData = {
    date: Date;
    overallRating: number;
    count: number;
}[];

export const getApps = async (page: number, limit: number) => {
    try {
        const session = await auth();
        if (!session?.user || !session.user.id) return { error: "Unauthorized" };

        const apps = await db.app.findMany({
            where: {
                userId: session.user.id
            },
            orderBy: {
                createdAt: "desc"
            },
            take: limit,
            skip: (page - 1) * limit,
            include: {
                testimonials: {
                    orderBy: {
                        givenAt: "asc"
                    },
                    select: {
                        id: true,
                        rating: true,
                        givenAt: true
                    }
                }
            }
        });

        const currentDate = new Date();
        const startDate = subDays(currentDate, 10);

        const polishedApps = apps.map((app) => {
            let chartData: ChartData = [];

            const totalRating = app.testimonials.reduce((acc, testimonial, index) => {
                if (
                    testimonial.givenAt >= startDate &&
                    testimonial.givenAt <= currentDate
                ) {
                    const lastElement = chartData[chartData.length - 1];

                    if (
                        chartData.length &&
                        isSameDay(lastElement.date, testimonial.givenAt)
                    ) {
                        chartData[chartData.length - 1] = {
                            ...lastElement,
                            overallRating: (acc + testimonial.rating) / (index + 1),
                            count: lastElement.count + 1
                        };
                    } else {
                        chartData.push({
                            date: testimonial.givenAt,
                            overallRating: (acc + testimonial.rating) / (index + 1),
                            count: 1
                        });
                    }
                }
                return acc + testimonial.rating;
            }, 0);
            const overallRating = totalRating / app.testimonials.length;

            const filledChartData = fillMissingDays(
                chartData,
                startDate,
                currentDate
            );

            return {
                id: app.id,
                name: app.name,
                userId: app.userId,
                hashedKey: app.hashedKey,
                createdAt: app.createdAt,
                updatedAt: app.updatedAt,
                testimonialsCount: app.testimonials.length,
                overallRating,
                chartData: filledChartData
            };
        });

        const totalApps = await db.app.count({
            where: {
                userId: session.user.id
            }
        });
        const hasNextPage = totalApps > (page * limit);

        return { apps: polishedApps, totalApps, hasNextPage };
    } catch (error) {
        console.error(error);
        return { error: "Something went wrong" };
    }
};