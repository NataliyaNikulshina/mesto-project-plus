import {
  Router, Request, Response, NextFunction,
} from "express";
import userRouter from "./users";
import cardsRouter from "./cards";
import ErrorTemplate from "../errors/template-error";
import { STATUS_NOT_FOUND } from "../constants/status-code";

const router = Router();

router.use("/users", userRouter);
router.use("/cards", cardsRouter);

router.use((req:Request, res:Response, next:NextFunction) => {
  next(new ErrorTemplate("Пользователь не найден", STATUS_NOT_FOUND));
});

export default router;
