import {z} from "zod";

// Validation schema for creating a new brand
export const createBrandSchema = z.object({
    name: z.string({
        required_error: "Brand name is required"
    })
    .trim()
    .min(1 , "Brand name is required")
    .max(100, "Brand name must not exceed 100 characters"),

    description: z.string().trim().optional(),

    logo_url: z.string().max(255).optional().nullable(),

    website_url: z.string().url("Invalid website URL").optional().nullable(),

    is_active: z.boolean().default(true),
}).strict();