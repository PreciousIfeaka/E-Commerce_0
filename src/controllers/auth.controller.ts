import { asyncHandler } from "../helpers/asyncHandler";
import { Request, Response } from "express";
import { AuthService } from "../services";
import { sendJsonResponse } from "../helpers/responseHelper";

const authService = new AuthService();

const signup = asyncHandler(async (req: Request, res: Response) => {
  const { message, user, access_token } = await authService.signup(req.body);
  sendJsonResponse(res, 201, message, { user, access_token });
});

const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { message } = await authService.verifyEmail(
    req.query.token as string,
    req.body.otp,
  );
  sendJsonResponse(res, 200, message);
});

const signin = asyncHandler(async (req: Request, res: Response) => {
  const { message, user, access_token } = await authService.signin(req.body);
  sendJsonResponse(res, 200, message, user, access_token);
});

const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { message } = await authService.forgotPassword(req.body.email);
  sendJsonResponse(res, 200, message);
});

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { message, user } = await authService.resetPassword(
    req.query.token as string,
    req.body.newPassword,
    req.body.confirmPassword,
  );
  sendJsonResponse(res, 200, message, user);
});

export { signin, verifyEmail, signup, forgotPassword, resetPassword };
