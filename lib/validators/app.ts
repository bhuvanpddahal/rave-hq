import { z } from "zod";

export const CreateAppValidator = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters long"
    }).max(30, {
        message: "Name cannot be more than 30 characters long"
    })
});

export const CheckApiKeyValidator = z.object({
    appId: z.string()
});

export const CreateApiKeyValidator = z.object({
    appId: z.string()
});

export const CreateTestimonialValidator = z.object({
    appId: z.string(),
    feedback: z.string().min(20, {
        message: "Feedback must be at least 20 characters long"
    }).max(300, {
        message: "Feedback must be at most 300 characters long"
    }),
    rating: z.number().min(0, {
        message: "Rating must be greater or equal to 0"
    }).max(5, {
        message: "Rating must be smaller or equal to 5"
    }),
    email: z.string().email({
        message: "Email is invalid"
    })
});

export const GetTestimonialsValidator = z.object({
    page: z.number(),
    limit: z.number()
});

export const GetAppValidator = z.object({
    appId: z.string()
});

export const GetAppTestimonialsValidator = z.object({
    appId: z.string(),
    page: z.number(),
    limit: z.number()
});

export type CreateAppPayload = z.infer<typeof CreateAppValidator>;
export type CheckApiKeyPayload = z.infer<typeof CheckApiKeyValidator>;
export type CreateApiKeyPayload = z.infer<typeof CreateApiKeyValidator>;
export type CreateTestimonialPayload = z.infer<typeof CreateTestimonialValidator>;
export type GetTestimonialsPayload = z.infer<typeof GetTestimonialsValidator>;
export type GetAppPayload = z.infer<typeof GetAppValidator>;
export type GetAppTestimonialsPayload = z.infer<typeof GetAppTestimonialsValidator>;