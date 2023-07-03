import { STATUS_NOT_FOUND } from "../constants/status-code";

export default class NotFoundDataError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_NOT_FOUND;
  }
}
