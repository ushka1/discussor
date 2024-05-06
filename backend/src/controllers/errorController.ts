import { logger } from '@/config/logger';
import { NextFunction, Request, Response } from 'express';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error('Internal server error.', err);

  if (res.headersSent) {
    return next(err);
  }

  return res.status(500).json({ message: 'Internal server error.' });
}
