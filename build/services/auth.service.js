"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const middleware_1 = require("../middleware");
const models_1 = require("../models");
const data_source_1 = __importDefault(require("../data-source"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const utils_1 = require("../utils");
class AuthService {
  constructor() {
    this.userRepository = data_source_1.default.getRepository(models_1.User);
  }
  async signup(payload) {
    const { name, email, password, phone } = payload;
    try {
      const userExists = await this.userRepository.findOneBy({ email });
      if (userExists) {
        throw new middleware_1.Conflict("User already exists");
      }
      const user = new models_1.User();
      user.first_name = name.split(" ")[0];
      user.last_name = name.split(" ")[1];
      user.email = email;
      user.phone = phone;
      const hashedPassword = await bcrypt_1.default.hash(password, 10);
      user.password = hashedPassword;
      user.otp = (0, utils_1.generateOTP)(6);
      user.otp_expiredAt = new Date(Date.now() + 10000 * 60);
      const createdUser = await data_source_1.default.manager.save(user);
      const access_token = (0, utils_1.generateAccessToken)(createdUser);
      const mailData = {
        form: '"Precious Enuagwune" <preciousifeaka@gmail.com>',
        to: email,
        subject: "Email Verification",
        html: `<h4>${user.first_name}! Welcome to E-Commerce.</h4>
              <p>Verify your email to continue...</p>
              <p>Your one-time password is ${user.otp}.</p>
              <a href="${config_1.config.BASE_URL}/auth/verify-email?token=${access_token}"> Verify your email </a>
            `,
      };
      await (0, utils_1.sendEmail)(mailData);
      const { password: _, otp: __, ...rest } = createdUser;
      return {
        message: "user created successfully",
        user: rest,
        access_token,
      };
    } catch (error) {
      if (error instanceof middleware_1.HttpError) {
        throw error;
      }
      throw new middleware_1.ServerError(error.message);
    }
  }
  async verifyEmail(token, otp) {
    try {
      const decoded = jsonwebtoken_1.default.verify(
        token,
        config_1.config.AUTH_SECRET,
      );
      if (!decoded) {
        throw new middleware_1.Unauthorized("Invalid token");
      }
      const user_id = decoded.user_id;
      const user = await this.userRepository.findOneBy({ id: user_id });
      if (!user) {
        return {
          message: "Not a registered user",
        };
      }
      if (user.otp !== otp) {
        return {
          message: "Invalid OTP",
        };
      } else if (user.otp_expiredAt < new Date()) {
        await this.userRepository.delete(user.id);
        return {
          message: "OTP has expired",
        };
      }
      await this.userRepository.update(user_id, { is_verified: true });
      return {
        message: "Successful email verification",
      };
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new middleware_1.HttpError(400, "Verification token has expired");
      }
      if (error instanceof middleware_1.HttpError) {
        throw error;
      }
      throw new middleware_1.ServerError(error.message);
    }
  }
  async signin(payload) {
    const { email, password } = payload;
    try {
      const userExists = await this.userRepository.findOneBy({ email });
      if (!userExists) {
        throw new middleware_1.ResourceNotFound("Not a signed up user");
      }
      const passwordMatch = await bcrypt_1.default.compare(
        password,
        userExists.password,
      );
      if (!passwordMatch) {
        throw new middleware_1.Conflict("Incorrect password");
      }
      if (!userExists.is_verified) {
        throw new middleware_1.Unauthorized("User email is not verified");
      }
      const access_token = jsonwebtoken_1.default.sign(
        { user_id: userExists.id },
        config_1.config.AUTH_SECRET,
        { expiresIn: config_1.config.AUTH_TOKEN_EXPIRY },
      );
      const { password: _, otp: __, ...rest } = userExists;
      return {
        message: "User signed in succefully",
        user: rest,
        access_token,
      };
    } catch (error) {
      if (error instanceof middleware_1.HttpError) {
        throw error;
      }
      throw new middleware_1.ServerError(error.message);
    }
  }
  async forgotPassword(email) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new middleware_1.ResourceNotFound("User not found");
      }
      const reset_token = (0, utils_1.generateAccessToken)(user);
      const mailData = {
        form: "no-reply@gmail.com <preciousifeaka@gmail.com>",
        to: email,
        subject: "Reset Password Instructions",
        html: `<h4>Hello ${user.first_name}!</h4>
              <p>Someone has requested a link to change your password. You can do this through the link below.</p>
              <a href="${config_1.config.BASE_URL}/auth/password/edit?token=${reset_token}"> Change my password </a>
              <p>or copy and open this link in your browser: <a href="${config_1.config.BASE_URL}/auth/password/edit?token=${reset_token}">${config_1.config.BASE_URL}/auth/password/edit?token=${reset_token}</a></p>
              <p>If you didn't request this, please ignore this email.</p>
              <p>Your password won't change until you access the link above and create a new one</p>
            `,
      };
      await (0, utils_1.sendEmail)(mailData);
      return {
        message: "Email successfully sent",
      };
    } catch (error) {
      if (error instanceof middleware_1.HttpError) {
        throw error;
      }
      throw new middleware_1.ServerError(error.message);
    }
  }
  async resetPassword(token, newPassword, confirmPassword) {
    const decoded = jsonwebtoken_1.default.verify(
      token,
      config_1.config.AUTH_SECRET,
    );
    if (!decoded) {
      throw new middleware_1.Unauthorized("Invalid token");
    }
    const user = await this.userRepository.findOneBy({ id: decoded.user_id });
    if (!user) {
      throw new middleware_1.ResourceNotFound("User not found");
    }
    if (newPassword !== confirmPassword) {
      throw new middleware_1.InvalidInput("passwords mismatch");
    }
    const passwordsMatch = await bcrypt_1.default.compare(
      newPassword,
      user.password,
    );
    if (passwordsMatch) {
      throw new middleware_1.Conflict("Same password entry as old password");
    }
    const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
    await this.userRepository.update(user.id, { password: hashedPassword });
    const { password: _, otp: __, ...rest } = user;
    return {
      message: "Successful password reset",
      user: rest,
    };
  }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
