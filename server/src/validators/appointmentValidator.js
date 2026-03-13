import { z } from "zod";

export const createAppointmentSchema = z.object({
  doctor_user_id: z.coerce
    .number({
      required_error: "Doctor user id is required",
      invalid_type_error: "Doctor user id must be a number",
    })
    .int("Doctor user id must be an integer")
    .positive("Doctor user id must be a positive integer"),

  scheduled_at: z
    .string({
      invalid_type_error: "scheduled_at must be an ISO datetime string",
    })
    .datetime("scheduled_at must be a valid ISO datetime"),
});

export const confirmAppointmentSchema = z.object({
  meeting_provider: z.enum(["google_meet", "zoom"], {
    required_error: "meeting_provider is required",
    invalid_type_error: "meeting_provider must be either google_meet or zoom",
  }),
  meeting_link: z
    .string({
      required_error: "meeting_link is required",
      invalid_type_error: "meeting_link must be a valid URL string",
    })
    .url("meeting_link must be a valid URL"),
  doctor_notes: z
    .string({
      invalid_type_error: "doctor_notes must be a string",
    })
    .trim()
    .optional(),
});