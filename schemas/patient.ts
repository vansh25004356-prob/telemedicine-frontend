import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.coerce.number().min(1).max(120),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().optional(),
  village: z.string().optional(),
});

export type PatientFormData = z.input<typeof patientSchema>;