"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.generateAccessToken = exports.generateOTP = void 0;
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const middleware_1 = require("../middleware");
const logger_1 = __importDefault(require("./logger"));
const generateOTP = (digit) => {
  const power = Math.pow(10, digit - 1);
  const otp = Math.floor(power + Math.random() * 9 * power);
  return otp;
};
exports.generateOTP = generateOTP;
const generateAccessToken = (payload) => {
  const access_token = jsonwebtoken_1.default.sign(
    { user_id: payload.id },
    config_1.config.AUTH_SECRET,
    { expiresIn: config_1.config.AUTH_TOKEN_EXPIRY },
  );
  return access_token;
};
exports.generateAccessToken = generateAccessToken;
const sendEmail = async (mailData) => {
  const transporter = nodemailer_1.default.createTransport({
    service: config_1.config.SMTP_SERVICE,
    auth: {
      user: config_1.config.SMTP_USER,
      pass: config_1.config.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  try {
    await transporter.sendMail(mailData);
    logger_1.default.info("Email sent successfully");
  } catch (error) {
    throw new middleware_1.ServerError(error.message);
  }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=index.js.map
