import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        user_id: string;
        email: string;
        role: userRole;
      };
    }
  }
}
