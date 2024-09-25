import { Router } from "express";
import {
  disable2FA,
  enable2FA,
  forgotPassword,
  requestOTP,
  resetPassword,
  signin,
  signup,
  verify2FA,
  verifyEmail,
  verifyOTP,
} from "../controllers";
import { validateData } from "../middleware/inputValidation";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signinSchema,
  signupSchema,
  verifyEmailSchema,
} from "../validationSchema/auth";
import { authMiddleware } from "../middleware";

const authRouter = Router();

authRouter.post("/auth/register", validateData(signupSchema), signup);
authRouter.post("/auth/login", validateData(signinSchema), signin);
authRouter.post(
  "/auth/verify-email",
  validateData(verifyEmailSchema),
  verifyEmail,
);

authRouter.post("/auth/request-otp", requestOTP);
authRouter.post("/auth/verify-otp", verifyOTP);
authRouter.post(
  "/auth/forgot-password",
  validateData(forgotPasswordSchema),
  forgotPassword,
);

authRouter.put(
  "/auth/reset-password",
  validateData(resetPasswordSchema),
  resetPassword,
);

authRouter.post("/auth/enable-2fa", authMiddleware, enable2FA);
authRouter.post("/auth/verify-2fa", authMiddleware, verify2FA);
authRouter.post("/auth/disable-2fa", authMiddleware, disable2FA);

export { authRouter };
