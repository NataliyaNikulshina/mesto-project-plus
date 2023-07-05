import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ErrorTemplate from "../errors/template-error";
import { STATUS_UNAUTHORIZED } from "../constants/status-code";
import { JWT_SECRET_KEY } from "../constants/config";
import { AuthRequest } from "../types/types";

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new ErrorTemplate("Необходимо авторизоваться", STATUS_UNAUTHORIZED));
  }
  const token = authorization?.replace("Bearer ", "");
  let payload;
  try {
    if (token) {
      payload = jwt.verify(token, JWT_SECRET_KEY);
    }
  } catch (err) {
    next(new ErrorTemplate("Токен не верный", STATUS_UNAUTHORIZED));
    return;
  }
  req.user = payload;
  next();
};
