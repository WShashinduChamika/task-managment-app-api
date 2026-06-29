import { NextFunction, Request, Response } from 'express';
import { AppError } from '../exceptions';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const error = err as AppError;
  const statusCode = error.statusCode || 500;
  const code = error.code || 'INTERNAL_ERROR';
  
  console.error('Error:', {
    message: error.message,
    code,
    statusCode,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message: error.message,
    },
  });
};
