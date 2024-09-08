import { config } from "../config";
import { User } from "../models";
import jwt, { Secret } from "jsonwebtoken";
import nodemailer, { SendMailOptions } from "nodemailer";
import { ServerError } from "../middleware";

export const generateOTP = (digit: number): number => {
  const power = Math.pow(10, digit - 1);
  const otp = Math.floor(power + Math.random() * 9 * power);
  return otp;
};

export const generateAccessToken = (payload: Partial<User>): string => {
  const access_token = jwt.sign(
    { user_id: payload.id },
    config.AUTH_SECRET as Secret,
    { expiresIn: config.AUTH_TOKEN_EXPIRY },
  );
  return access_token;
};

export const sendEmail = async (mailData: SendMailOptions) => {
  const transporter = nodemailer.createTransport({
    service: config.SMTP_SERVICE,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  try {
    await transporter.sendMail(mailData);
    return "Email sent successfully";
  } catch (error) {
    throw new ServerError((error as Error).message);
  }
};
