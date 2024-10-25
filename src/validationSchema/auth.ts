import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const verifyEmailSchema = z.object({
  otp: z
    .number()
    .int()
    .min(100000, "must be at least 6 digits")
    .max(999999, "must be at most 6 digits"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, "less than 8 characters long"),
  confirmPassword: z.string().min(8, "less than 8 characters long"),
});

export {
  signinSchema,
  signupSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
