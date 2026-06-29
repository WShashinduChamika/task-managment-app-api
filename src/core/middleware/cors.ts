import { NextFunction, Request, Response } from 'express';

const allowedOrigins = (process.env.CORS_ORIGIN ?? process.env.FRONTEND_URL ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const requestOrigin = req.headers.origin;

  if (!requestOrigin) {
    next();
    return;
  }

  const allowWildcard = allowedOrigins.includes('*');
  const originAllowed = allowedOrigins.length === 0 || allowWildcard || allowedOrigins.includes(requestOrigin);

  if (originAllowed) {
    res.header('Access-Control-Allow-Origin', allowWildcard ? '*' : requestOrigin);
    res.header('Vary', 'Origin');

    if (!allowWildcard) {
      res.header('Access-Control-Allow-Credentials', 'true');
    }

    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  }

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
};