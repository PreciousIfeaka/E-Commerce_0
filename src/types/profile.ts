import { Profile, User } from "../models";

export interface ICreateProfile {
  name?: string;
  street_address: string;
  phone: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  gender: string;
}

export interface IProfileService {
  getUserProfile(userId: string): Promise<{
    message: string;
    user: Partial<User>;
  }>;

  updateUserProfile(
    userId: string,
    payload: ICreateProfile,
  ): Promise<{
    message: string;
    user: Partial<User>;
  }>;

  updateProfilePicture(
    userId: string,
    profilePicture: Express.Multer.File,
  ): Promise<{
    message: string;
    user: Partial<User>;
  }>;

  updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string,
  ): Promise<{
    message: string;
  }>;
}
