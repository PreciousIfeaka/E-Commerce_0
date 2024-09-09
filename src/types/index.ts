import { User } from "../models";

export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
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
}
