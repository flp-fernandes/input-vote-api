class CustomError extends Error {
  private code: string;
  private details: CustomError[] | null;

  constructor(
    code: string,
    message: string | null = null,
    details: CustomError[] | null = null,
  ) {
    super(message || code);
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string, details: null | any[] = null) {
    super('NOT_FOUND', message, details)
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string, details: null | any[] = null) {
    super('BAD_REQUEST', message, details);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string, details: null | any[] = null) {
    super('UNAUTHORIZED_ERROR', message, details);
  }
}

export class TooManyRequestsError extends CustomError {
  constructor(message: string, details: null | any[] = null) {
    super('TOO_MANY_REQUESTS_ERROR', message, details);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string, details: null | any[] = null) {
    super('INTERNAL_SERVER_ERROR', message, details);
  }
}

export class InvalidProperties extends CustomError {
  constructor(message: string, details: unknown) {
    super('INVALID_PROPERTIES', message, details as CustomError[]);
  }
}

export class FailedToSaveTVShow extends CustomError {
  constructor(message: string, details?: unknown) {
    super('FAILED_TO_SAVE_TVSHOW', message);
  }
}