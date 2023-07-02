const ERROR_NOT_FOUND = 404;

export default class NotFoundDataError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = ERROR_NOT_FOUND;
  }
}
