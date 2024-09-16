"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const inputValidation_1 = require("../middleware/inputValidation");
const auth_1 = require("../validationSchema/auth");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post(
  "/auth/signup",
  (0, inputValidation_1.validateData)(auth_1.signupSchema),
  controllers_1.signup,
);
authRouter.post(
  "/auth/signin",
  (0, inputValidation_1.validateData)(auth_1.signinSchema),
  controllers_1.signin,
);
authRouter.post(
  "/auth/verify-email",
  (0, inputValidation_1.validateData)(auth_1.verifyEmailSchema),
  controllers_1.verifyEmail,
);
authRouter.post(
  "/auth/password/new",
  (0, inputValidation_1.validateData)(auth_1.forgotPasswordSchema),
  controllers_1.forgotPassword,
);
authRouter.patch(
  "/auth/password/edit",
  (0, inputValidation_1.validateData)(auth_1.resetPasswordSchema),
  controllers_1.resetPassword,
);
//# sourceMappingURL=auth.routes.js.map
