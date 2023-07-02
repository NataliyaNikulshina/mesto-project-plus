import { Request, Response } from "express";
import Card from "../models/user";

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  console.log(req.user._id);
  const owner = req.user?._id;
  return Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    await Card.findByIdAndDelete(cardId);
    const cards = await Card.find({});
    res.send({ data: cards });
  } catch (error) {
    res.status(500).send({ message: "Произошла ошибка" });
  }
};

export const likeCard = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user?._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

export const dislikeCard = (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    return;
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};
