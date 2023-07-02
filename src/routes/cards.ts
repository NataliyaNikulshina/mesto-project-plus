import { Router } from "express";
import { getCards, createCard } from "../controllers/cards";

// const User = require('../models/user');
const router = Router();

router.get("/cards", getCards);
router.post("/cards", createCard);

export default router;
