import { Router } from "express";
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from "../controllers/cards";
import { validationCardId } from "../middlewares/validator";

// const User = require('../models/user');
const cardsRouter = Router();

cardsRouter.get("/", getCards);
cardsRouter.post("/", createCard);
cardsRouter.delete("/:cardId", validationCardId, deleteCard);
cardsRouter.put("/:cardId/likes", validationCardId, likeCard);
cardsRouter.delete("/:cardId/likes", validationCardId, dislikeCard);

export default cardsRouter;
