import { z } from "zod";

export const CreateAppValidator = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters long"
    }).max(30, {
        message: "Name cannot be more than 30 characters long"
    })
});

export type CreateAppPayload = z.infer<typeof CreateAppValidator>;