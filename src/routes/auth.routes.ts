import { Router } from "express";
import {
  forgotPassword,
  resetPassword,
  signin,
  signup,
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

export { authRouter };
