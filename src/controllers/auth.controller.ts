import { asyncHandler } from "../helpers/asyncHandler";
import { Request, Response } from "express";
import { AuthService } from "../services";
import { sendJsonResponse } from "../helpers/responseHelper";
import log from "../utils/logger";

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

const enable2FA = asyncHandler(async (req: Request, res: Response) => {
  const user_id = req.user!.user_id;
  const { message, secret, auth_url } = await authService.enable2FA(
    user_id,
    req.body.password,
  );
  sendJsonResponse(res, 200, message, { secret, auth_url });
});

const verify2FA = asyncHandler(async (req: Request, res: Response) => {
  const user_id = req.user!.user_id;
  const { message } = await authService.verify2FA(user_id, req.body.token);
  sendJsonResponse(res, 200, message);
});

const disable2FA = asyncHandler(async (req: Request, res: Response) => {
  const user_id = req.user!.user_id;
  const { message } = await authService.disable2FA(user_id, req.body.token);
  sendJsonResponse(res, 200, message);
});

export {
  signin,
  verifyEmail,
  signup,
  forgotPassword,
  resetPassword,
  enable2FA,
  verify2FA,
  disable2FA,
};
