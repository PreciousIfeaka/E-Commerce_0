import { Router } from "express";
import {
  getUserProfile,
  getMyProfile,
  updateUserProfile,
  updateProfilePicture,
  updatePassword,
} from "../controllers";
import { authMiddleware, checkRole, validateData } from "../middleware";
import { userRole } from "../enums";
import { upload } from "../middleware";
import { updateProfileSchema } from "../validationSchema/profile";

const profileRouter = Router();

profileRouter.get("/users/profile/me", authMiddleware, getMyProfile);
profileRouter.get(
  "/users/:userId/profile",
  authMiddleware,
  checkRole([userRole.ADMIN]),
  getUserProfile,
);
profileRouter.put(
  "/users/profile",
  validateData(updateProfileSchema),
  authMiddleware,
  updateUserProfile,
);
profileRouter.put(
  "/users/profile/picture",
  upload.single("profilePicture"),
  authMiddleware,
  updateProfilePicture,
);
profileRouter.put("/users/password", authMiddleware, updatePassword);

export { profileRouter };
