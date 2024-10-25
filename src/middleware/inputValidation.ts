import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

type RequestTarget = "body" | "query" | "params";

export function validateData<T extends z.ZodTypeAny>(
  schema: T,
  targets: RequestTarget[] = ["body"],
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      targets.forEach((target) => {
        if (target in req) {
          const validatedData = schema.parse(req[target as keyof Request]);
          (req[target as keyof Request] as unknown) = validatedData;
        }
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res.status(422).json({ errors: errorMessages });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
