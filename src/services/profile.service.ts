import { Repository } from "typeorm";
import { Profile, User } from "../models";
import AppDataSource from "../data-source";
import { ICreateProfile, IProfileService } from "../types";
import { BadRequest, Conflict, ResourceNotFound } from "../middleware";
import bcrypt from "bcrypt";
import { sendUser } from "../helpers/responseHelper";

export class ProfileService implements IProfileService {
  private profileRepository: Repository<Profile>;
  private userRepository: Repository<User>;

  constructor() {
    this.profileRepository = AppDataSource.getRepository(Profile);
    this.userRepository = AppDataSource.getRepository(User);
  }

  public async getUserProfile(userId: string): Promise<{
    message: string;
    user: Partial<User>;
  }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["profile"],
    });
    if (!user) throw new ResourceNotFound("User of given ID doesn't exist");

    return {
      message: "Successfully retrieved user profile",
      user: sendUser(user),
    };
  }

  public async updateUserProfile(
    userId: string,
    payload: ICreateProfile,
  ): Promise<{
    message: string;
    user: Partial<User>;
  }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["profile"],
    });

    if (!user) throw new ResourceNotFound("User not found");

    let first_name, last_name;

    if (payload.name) {
      first_name = payload.name.split(" ")[0];
      last_name = payload.name.split(" ").slice(1).join(" ") || "";
    }

    await this.profileRepository.update(user.profile.id, payload);

    await this.userRepository.update(userId, {
      first_name,
      last_name,
    });

    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["profile"],
    });

    if (!updatedUser)
      throw new ResourceNotFound("Could not retrieve updated user, try again");

    return {
      message: "User profile updated successfully",
      user: sendUser(updatedUser),
    };
  }

  public async updateProfilePicture(
    userId: string,
    profilePicture: Express.Multer.File,
  ): Promise<{ message: string; user: Partial<User> }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["profile"],
    });

    if (!user) throw new ResourceNotFound("Could not find user");

    if (!profilePicture) throw new BadRequest("No uploaded file");

    const avatar_url = profilePicture.path;

    if (!avatar_url) throw new ResourceNotFound("Could not find file path");

    await this.profileRepository.update(user.profile.id, { avatar_url });
    const updatedProfile = await this.profileRepository.findOneBy({
      id: user.profile.id,
    });

    if (!updatedProfile)
      throw new ResourceNotFound("Could not find updated profile");

    user.profile = updatedProfile;
    if (!updatedProfile)
      throw new ResourceNotFound("Could not find updated profile");

    const updatedUser = await this.userRepository.save(user);

    return {
      message: "User profile updated successfully",
      user: sendUser(updatedUser),
    };
  }

  public async updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new ResourceNotFound("User not found");

    const matchedOldPassword = await bcrypt.compare(oldPassword, user.password);
    if (!matchedOldPassword)
      throw new BadRequest("Enter your correct old password");

    if (oldPassword === newPassword)
      throw new Conflict("Use a new password different from the old one");

    if (newPassword !== confirmNewPassword)
      throw new BadRequest(
        "new password and confirm new password must be the same",
      );

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userRepository.update(user.id, { password: hashedPassword });

    return {
      message: "Successfully updated password",
    };
  }
}
