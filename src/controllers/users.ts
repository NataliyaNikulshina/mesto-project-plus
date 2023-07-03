import { Request, Response } from "express";
import User from "../models/user";
import { STATUS_OK, STATUS_NOT_FOUND, STATUS_SERVER_ERROR } from "../constants/status-code";

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
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.status(STATUS_OK).send(user);
  } catch (err) {
    console.log(err);
    res.status(STATUS_SERVER_ERROR).send({ message: "Ошибка сервера" });
  }
};

export const updateUserData = async (req: Request, res: Response) => {
  const data = req.body;
  const { userId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });
    if (!updatedUser) {
      res.status(STATUS_NOT_FOUND).send({ message: "Пользователь не найден" });
      return;
    }
    res.status(STATUS_OK).send(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(STATUS_SERVER_ERROR).send({ message: "Ошибка сервера" });
  }
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body;
  const { userId } = req.params;
  try {
    const updatedAvatar = await User.findByIdAndUpdate(userId, avatar, { new: true });
    if (!updatedAvatar) {
      res.status(STATUS_NOT_FOUND).send({ message: "Пользователь не найден" });
      return;
    }
    res.status(STATUS_OK).send(updatedAvatar);
  } catch (err) {
    console.log(err);
    res.status(STATUS_SERVER_ERROR).send({ message: "Ошибка сервера" });
  }
};
