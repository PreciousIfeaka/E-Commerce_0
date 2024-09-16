"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema =
  exports.forgotPasswordSchema =
  exports.verifyEmailSchema =
  exports.signupSchema =
  exports.signinSchema =
    void 0;
const zod_1 = require("zod");
const signupSchema = zod_1.z.object({
  name: zod_1.z.string().min(1, "name is required"),
  email: zod_1.z.string().email("Invalid email address"),
  password: zod_1.z
    .string()
    .min(8, "Password must be at least 8 characters long"),
  phone: zod_1.z.string(),
});
exports.signupSchema = signupSchema;
const signinSchema = zod_1.z.object({
  email: zod_1.z.string().email("Invalid email address"),
  password: zod_1.z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});
exports.signinSchema = signinSchema;
const verifyEmailSchema = zod_1.z.object({
  otp: zod_1.z
    .number()
    .int()
    .min(100000, "must be at least 6 digits")
    .max(999999, "must be at most 6 digits"),
});
exports.verifyEmailSchema = verifyEmailSchema;
const forgotPasswordSchema = zod_1.z.object({
  email: zod_1.z.string().email("Invalid email address"),
});
exports.forgotPasswordSchema = forgotPasswordSchema;
const resetPasswordSchema = zod_1.z.object({
  newPassword: zod_1.z.string().min(8, "less than 8 characters long"),
  confirmPassword: zod_1.z.string().min(8, "less than 8 characters long"),
});
exports.resetPasswordSchema = resetPasswordSchema;
//# sourceMappingURL=auth.js.map
