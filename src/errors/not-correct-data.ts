const ERROR_DATA = 400;

export default class NotCorrectDataError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_DATA;
  }
}
