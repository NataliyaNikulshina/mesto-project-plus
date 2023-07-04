import { STATUS_UNAUTHORIZED } from "../constants/status-code";

export default class UnauthorizedError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_UNAUTHORIZED;
    this.message = message;
  }
}
