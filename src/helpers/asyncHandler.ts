import { Request, Response, NextFunction } from "express";
import { AsyncHandler } from "../types";

const asyncHandler = (fn: AsyncHandler) => {
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export { asyncHandler }