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