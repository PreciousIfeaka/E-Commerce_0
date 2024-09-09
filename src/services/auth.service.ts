import { Repository } from "typeorm";
import {
  Conflict,
  HttpError,
  InvalidInput,
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
        html: `<h4>${user.first_name}! Welcome to E-Commerce.</h4>
              <p>Verify your email to continue...</p>
              <p>Your one-time password is ${user.otp}.</p>
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

    try {
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

      const { password: _, otp: __, ...rest } = userExists;

      return {
        message: "User signed in succefully",
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

  public async forgotPassword(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (!user) {
        throw new ResourceNotFound("User not found");
      }

      const reset_token = generateAccessToken(user);

      const mailData = {
        form: "no-reply@gmail.com <preciousifeaka@gmail.com>",
        to: email,
        subject: "Reset Password Instructions",
        html: `<h4>Hello ${user.first_name}!</h4>
              <p>Someone has requested a link to change your password. You can do this through the link below.</p>
              <a href="${config.BASE_URL}/auth/password/edit?token=${reset_token}"> Change my password </a>
              <p>or copy and open this link in your browser: <a href="${config.BASE_URL}/auth/password/edit?token=${reset_token}">${config.BASE_URL}/auth/password/edit?token=${reset_token}</a></p>
              <p>If you didn't request this, please ignore this email.</p>
              <p>Your password won't change until you access the link above and create a new one</p>
            `,
      };

      await sendEmail(mailData);

      return {
        message: "Email successfully sent",
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new ServerError((error as Error).message);
    }
  }

  public async resetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<{
    message: string;
    user: Partial<User>;
  }> {
    const decoded: any = jwt.verify(token, config.AUTH_SECRET as Secret);

    if (!decoded) {
      throw new Unauthorized("Invalid token");
    }

    const user = await this.userRepository.findOneBy({ id: decoded.user_id });

    if (!user) {
      throw new ResourceNotFound("User not found");
    }

    if (newPassword !== confirmPassword) {
      throw new InvalidInput("passwords mismatch");
    }

    const passwordsMatch = await bcrypt.compare(newPassword, user.password);

    if (passwordsMatch) {
      throw new Conflict("Same password entry as old password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userRepository.update(user.id, { password: hashedPassword });

    const { password: _, otp: __, ...rest } = user;

    return {
      message: "Successful password reset",
      user: rest,
    };
  }
}
