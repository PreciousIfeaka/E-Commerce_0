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
  req: Request & { user?: { user_id: string; email: string; role: userRole } },
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

    jwt.verify(token, config.AUTH_SECRET as Secret, async (decoded, error) => {
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
    throw new ServerError("INTERNAL_SERVER_ERROR");
  }
};
