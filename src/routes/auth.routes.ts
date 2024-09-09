import { Router } from "express";
import { signin, signup, verifyEmail } from "../controllers";

const authRouter = Router();

authRouter.post("/auth/signup", signup);
authRouter.post("/auth/signin", signin);
authRouter.post("/auth/verify-email", verifyEmail);

export { authRouter };
