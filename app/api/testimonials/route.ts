import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

import { db } from "@/lib/db";
import { CreateTestimonialValidator } from "@/lib/validators/app";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const validatedFields = CreateTestimonialValidator.safeParse(body);
        if (!validatedFields.success) {
            return new Response(JSON.stringify({ error: "Invalid fields" }), { status: 400 });
        }

        const { appId, feedback, rating, email } = validatedFields.data;

        const authorization = req.headers.get("Authorization");
        if (!authorization) {
            return new Response(JSON.stringify({ error: "Authorization required" }), { status: 400 });
        }

        const apiKey = authorization.split(" ")[1];
        if (!apiKey || !apiKey.length) {
            return new Response(JSON.stringify({ error: "API key required" }), { status: 400 });
        }

        const app = await db.app.findUnique({
            where: {
                id: appId
            }
        });
        if (!app) {
            return new Response(JSON.stringify({ error: "App not found" }), { status: 404 });
        }

        const apiKeySecret = process.env.API_KEY_SECRET;
        if (!apiKeySecret) {
            return new Response(JSON.stringify({ error: "Server configuration error" }), { status: 500 });
        }

        const concatenatedApiKey = apiKey + apiKeySecret;
        const isMatchingKey = await bcrypt.compare(concatenatedApiKey, app.hashedKey || "");
        if (!isMatchingKey) {
            return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 400 });
        }

        const newTestimonial = await db.testimonial.create({
            data: {
                appId: app.id,
                feedback,
                rating,
                email
            }
        });

        return new Response(JSON.stringify({ success: true, testimonialId: newTestimonial.id }), { status: 201 });
    } catch (error) {
        console.error("Error creating testimonial due to:", error);
        return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
    }
}