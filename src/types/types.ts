import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

export interface CustomRequest extends Request {
  user?: {
    _id: string | ObjectId,
  }
}

export interface AuthRequest extends Request {
    user?: string | JwtPayload;
  }

export type Error = {
    statusCode: number;
    message: string;
  };
