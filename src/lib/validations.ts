import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const vehicleSchema = z.object({
  type: z.enum(["CAR", "MOTORCYCLE"]),
  name: z.string().min(1, "Name is required"),
  make: z.string().optional(),
  model: z.string().optional(),
  year: z
    .union([z.coerce.number().int().min(1900).max(2100), z.literal("")])
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : v)),
  odometer: z.coerce.number().int().min(0).default(0),
  odometerUnit: z.enum(["km", "mi"]).default("km"),
});

export const serviceSchema = z.object({
  date: z.string().min(1, "Date is required"),
  odometer: z
    .union([z.coerce.number().int().min(0), z.literal("")])
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : v)),
  serviceTypes: z.array(z.string()).min(1, "Select at least one service"),
  notes: z.string().optional(),
  cost: z
    .union([z.coerce.number().min(0), z.literal("")])
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : v)),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type VehicleInput = z.infer<typeof vehicleSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
