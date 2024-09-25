import { Response } from "express";
import { User } from "../models";

const sendJsonResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any,
  accessToken?: string,
): any => {
  const status = statusCode >= 200 && statusCode < 300 ? "success" : "failed";
  const responsePayload: any = {
    status,
    message,
    status_code: statusCode,
    data,
  };

  if (data !== undefined) responsePayload.data = data;

  if (accessToken) {
    responsePayload.access_token = accessToken;
  }

  res.status(statusCode).json(responsePayload);
};

const sendUser = (user: User): Partial<User> => {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    avatar_url: user.avatar_url,
    is_verified: user.is_verified,
    is_2fa_enabled: user.is_2fa_enabled,
    user_role: user.user_role,
  };
};

export { sendJsonResponse, sendUser };
