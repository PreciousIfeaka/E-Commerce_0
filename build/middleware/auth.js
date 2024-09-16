"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = exports.authMiddleware = void 0;
const models_1 = require("../models");
const responseHelper_1 = require("../helpers/responseHelper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const data_source_1 = __importDefault(require("../data-source"));
const logger_1 = __importDefault(require("../utils/logger"));
const error_1 = require("./error");
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return (0, responseHelper_1.sendJsonResponse)(res, 401, "Invalid Token");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return (0, responseHelper_1.sendJsonResponse)(res, 401, "Invalid Token");
    }
    jsonwebtoken_1.default.verify(
      token,
      config_1.config.AUTH_SECRET,
      async (decoded, error) => {
        if (error || !decoded) {
          return (0, responseHelper_1.sendJsonResponse)(
            res,
            401,
            "Invalid Token",
          );
        }
        const { user_id } = decoded;
        const user = await data_source_1.default
          .getRepository(models_1.User)
          .findOneBy({
            id: user_id,
          });
        if (!user) {
          return (0, responseHelper_1.sendJsonResponse)(
            res,
            401,
            "Invalid Token",
          );
        }
        req.user = {
          user_id,
          role: user.user_role,
          email: user.email,
        };
        next();
      },
    );
  } catch (error) {
    logger_1.default.error(error);
    throw new error_1.ServerError("Internal server error");
  }
};
exports.authMiddleware = authMiddleware;
const checkRole = (roles) => (req, res, next) => {
  try {
    if (!req.user || roles.includes(req.user.role)) {
      return (0, responseHelper_1.sendJsonResponse)(
        res,
        403,
        `user role is not part of ${roles}, access denied.`,
      );
    }
    next();
  } catch (error) {
    logger_1.default.error(error);
    throw new error_1.ServerError("Internal server error");
  }
};
exports.checkRole = checkRole;
//# sourceMappingURL=auth.js.map
