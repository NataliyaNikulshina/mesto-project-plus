import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Card from "../models/card";
import { STATUS_OK, STATUS_NOT_FOUND, STATUS_SERVER_ERROR } from "../constants/status-code";

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find();
    res.send(cards);
  } catch (err) {
    console.log(err);
    res.status(STATUS_SERVER_ERROR).send({ message: "Ошибка сервера" });
  }
};

export const createCard = async (req: Request, res: Response) => {
  const { name, link } = req.body;
  console.log(req.user._id);
  const owner = req.user?._id;
  try {
    const card = await Card.create({ name, link, owner });
    res.status(STATUS_OK).send(card);
  } catch (err: any) {
    console.log(err);
    res.status(STATUS_SERVER_ERROR).send({ message: "Ошибка сервера" });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (!deletedCard) {
      res.status(STATUS_NOT_FOUND).send({ message: "Карточка не найдена" });
    }
    res.status(STATUS_OK).send(deletedCard);
  } catch (err: any) {
    console.log(err);
    res.status(STATUS_SERVER_ERROR).send({ message: "Ошибка сервера" });
  }
};

export const likeCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  const owner = req.user?._id;
  try {
    const upCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: owner } },
      { new: true },
    );
    if (!upCard) {
      res.status(STATUS_NOT_FOUND).send({ message: "Карточка не найдена" });
    }
    res.status(STATUS_OK).send(upCard);
  } catch (err: any) {
    console.log(err);
    res.status(STATUS_SERVER_ERROR).send({ message: "Ошибка сервера" });
  }
};

export const dislikeCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  const owner = req.user?._id;
  if (!owner) {
    return;
  }
  try {
    const upCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: owner as unknown as ObjectId } },
      { new: true },
    );
    if (!upCard) {
      res.status(STATUS_NOT_FOUND).send({ message: "Карточка не найдена" });
    }
    res.status(STATUS_OK).send(upCard);
  } catch (err: any) {
    console.log(err);
    res.status(STATUS_SERVER_ERROR).send({ message: "Ошибка сервера" });
  }
};
