"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJsonResponse = void 0;
const sendJsonResponse = (res, statusCode, message, data, accessToken) => {
  const responsePayload = {
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
exports.sendJsonResponse = sendJsonResponse;
//# sourceMappingURL=responseHelper.js.map
