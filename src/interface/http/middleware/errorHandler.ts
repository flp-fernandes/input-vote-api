import httpStatusCodes from 'http-status-codes';
import R from 'ramda';

import { HttpNext, HttpRequest, HttpResponse } from "../../../types/interface";
import { BadRequestError, InternalServerError, NotFoundError, TooManyRequestsError, UnauthorizedError } from '../../../util/error';
import { Logger } from '../../../util/logger';

const isNotFoundError = (err: any): boolean => {
  return (err instanceof NotFoundError)
}

export const errorHandler = (
  err: any,
  req: HttpRequest,
  res: HttpResponse,
  next: HttpNext,
) => {
  let status = httpStatusCodes.INTERNAL_SERVER_ERROR;
  let throwErr = err;
  console.log(status);

  const logger = new Logger(errorHandler.name);

  if (isNotFoundError(err)) {
    status = httpStatusCodes.NOT_FOUND;
    throwErr = new NotFoundError(throwErr.message, throwErr.details);
  }

  if (err instanceof BadRequestError) {
    status = httpStatusCodes.BAD_REQUEST;
  }

  if (err instanceof UnauthorizedError) {
    status = httpStatusCodes.UNAUTHORIZED;
  }

  if (err instanceof TooManyRequestsError) {
    status = httpStatusCodes.TOO_MANY_REQUESTS;
    throwErr = err;
  }

  if (status !== httpStatusCodes.INTERNAL_SERVER_ERROR) {
    logger.logger().warn(err.details);
  } else {
    throwErr = new InternalServerError(err.message, err.details);
    logger.logger().error(err);
  }

  return res.status(status).send(
    R.reject(R.isNil, {
      code: throwErr.code,
      message: throwErr.message,
      details: throwErr.details,
    }),
  );
}