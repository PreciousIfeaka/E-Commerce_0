import { Repository } from "typeorm";
import {
  Conflict,
  HttpError,
  ResourceNotFound,
  ServerError,
  Unauthorized,
} from "../middleware";
import { IAuthService, ISigninPayload, ISignupPayload } from "../types";
import { User } from "../models";
import AppDataSource from "../data-source";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { config } from "../config";
import { generateAccessToken, generateOTP, sendEmail } from "../utils";

export class AuthService implements IAuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }
  public async signup(payload: ISignupPayload) {
    const { name, email, password, phone } = payload;
    try {
      const userExists = await this.userRepository.findOneBy({ email });

      if (userExists) {
        throw new Conflict("User already exists");
      }

      const user = new User();
      user.first_name = name.split(" ")[0];
      user.last_name = name.split(" ")[1];
      user.email = email;
      user.phone = phone;

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.otp = generateOTP(6);
      user.otp_expiredAt = new Date(Date.now() + 10000 * 60);
      const createdUser = await AppDataSource.manager.save(user);
      const access_token = generateAccessToken(createdUser);

      const mailData = {
        form: '"Precious Enuagwune" <preciousifeaka@gmail.com>',
        to: email,
        subject: "Email Verification",
        html: `<h2>${user.first_name}! Welcome to E-Commerce.</h2>
              <h4>Verify your email to continue...</h4>
              <h4>Your one-time password is ${user.otp}.</h4>
              <a href="${config.BASE_URL}/auth/verify-email?token=${access_token}"> Verify your email </a>
            `,
      };

      await sendEmail(mailData);

      const { password: _, otp: __, ...rest } = createdUser;
      return {
        message: "user created successfully",
        user: rest,
        access_token,
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new ServerError((error as Error).message);
    }
  }

  public async verifyEmail(token: string, otp: number) {
    try {
      const decoded: any = jwt.verify(token, config.AUTH_SECRET as Secret);

      if (!decoded) {
        throw new Unauthorized("Invalid token");
      }

      const user = await this.userRepository.findOneBy({ id: decoded.user_id });

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
        return {
          message: "OTP has expired",
        };
      }

      user.is_verified = true;

      return {
        message: "Successful email verification",
      };
    } catch (error) {
      if ((error as Error).name === "TokenExpiredError") {
        throw new HttpError(400, "Verification token has expired");
      }
      if (error instanceof HttpError) {
        throw error;
      }
      throw new ServerError((error as Error).message);
    }
  }
  public async signin(payload: ISigninPayload) {
    const { email, password } = payload;

    const userExists = await this.userRepository.findOneBy({ email });

    if (!userExists) {
      throw new ResourceNotFound("Not a signed up user");
    }

    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (!passwordMatch) {
      throw new Conflict("Incorrect password");
    }
    if (!userExists.is_verified) {
      throw new Unauthorized("User email is not verified");
    }

    const access_token = jwt.sign(
      { user_id: userExists.id },
      config.AUTH_SECRET as Secret,
      { expiresIn: config.AUTH_TOKEN_EXPIRY },
    );

    return {
      message: "User signed in succefully",
      user: userExists,
      access_token,
    };
  }
}
