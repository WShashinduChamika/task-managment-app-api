export interface AppError extends Error {
  statusCode: number;
  code: string;
}

export const notFound = (message: string): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = 404;
  error.code = 'NOT_FOUND';
  return error;
};

export const validationError = (message: string): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = 400;
  error.code = 'VALIDATION_ERROR';
  return error;
};

export const unauthorizedError = (message: string): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = 401;
  error.code = 'UNAUTHORIZED';
  return error;
};

export const forbiddenError = (message: string): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = 403;
  error.code = 'FORBIDDEN';
  return error;
};

export const conflictError = (message: string): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = 409;
  error.code = 'CONFLICT';
  return error;
};

export const internalError = (message: string): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = 500;
  error.code = 'INTERNAL_ERROR';
  return error;
};
