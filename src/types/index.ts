import { Request, Response, NextFunction } from "express";
import { User } from "../models";

export type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

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

  signin(payload: ISigninPayload): Promise<{
    message: string;
    user: Partial<User>;
    access_token: string;
  }>;
}
