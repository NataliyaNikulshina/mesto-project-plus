import { Error } from "mongoose";
import { STATUS_FORBIDDEN } from "../constants/status-code";

export default class ForbiddenError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_FORBIDDEN;
    this.message = message;
  }
}
