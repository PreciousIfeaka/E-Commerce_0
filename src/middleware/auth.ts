import { User } from "../models";
import { Request, Response, NextFunction } from "express";
import { sendJsonResponse } from "../helpers/responseHelper";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { config } from "../config";
import AppDataSource from "../data-source";
import { userRole } from "../enums";
import log from "../utils/logger";
import { ServerError } from "./error";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendJsonResponse(res, 401, "Invalid Token");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return sendJsonResponse(res, 401, "Invalid Token");
    }

    jwt.verify(token, config.AUTH_SECRET as Secret, async (error, decoded) => {
      if (error || !decoded) {
        return sendJsonResponse(res, 401, "Invalid Token");
      }
      const { user_id } = decoded as JwtPayload;
      const user = await AppDataSource.getRepository(User).findOneBy({
        id: user_id,
      });

      if (!user) {
        return sendJsonResponse(res, 401, "Invalid Token");
      }
      req.user = {
        user_id,
        role: user.user_role,
        email: user.email,
      };
      next();
    });
  } catch (error) {
    log.error(error);
    throw new ServerError("Internal server error");
  }
};

export const checkRole =
  (roles: userRole[]) =>
  (
    req: Request & {
      user?: { user_id: string; email: string; role: userRole };
    },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user || roles.includes(req.user.role)) {
        return sendJsonResponse(
          res,
          403,
          `user role is not part of ${roles}, access denied.`,
        );
      }
      next();
    } catch (error) {
      log.error(error);
      throw new ServerError("Internal server error");
    }
  };
