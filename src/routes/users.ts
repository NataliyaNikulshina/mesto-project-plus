import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUserData,
  updateUserAvatar,
} from "../controllers/users";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:userId", getUserById);
userRouter.post("/users", createUser);
userRouter.patch("/users/me", updateUserData);
userRouter.patch("/users/me/avatar", updateUserAvatar);

export default userRouter;
