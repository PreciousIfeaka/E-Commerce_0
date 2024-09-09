import { Response } from "express";

const sendJsonResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any,
  accessToken?: string,
): any => {
  const responsePayload: any = {
    status: "success",
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
