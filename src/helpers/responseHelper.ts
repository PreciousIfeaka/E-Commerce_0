import { Response } from "express";

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

  if (accessToken) {
    responsePayload.access_token = accessToken;
  }

  res.status(statusCode).json(responsePayload);
};

export { sendJsonResponse };
