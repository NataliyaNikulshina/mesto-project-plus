import { Request, Response } from "express";
// import userModel from '../models/user';
import User from "../models/user";

export const getUsers = (req: Request, res: Response) => {
  User.find({})
  // .find()
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
  // .catch(next);
};

export const getUserById = (req: Request, res: Response) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const updateUserData = (req: Request, res: Response, data: any) => {
  const userId = req.user?._id;
  User.findByIdAndUpdate({ userId, data })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const updateUserAvatar = (req: Request, res: Response, data: any) => {
  const userId = req.user?._id;
  User.findByIdAndUpdate({ userId, data })
    .then((link) => res.send({ data: link }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
