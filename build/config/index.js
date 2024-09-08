"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRESS_DB,
  AUTH_SECRET: process.env.AUTH_SECRET,
  AUTH_TOKEN_EXPIRY: process.env.AUTH_TOKEN_EXPIRY,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_SERVICE: process.env.SMTP_SERVICE,
  BASE_URL: process.env.BASE_URL,
};
//# sourceMappingURL=index.js.map
