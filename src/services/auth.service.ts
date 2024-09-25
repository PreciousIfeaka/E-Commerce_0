import { Repository } from "typeorm";
import {
  BadRequest,
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
import speakeasy from "speakeasy";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { config } from "../config";
import { generateAccessToken, generateOTP, sendEmail } from "../utils";
import { sendUser } from "../helpers/responseHelper";

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
        from: `E-Commerce <${config.SMTP_USER}>`,
        to: email,
        subject: "Email Verification",
        html: `<p> Hello ${user.first_name},</p> 
              <p>Thank you for signing up on E-Commerce. In order to proceed, you have to verify your email.</p>
              <p>Your one-time password is: </p>
              <p>${user.otp}</p>
              <p>This OTP is valid for the next 10 minutes. Please do not share this code with anyone.</p>
              <p>If you did not request this, please ignore this email.</p>`,
      };

      await sendEmail(mailData);

      return {
        message: "user created successfully",
        user: sendUser(user),
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

      if (!decoded) throw new Unauthorized("Invalid token");

      const user_id = decoded.user_id;

      const user = await this.userRepository.findOneBy({ id: user_id });

      if (!user) throw new ResourceNotFound("User not found");

      if (user.otp !== otp) {
        throw new BadRequest("Invalid OTP");
      } else if (user.otp_expiredAt < new Date()) {
        throw new BadRequest("OTP has expired");
      }

      const updatePayload: Partial<User> = {
        is_verified: true,
        otp: 0,
      };

      await this.userRepository.update(user_id, updatePayload);
      return {
        message: "Successful email verification",
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new ServerError((error as Error).message);
    }
  }

  public async requestOTP(token: string): Promise<{
    message: string;
    token: string;
  }> {
    try {
      const { user_id } = jwt.verify(
        token,
        config.AUTH_SECRET as Secret,
      ) as JwtPayload;
      if (!user_id) throw new Unauthorized("Invalid access token");

      const user = await this.userRepository.findOneBy({ id: user_id });
      if (!user) throw new ResourceNotFound("User not found");

      const otp = generateOTP(6);

      const mailData = {
        from: `E-Commerce <${config.SMTP_USER}>`,
        to: user.email,
        subject: "OTP Verification",
        html: `<p> Hello ${user.first_name},</p> 
              <p>Your one-time password is:</p>
              <p>${otp}</p>
              <p>This OTP is valid for the next 10 minutes. Please do not share this code with anyone.</p>
              <p>If you did not request this, please ignore this email.</p>`,
      };

      await sendEmail(mailData);

      const updatePayload = {
        otp,
        otp_expiredAt: new Date(Date.now() + 10000 * 60),
      };

      await this.userRepository.update(user_id, updatePayload);

      return {
        message: "OTP successfully sent to user email",
        token,
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new ServerError((error as Error).message);
    }
  }

  public async verifyOTP(otp: number): Promise<{
    message: string;
  }> {
    try {
      const user = await this.userRepository.findOneBy({ otp });
      if (!user || user.otp_expiredAt < new Date())
        throw new BadRequest("Invalid OTP");

      const updatePayload = {
        otp: 0,
      };

      await this.userRepository.update(user.id, updatePayload);

      return {
        message: "Successfully verified OTP",
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;
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

      return {
        message: "User signed in succefully",
        user: sendUser(userExists),
        access_token,
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new ServerError((error as Error).message);
    }
  }

  public async forgotPassword(email: string): Promise<{
    message: string;
    token: string;
  }> {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (!user) {
        throw new ResourceNotFound("User not found");
      }

      const token = generateAccessToken(user);
      const otp = generateOTP(6);

      const mailData = {
        form: "no-reply@gmail.com <preciousifeaka@gmail.com>",
        to: email,
        subject: "OTP Verification",
        html: `<p> Hello ${user.first_name},</p> 
              <p>Your one-time password is:</p>
              <p>${otp}</p>
              <p>This OTP is valid for the next 10 minutes. Please do not share this code with anyone.</p>
              <p>If you did not request this, please ignore this email.</p>
            `,
      };

      await sendEmail(mailData);

      return {
        message: "Email successfully sent",
        token,
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

    return {
      message: "Successful password reset",
      user: sendUser(user),
    };
  }

  public async enable2FA(
    user_id: string,
    password: string,
  ): Promise<{
    message: string;
    secret: string;
    auth_url: string;
  }> {
    try {
      const user = await this.userRepository.findOneBy({ id: user_id });

      if (!user) throw new ResourceNotFound("User does not exist");

      if (!user.is_verified) throw new Unauthorized("User email not verified");

      const verified_password = await bcrypt.compare(password, user.password);
      if (!verified_password) throw new Unauthorized("Invalid password");

      if (user.is_2fa_enabled) throw new BadRequest("User is 2fa enabled");

      const secret = speakeasy.generateSecret({ length: 32 });
      if (!secret)
        throw new BadRequest("Could not generate 2FA secret, try again.");

      const payload = {
        is_2fa_enabled: true,
        auth_url_2fa: secret.otpauth_url as string,
        secret_2fa: secret.base32,
      };

      await this.userRepository.update(user_id, payload);

      return {
        message: "2FA successfully enabled",
        secret: secret.base32,
        auth_url: secret.otpauth_url as string,
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new ServerError((error as Error).message);
    }
  }

  public async verify2FA(
    user_id: string,
    token: string,
  ): Promise<{
    message: string;
  }> {
    try {
      const user = await this.userRepository.findOneBy({ id: user_id });

      if (!user) throw new ResourceNotFound("User does not exist");
      if (!user.is_2fa_enabled) throw new BadRequest("User is not 2FA enabled");

      const verifiedToken = speakeasy.totp.verify({
        secret: user.secret_2fa,
        encoding: "base32",
        token,
      });

      if (!verifiedToken) throw new BadRequest("Invalid 2FA token");

      return {
        message: "Token is verified",
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new ServerError("Could not verify 2FA Token");
    }
  }

  public async disable2FA(
    user_id: string,
    token: string,
  ): Promise<{
    message: string;
  }> {
    try {
      const user = await this.userRepository.findOneBy({ id: user_id });

      if (!user) throw new ResourceNotFound("User does not exist");
      if (!user.is_2fa_enabled)
        throw new BadRequest("User is already 2FA disabled");

      const verified_token = await speakeasy.totp.verify({
        secret: user.secret_2fa,
        encoding: "base32",
        token,
      });

      if (!verified_token) throw new Unauthorized("Invalid 2FA token");

      const updatePayload: any = {
        is_2fa_enabled: false,
        auth_url_2fa: null,
        secret_2fa: null,
      };

      await this.userRepository.update(user_id, updatePayload);

      return {
        message: "Successfully disabled 2fa",
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new ServerError("Could not disable 2FA, try again.");
    }
  }
}
