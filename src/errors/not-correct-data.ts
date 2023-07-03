import { STATUS_ERROR_CODE } from "../constants/status-code";

export default class NotCorrectDataError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUS_ERROR_CODE;
  }
}
