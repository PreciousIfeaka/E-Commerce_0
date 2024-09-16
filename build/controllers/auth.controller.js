"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword =
  exports.forgotPassword =
  exports.signup =
  exports.verifyEmail =
  exports.signin =
    void 0;
const asyncHandler_1 = require("../helpers/asyncHandler");
const services_1 = require("../services");
const responseHelper_1 = require("../helpers/responseHelper");
const authService = new services_1.AuthService();
const signup = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
  const { message, user, access_token } = await authService.signup(req.body);
  (0, responseHelper_1.sendJsonResponse)(res, 201, message, {
    user,
    access_token,
  });
});
exports.signup = signup;
const verifyEmail = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
  const { message } = await authService.verifyEmail(
    req.query.token,
    req.body.otp,
  );
  (0, responseHelper_1.sendJsonResponse)(res, 200, message);
});
exports.verifyEmail = verifyEmail;
const signin = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
  const { message, user, access_token } = await authService.signin(req.body);
  (0, responseHelper_1.sendJsonResponse)(res, 200, message, user, access_token);
});
exports.signin = signin;
const forgotPassword = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
  const { message } = await authService.forgotPassword(req.body.email);
  (0, responseHelper_1.sendJsonResponse)(res, 200, message);
});
exports.forgotPassword = forgotPassword;
const resetPassword = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
  const { message, user } = await authService.resetPassword(
    req.query.token,
    req.body.newPassword,
    req.body.confirmPassword,
  );
  (0, responseHelper_1.sendJsonResponse)(res, 200, message, user);
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=auth.controller.js.map
