import { User } from "../models";

export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface ISigninPayload {
  email: string;
  password: string;
}

export interface IAuthService {
  signup(payload: ISignupPayload): Promise<{
    message: string;
    user: Partial<User>;
    access_token: string;
  }>;

  verifyEmail(
    token: string,
    otp: number,
  ): Promise<{
    message: string;
  }>;

  signin(payload: ISigninPayload): Promise<{
    message: string;
    user: Partial<User>;
    access_token: string;
  }>;

  forgotPassword(email: string): Promise<{
    message: string;
  }>;

  resetPassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<{
    message: string;
    user: Partial<User>;
  }>;

  enable2FA(
    user_id: string,
    password: string,
  ): Promise<{
    message: string;
    secret: string;
    auth_url: string;
  }>;

  verify2FA(
    user_id: string,
    token: string,
  ): Promise<{
    message: string;
  }>;

  disable2FA(
    user_id: string,
    token: string,
  ): Promise<{
    message: string;
  }>;
}
