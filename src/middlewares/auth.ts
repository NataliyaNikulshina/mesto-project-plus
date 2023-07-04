import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UnauthorizedError from "../errors/unauthorized";
import { JWT_SECRET_KEY } from "../constants/config";
import { AuthRequest } from "../types/types";

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Необходима авторизация");
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next();
};
