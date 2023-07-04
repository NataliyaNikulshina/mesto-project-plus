import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { STATUS_OK, STATUS_NOT_FOUND, STATUS_SERVER_ERROR } from "../constants/status-code";
import UnauthorizedError from "../errors/unauthorized";
import { JWT_SECRET_KEY } from "../constants/config";
import { CustomRequest } from "../types/types";
import NotFoundDataError from "../errors/not-found-data";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(STATUS_OK).send(users);
  } catch (err) {
    console.log(err);
    res.status(STATUS_SERVER_ERROR).send({ message: "Ошибка сервера" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(STATUS_NOT_FOUND).send({ message: "Пользователь не найден" });
      return;
    }
    res.status(STATUS_OK).send(user);
  } catch (err) {
    console.log(err);
    res.status(STATUS_SERVER_ERROR).send({ message: "Ошибка сервера" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  try {
    const hashPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      hashPassword,
    });
    res.status(STATUS_OK).send(user);
  } catch (err) {
    console.log(err);
    res.status(STATUS_SERVER_ERROR).send({ message: "Ошибка сервера" });
  }
};

export const updateUserData = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const { userId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });
    if (!updatedUser) {
      next(new NotFoundDataError("Пользователь не найден"));
    }
    res.status(STATUS_OK).send(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(STATUS_SERVER_ERROR).send({ message: "Ошибка сервера" });
  }
};

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const { userId } = req.params;
  try {
    const updatedAvatar = await User.findByIdAndUpdate(userId, avatar, { new: true });
    if (!updatedAvatar) {
      next(new NotFoundDataError("Пользователь не найден"));
    }
    res.status(STATUS_OK).send(updatedAvatar);
  } catch (err) {
    console.log(err);
    res.status(STATUS_SERVER_ERROR).send({ message: "Ошибка сервера" });
  }
};

export const login = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new UnauthorizedError("Неверная почта или пароль");
    }
    const matched = bcryptjs.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError("Неверная почта или пароль");
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, { expiresIn: "7d" });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: true });
    res.status(STATUS_OK).send({
      token,
      name: user.name,
      email: user.email,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getCurrentUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  try {
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      next(new NotFoundDataError("Пользователь не найден"));
    }
    res.status(STATUS_OK).send(currentUser);
  } catch (err: any) {
    next(err);
  }
};
