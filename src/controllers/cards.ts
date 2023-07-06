import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";
import { CustomRequest } from "../types/types";
import Card from "../models/card";
import {
  STATUS_OK,
  STATUS_NOT_FOUND,
  STATUS_FORBIDDEN,
} from "../constants/status-code";
import ErrorTemplate from "../errors/template-error";

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find();
    res.status(STATUS_OK).send(cards);
  } catch (err) {
    next(err);
  }
};

export const createCard = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.user?._id;
  try {
    const card = await Card.create({ name, link, owner });
    res.status(STATUS_OK).send(card);
  } catch (err: any) {
    next(err);
  }
};

export const deleteCard = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const owner = req.user?._id;
    const deletedCard = await Card.findById(cardId);
    if (!deletedCard) {
      throw (new ErrorTemplate("Карточка не найдена", STATUS_NOT_FOUND));
    }
    if (deletedCard!.owner.toString() !== owner) {
      throw (new ErrorTemplate("Удаление чужих карточек запрещено", STATUS_FORBIDDEN));
    }
    res.status(STATUS_OK).send(deletedCard);
  } catch (err: any) {
    next(err);
  }
};

export const likeCard = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const owner = req.user?._id;
  try {
    const upCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: owner } },
      { new: true },
    );
    if (!upCard) {
      throw (new ErrorTemplate("Карточка не найдена", STATUS_NOT_FOUND));
    }
    res.status(STATUS_OK).send(upCard);
  } catch (err: any) {
    next(err);
  }
};

export const dislikeCard = async (req: CustomRequest, res: Response, next: NextFunction) => {
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
      throw (new ErrorTemplate("Карточка не найдена", STATUS_NOT_FOUND));
    }
    res.status(STATUS_OK).send(upCard);
  } catch (err: any) {
    next(err);
  }
};
