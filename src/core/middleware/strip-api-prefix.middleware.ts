import { NextFunction, Request, Response } from 'express';

export const stripApiPrefix = (prefix: string) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (req.url.startsWith(prefix)) {
      req.url = req.url.slice(prefix.length) || '/';
    }
    next();
  };
};
