import { z } from "zod";

const time12hRegex = /^(0?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)$/i; // Regular expression to validate 12-hour time format (e.g., "09:00 AM", "12:30 PM")

// Helper function to convert 12-hour time format to minutes for comparison
const toMinutes = (time) => {
  const [timePart, period] = time.trim().toUpperCase().split(" ");
  let [hours, minutes] = timePart.split(":").map(num => Number(num));

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

const daySchema = z
  .object({
    start: z.string().regex(time12hRegex, "Invalid time format (hh:mm AM/PM)"),
    end: z.string().regex(time12hRegex, "Invalid time format (hh:mm AM/PM)"),
  })
  .refine(({ start, end }) => toMinutes(end) > toMinutes(start), {
    message: "End time must be after start time",
    path: ["end"],
  });

export const registerDoctorSchema = z.object({
  full_name: z
    .string({
      required_error: "Full name is required",
    })
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format")
    .max(255, "Email must not exceed 255 characters")
    .trim(),

  phone: z
    .string({
      required_error: "Phone number is required",
    })
    .trim()
    .min(10, "Phone number must be at least 10 characters")
    .max(30, "Phone number must not exceed 30 characters")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters")
    .max(255, "Password must not exceed 255 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),

  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be either male, female, or other",
  }),

  // Doctor profile fields
  specialization: z
    .string({
      required_error: "Specialization is required",
    })
    .min(1, "Specialization is required")
    .max(100, "Specialization must not exceed 100 characters")
    .trim(),

  license_number: z
    .string({
      required_error: "License number is required",
    })
    .min(1, "License number is required")
    .max(50, "License number must not exceed 50 characters")
    .trim(),

  years_of_experience: z.coerce
    .number({
      required_error: "Years of experience is required",
    })
    .int("Years of experience must be an integer")
    .min(0, "Years of experience cannot be negative"),

  // Coerce = Automatically convert the value to the expected type.
  consultation_fee: z.coerce
    .number({
      required_error: "Consultation fee is required",
    })
    .min(0, "Consultation fee cannot be negative")
    .max(10000, "Consultation fee must not exceed 10000"),

  bio: z
    .string()
    .trim()
    .max(1000, "Bio must not exceed 1000 characters")
    .optional(),

  education: z
    .array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        year: z.coerce.number().int().min(1950).max(new Date().getFullYear()),
      }),
    )
    .optional(),

  certifications: z.array(z.string()).optional(),

  availability_hours: z
    .object({
      monday: daySchema.optional(),
      tuesday: daySchema.optional(),
      wednesday: daySchema.optional(),
      thursday: daySchema.optional(),
      friday: daySchema.optional(),
      saturday: daySchema.optional(),
      sunday: daySchema.optional(),
    })
    .optional(),

  is_available: z.boolean().default(true),
});

export const updateDoctorProfileSchema = z.object({
  specialization: z
    .string()
    .min(1, "Specialization is required")
    .max(100, "Specialization must not exceed 100 characters")
    .trim()
    .optional(),

  license_number: z
    .string()
    .min(1, "License number is required")
    .max(50, "License number must not exceed 50 characters")
    .trim()
    .optional(),

  years_of_experience: z.coerce
    .number()
    .int("Years of experience must be an integer")
    .min(0, "Years of experience cannot be negative")
    .optional(),

  consultation_fee: z.coerce
    .number()
    .min(0, "Consultation fee cannot be negative")
    .max(10000, "Consultation fee must not exceed 10000")
    .optional(),

  bio: z
    .string()
    .trim()
    .max(1000, "Bio must not exceed 1000 characters")
    .optional(),

  education: z
    .array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        year: z.coerce.number().int().min(1950).max(new Date().getFullYear()),
      }),
    )
    .optional(),

  certifications: z.array(z.string()).optional(),

  availability_hours: z
    .object({
      monday: daySchema.optional(),
      tuesday: daySchema.optional(),
      wednesday: daySchema.optional(),
      thursday: daySchema.optional(),
      friday: daySchema.optional(),
      saturday: daySchema.optional(),
      sunday: daySchema.optional(),
    })
    .optional(),

  is_available: z.boolean().optional(),
});
