import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUserData,
  updateUserAvatar,
  getCurrentUser,
} from "../controllers/users";
import { validationUserId, validationUserInfo, validationAvatar } from "../middlewares/validator";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getCurrentUser);
userRouter.get("/:userId", validationUserId, getUserById);
userRouter.patch("/me", validationUserInfo, updateUserData);
userRouter.patch("/me/avatar", validationAvatar, updateUserAvatar);

export default userRouter;
