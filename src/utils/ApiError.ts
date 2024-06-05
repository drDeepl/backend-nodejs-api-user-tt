class ApiError extends Error {
  public readonly statusCode: number;
  public readonly msg: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.msg = message;
    this.statusCode = statusCode;
  }
}

export default ApiError;
