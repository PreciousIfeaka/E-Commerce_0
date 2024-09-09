import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  phone: z.string(),
});

const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const verifyEmailSchema = z.object({
  otp: z
    .number()
    .int()
    .min(100000, "otp must be at least 6 digits")
    .max(999999, "otp must be at most 6 digits"),
});

export { signinSchema, signupSchema, verifyEmailSchema };
