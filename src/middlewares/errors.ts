import { Request, Response, NextFunction } from "express";
import { Error } from "../types/types";
import { STATUS_SERVER_ERROR } from "../constants/status-code";

export default ((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = STATUS_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === STATUS_SERVER_ERROR ? "На сервере произошла ошибка" : message,
    });
  next();
});
