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
      const createdUser = await data_source_1.default.manager.save(user);
      const otp = (0, utils_1.generateOTP)(6);
      const access_token = (0, utils_1.generateAccessToken)(createdUser);
      const mailData = {
        form: '"Precious Enuagwune" <preciousifeaka@gmail.com>',
        to: email,
        subject: "Email Verification",
        html: `<h2>${user.first_name}! Welcome to E-Commerce.</h2>
              <h4>Verify your email to continue...</h4>
              <h4>Your one-time password is ${otp}.</h4>
              <a href="http://${config_1.config.BASE_URL}/auth/verify-email?token=${access_token}"> Verify your email </a>
            `,
      };
      await (0, utils_1.sendEmail)(mailData);
      return {
        message: "user created successfully",
        user: createdUser,
        access_token,
      };
    } catch (error) {
      if (error instanceof middleware_1.HttpError) {
        throw error;
      }
      throw new middleware_1.ServerError(error.message);
    }
  }
  async signin(payload) {
    const { email, password } = payload;
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
    return {
      message: "User signed in succefully",
      user: userExists,
      access_token,
    };
  }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
