import { Router } from "express";
import {
  disable2FA,
  enable2FA,
  forgotPassword,
  resetPassword,
  signin,
  signup,
  verify2FA,
  verifyEmail,
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

authRouter.post("/auth/signup", validateData(signupSchema), signup);
authRouter.post("/auth/signin", validateData(signinSchema), signin);
authRouter.post(
  "/auth/verify-email",
  validateData(verifyEmailSchema),
  verifyEmail,
);
authRouter.post(
  "/auth/password/new",
  validateData(forgotPasswordSchema),
  forgotPassword,
);

authRouter.patch(
  "/auth/password/edit",
  validateData(resetPasswordSchema),
  resetPassword,
);

authRouter.post("/auth/enable-2fa", authMiddleware, enable2FA);

authRouter.post("/auth/verify-2fa", authMiddleware, verify2FA);

authRouter.post("/auth/disable-2fa", authMiddleware, disable2FA);

export { authRouter };
