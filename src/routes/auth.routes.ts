import { Router } from "express";
import { signin, signup, verifyEmail } from "../controllers";
import { validateData } from "../middleware/inputValidation";
import {
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

export { authRouter };
