import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import {
  STATUS_OK,
  STATUS_NOT_FOUND,
  STATUS_CONFLICT,
  STATUS_UNAUTHORIZED,
} from "../constants/status-code";
import { JWT_SECRET_KEY } from "../constants/config";
import { CustomRequest } from "../types/types";
import ErrorTemplate from "../errors/template-error";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    res.status(STATUS_OK).send(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      next(new ErrorTemplate("Пользователь не найден", STATUS_NOT_FOUND));
      return;
    }
    res.status(STATUS_OK).send(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
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
  } catch (err:any) {
    if (err.code === 11000) {
      next(new ErrorTemplate("Пользователь с таким email уже существует", STATUS_CONFLICT));
    }
    console.log(err);
    next(err);
  }
};

export const updateUserData = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const { userId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true, runValidators: true,
    });
    if (!updatedUser) {
      throw (new ErrorTemplate("Пользователь не найден", STATUS_NOT_FOUND));
    }
    res.status(STATUS_OK).send(updatedUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const { userId } = req.params;
  try {
    const updatedAvatar = await User.findByIdAndUpdate(userId, avatar, {
      new: true, runValidators: true,
    });
    if (!updatedAvatar) {
      throw (new ErrorTemplate("Пользователь не найден", STATUS_NOT_FOUND));
    }
    res.status(STATUS_OK).send(updatedAvatar);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const login = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw (new ErrorTemplate("Неверная почта или пароль", STATUS_UNAUTHORIZED));
    }
    const matched = bcryptjs.compare(password, user!.password);
    if (!matched) {
      throw (new ErrorTemplate("Неверная почта или пароль", STATUS_UNAUTHORIZED));
    }
    const token = jwt.sign({ _id: user!._id }, JWT_SECRET_KEY, { expiresIn: "7d" });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: true });
    res.status(STATUS_OK).send({
      token,
      name: user!.name,
      email: user!.email,
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
      throw (new ErrorTemplate("Пользователь не найден", STATUS_NOT_FOUND));
    }
    res.status(STATUS_OK).send(currentUser);
  } catch (err: any) {
    next(err);
  }
};
