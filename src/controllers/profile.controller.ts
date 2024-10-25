import { asyncHandler } from "../helpers/asyncHandler";
import { sendJsonResponse } from "../helpers/responseHelper";
import { ProfileService } from "../services";
import { Request, Response } from "express";

const profileService = new ProfileService();

const getMyProfile = asyncHandler(async (req: Request, res: Response) => {
  const { message, user } = await profileService.getUserProfile(
    req.user!.user_id,
  );
  sendJsonResponse(res, 200, message, user);
});

const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const { message, user } = await profileService.getUserProfile(
    req.params.userId,
  );
  sendJsonResponse(res, 200, message, user);
});

const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const { message, user } = await profileService.updateUserProfile(
    req.user!.user_id,
    req.body,
  );
  sendJsonResponse(res, 200, message, user);
});

const updateProfilePicture = asyncHandler(
  async (req: Request, res: Response) => {
    const { message, user } = await profileService.updateProfilePicture(
      req.user!.user_id,
      req.file as Express.Multer.File,
    );
    sendJsonResponse(res, 200, message, user);
  },
);

const updatePassword = asyncHandler(async (req: Request, res: Response) => {
  const { message } = await profileService.updatePassword(
    req.user!.user_id,
    req.body.oldPassword,
    req.body.newPassword,
    req.body.confirmNewPassword,
  );
  sendJsonResponse(res, 200, message);
});

export {
  getMyProfile,
  getUserProfile,
  updateUserProfile,
  updateProfilePicture,
  updatePassword,
};
