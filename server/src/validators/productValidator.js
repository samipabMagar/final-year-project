import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string({
      required_error: "Product name is required",
    })
    .trim()
    .min(1, "Product name is required")
    .max(255, "Product name must not exceed 255 characters"),

  description: z.string().trim().optional(),

  price: z.coerce
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .min(0, "Price must be at least 0"),

  category: z.enum(
    [
      "cleanser",
      "moisturizer",
      "serum",
      "sunscreen",
      "toner",
      "mask",
      "eye_care",
      "lip_care",
    ],
    {
      required_error: "Category is required",
      invalid_type_error: "Invalid category",
    },
  ),

  stock_quantity: z.coerce
    .number()
    .int("Stock quantity must be an integer")
    .min(0, "Stock quantity must be at least 0")
    .default(0),

  images: z.array(z.string()).optional().default([]),

  brand_id: z.coerce
    .number()
    .int()
    .positive("Brand ID must be a positive integer")
    .optional()
    .nullable(),

  skin_type: z
    .array(
      z.enum(["normal", "oily", "dry", "combination", "sensitive"], {
        invalid_type_error: "Invalid skin type",
      }),
    )
    .optional(),

  ingredients: z.string().trim().optional(),

  is_active: z.boolean().default(true),
});
