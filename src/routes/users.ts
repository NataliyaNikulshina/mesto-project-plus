import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUserData,
  updateUserAvatar,
  getCurrentUser,
} from "../controllers/users";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getCurrentUser);
userRouter.get("/:userId", getUserById);
userRouter.patch("/me", updateUserData);
userRouter.patch("/me/avatar", updateUserAvatar);

export default userRouter;
